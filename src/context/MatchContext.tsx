import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Match, SportType, AppSettings, ActionLog } from '../types/scoreboard';
import { createInitialMatch } from '../utils/helpers';
import { demoMatches, demoHistoryMatches } from '../utils/demoData';
import { soundManager } from '../utils/soundEffects';

interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
}

interface EventBanner {
  type: string;
  title: string;
  subtitle?: string;
  timestamp: number;
}

interface MatchContextType {
  activeMatch: Match | null;
  matchHistory: Match[];
  settings: AppSettings;
  toast: ToastItem | null;
  eventBanner: EventBanner | null;
  canUndo: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  createMatch: (sport: SportType, teamA: string, teamB: string, tournament?: string, venue?: string) => Match;
  updateMatch: (updater: (draft: Match) => void, log?: { description: string; team?: 'A' | 'B'; type: ActionLog['type'] }) => void;
  undoLastAction: () => void;
  resetMatchScore: () => void;
  endMatch: (winnerOverride?: string) => void;
  loadDemoMatch: (matchId: string) => void;
  deleteMatchFromHistory: (matchId: string) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  showToast: (message: string, type?: ToastItem['type']) => void;
  triggerEventBanner: (title: string, subtitle?: string, type?: string) => void;
  toggleTimer: () => void;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  soundEnabled: true,
  confirmEndMatch: true,
  confirmReset: true,
  fontScale: 'normal',
  simulatedConnection: 'online'
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

const BROADCAST_CHANNEL_NAME = 'smart_scoreboard_sync';
const LOCAL_STORAGE_ACTIVE_KEY = 'smart_scoreboard_active_match';
const LOCAL_STORAGE_HISTORY_KEY = 'smart_scoreboard_history';
const LOCAL_STORAGE_SETTINGS_KEY = 'smart_scoreboard_settings';

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeMatch, setActiveMatch] = useState<Match | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore fallback
    }
    return demoMatches[0]; // Default to Football demo match
  });

  const [matchHistory, setMatchHistory] = useState<Match[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore fallback
    }
    return demoHistoryMatches;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore fallback
    }
    return defaultSettings;
  });

  const [toast, setToast] = useState<ToastItem | null>(null);
  const [eventBanner, setEventBanner] = useState<EventBanner | null>(null);
  const [undoStack, setUndoStack] = useState<Match[]>([]);

  const channelRef = useRef<BroadcastChannel | null>(null);

  // Initialize BroadcastChannel for multi-window realtime sync
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      channelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channelRef.current.onmessage = (event) => {
        if (event.data && event.data.type === 'SYNC_ACTIVE_MATCH') {
          setActiveMatch(event.data.match);
        } else if (event.data && event.data.type === 'TRIGGER_EVENT_BANNER') {
          setEventBanner(event.data.banner);
        }
      };
    }
    return () => {
      channelRef.current?.close();
    };
  }, []);

  // Save active match state changes to localStorage and BroadcastChannel
  const broadcastAndPersist = useCallback((match: Match | null, banner?: EventBanner) => {
    try {
      if (match) {
        localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, JSON.stringify(match));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_ACTIVE_KEY);
      }
      if (channelRef.current) {
        channelRef.current.postMessage({ type: 'SYNC_ACTIVE_MATCH', match });
        if (banner) {
          channelRef.current.postMessage({ type: 'TRIGGER_EVENT_BANNER', banner });
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Timer ticker effect
  useEffect(() => {
    if (!activeMatch || !activeMatch.timerRunning || activeMatch.status !== 'live') return;

    const interval = setInterval(() => {
      setActiveMatch((prev) => {
        if (!prev || !prev.timerRunning) return prev;
        const updated = {
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
          basketball: prev.basketball ? {
            ...prev.basketball,
            shotClock: prev.basketball.isShotClockRunning && prev.basketball.shotClock > 0
              ? prev.basketball.shotClock - 1
              : prev.basketball.shotClock
          } : prev.basketball
        };
        broadcastAndPersist(updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeMatch?.timerRunning, activeMatch?.status, broadcastAndPersist]);

  const showToast = useCallback((message: string, type: ToastItem['type'] = 'info') => {
    const id = 'toast_' + Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3000);
  }, []);

  const triggerEventBanner = useCallback((title: string, subtitle?: string, type: string = 'score') => {
    const banner = { type, title, subtitle, timestamp: Date.now() };
    setEventBanner(banner);
    if (channelRef.current) {
      channelRef.current.postMessage({ type: 'TRIGGER_EVENT_BANNER', banner });
    }
    setTimeout(() => {
      setEventBanner((current) => (current?.timestamp === banner.timestamp ? null : current));
    }, 3500);
  }, []);

  const updateMatch = useCallback((
    updater: (draft: Match) => void,
    log?: { description: string; team?: 'A' | 'B'; type: ActionLog['type'] }
  ) => {
    setActiveMatch((prev) => {
      if (!prev) return null;

      // Push copy to undo stack
      setUndoStack((stack) => [...stack.slice(-15), JSON.parse(JSON.stringify(prev))]);

      const draft: Match = JSON.parse(JSON.stringify(prev));
      updater(draft);

      if (log) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        draft.actionHistory.unshift({
          id: 'act_' + Date.now(),
          timestamp: timeStr,
          team: log.team,
          description: log.description,
          type: log.type
        });

        // Trigger sounds & toasts
        if (settings.soundEnabled) {
          if (log.type === 'score') soundManager.playScoreBeep();
          else if (log.type === 'wicket') soundManager.playWicketBuzz();
          else if (log.type === 'foul' || log.type === 'card') soundManager.playWhistle();
          else soundManager.playScoreBeep();
        }

        showToast(log.description, log.type === 'wicket' || log.type === 'card' ? 'warning' : 'success');

        // Check for big splash banners
        if (log.description.toLowerCase().includes('goal')) {
          soundManager.playGoalHorn();
          triggerEventBanner('⚽ GOAL!', log.description, 'goal');
        } else if (log.description.toLowerCase().includes('wicket')) {
          triggerEventBanner('🏏 WICKET!', log.description, 'wicket');
        } else if (log.description.toLowerCase().includes('+3')) {
          triggerEventBanner('🏀 3-POINTER!', log.description, 'score');
        }
      }

      broadcastAndPersist(draft);
      return draft;
    });
  }, [settings.soundEnabled, showToast, triggerEventBanner, broadcastAndPersist]);

  const undoLastAction = useCallback(() => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack((stack) => stack.slice(0, -1));
    setActiveMatch(previous);
    broadcastAndPersist(previous);
    showToast('Action Undone', 'info');
  }, [undoStack, broadcastAndPersist, showToast]);

  const toggleTimer = useCallback(() => {
    updateMatch((draft) => {
      draft.timerRunning = !draft.timerRunning;
    }, {
      description: activeMatch?.timerRunning ? 'Timer Paused' : 'Timer Resumed',
      type: 'other'
    });
  }, [activeMatch?.timerRunning, updateMatch]);

  const resetMatchScore = useCallback(() => {
    if (!activeMatch) return;
    updateMatch((draft) => {
      draft.elapsedSeconds = 0;
      draft.actionHistory = [];
      if (draft.cricket) {
        draft.cricket.teamAScore = 0;
        draft.cricket.teamAWickets = 0;
        draft.cricket.teamAOvers = 0;
        draft.cricket.teamABalls = 0;
        draft.cricket.teamBScore = 0;
        draft.cricket.teamBWickets = 0;
        draft.cricket.teamBOvers = 0;
        draft.cricket.teamBBalls = 0;
        draft.cricket.currentOverBalls = [];
      }
      if (draft.football) {
        draft.football.teamAScore = 0;
        draft.football.teamBScore = 0;
        draft.football.teamAFouls = 0;
        draft.football.teamBFouls = 0;
      }
      if (draft.basketball) {
        draft.basketball.teamAScore = 0;
        draft.basketball.teamBScore = 0;
        draft.basketball.teamAFouls = 0;
        draft.basketball.teamBFouls = 0;
      }
      if (draft.volleyball) {
        draft.volleyball.teamAScore = 0;
        draft.volleyball.teamBScore = 0;
        draft.volleyball.setsWonA = 0;
        draft.volleyball.setsWonB = 0;
        draft.volleyball.setHistory = [];
      }
      if (draft.handball) {
        draft.handball.teamAScore = 0;
        draft.handball.teamBScore = 0;
        draft.handball.teamAFouls = 0;
        draft.handball.teamBFouls = 0;
      }
    }, {
      description: 'Match Score Reset',
      type: 'other'
    });
  }, [activeMatch, updateMatch]);

  const endMatch = useCallback((winnerOverride?: string) => {
    if (!activeMatch) return;

    let computedWinner = winnerOverride || null;

    if (!computedWinner) {
      if (activeMatch.football) {
        if (activeMatch.football.teamAScore > activeMatch.football.teamBScore) computedWinner = activeMatch.teamA;
        else if (activeMatch.football.teamBScore > activeMatch.football.teamAScore) computedWinner = activeMatch.teamB;
        else computedWinner = 'Draw';
      } else if (activeMatch.basketball) {
        if (activeMatch.basketball.teamAScore > activeMatch.basketball.teamBScore) computedWinner = activeMatch.teamA;
        else if (activeMatch.basketball.teamBScore > activeMatch.basketball.teamAScore) computedWinner = activeMatch.teamB;
        else computedWinner = 'Draw';
      } else if (activeMatch.volleyball) {
        if (activeMatch.volleyball.setsWonA > activeMatch.volleyball.setsWonB) computedWinner = activeMatch.teamA;
        else if (activeMatch.volleyball.setsWonB > activeMatch.volleyball.setsWonA) computedWinner = activeMatch.teamB;
        else computedWinner = 'Draw';
      } else if (activeMatch.handball) {
        if (activeMatch.handball.teamAScore > activeMatch.handball.teamBScore) computedWinner = activeMatch.teamA;
        else if (activeMatch.handball.teamBScore > activeMatch.handball.teamAScore) computedWinner = activeMatch.teamB;
        else computedWinner = 'Draw';
      } else if (activeMatch.cricket) {
        const c = activeMatch.cricket;
        if (c.currentInnings === 2 && c.target) {
          if (c.teamAScore >= c.target) computedWinner = activeMatch.teamA;
          else if (c.teamBScore > c.teamAScore) computedWinner = activeMatch.teamB;
          else computedWinner = 'Tie';
        } else {
          computedWinner = c.teamAScore > c.teamBScore ? activeMatch.teamA : activeMatch.teamB;
        }
      }
    }

    const finishedMatch: Match = {
      ...activeMatch,
      status: 'completed',
      timerRunning: false,
      winner: computedWinner
    };

    setActiveMatch(finishedMatch);
    setMatchHistory((prev) => {
      const updated = [finishedMatch, ...prev.filter((m) => m.id !== finishedMatch.id)];
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });

    broadcastAndPersist(finishedMatch);
    showToast(`Match Completed! Winner: ${computedWinner}`, 'success');
    setActiveTab('summary');
  }, [activeMatch, broadcastAndPersist, showToast]);

  const createMatch = useCallback((
    sport: SportType,
    teamA: string,
    teamB: string,
    tournament?: string,
    venue?: string
  ) => {
    const newMatch = createInitialMatch(sport, teamA, teamB, tournament, venue);
    setActiveMatch(newMatch);
    setUndoStack([]);
    broadcastAndPersist(newMatch);
    showToast(`New ${sport.toUpperCase()} Match Created!`, 'success');
    setActiveTab('referee');
    return newMatch;
  }, [broadcastAndPersist, showToast]);

  const loadDemoMatch = useCallback((matchId: string) => {
    const found = demoMatches.find((m) => m.id === matchId) || demoMatches[0];
    const matchCopy = JSON.parse(JSON.stringify(found));
    setActiveMatch(matchCopy);
    setUndoStack([]);
    broadcastAndPersist(matchCopy);
    showToast(`Loaded Demo: ${matchCopy.teamA} vs ${matchCopy.teamB}`, 'info');
    setActiveTab('referee');
  }, [broadcastAndPersist, showToast]);

  const deleteMatchFromHistory = useCallback((matchId: string) => {
    setMatchHistory((prev) => {
      const updated = prev.filter((m) => m.id !== matchId);
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
    showToast('Match removed from history', 'info');
  }, [showToast]);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
    showToast('Settings updated', 'success');
  }, [showToast]);

  return (
    <MatchContext.Provider
      value={{
        activeMatch,
        matchHistory,
        settings,
        toast,
        eventBanner,
        canUndo: undoStack.length > 0,
        activeTab,
        setActiveTab,
        createMatch,
        updateMatch,
        undoLastAction,
        resetMatchScore,
        endMatch,
        loadDemoMatch,
        deleteMatchFromHistory,
        updateSettings,
        showToast,
        triggerEventBanner,
        toggleTimer
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};
