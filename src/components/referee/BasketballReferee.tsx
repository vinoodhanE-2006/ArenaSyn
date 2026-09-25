import React from 'react';
import type { Match } from '../../types/scoreboard';
import { useMatch } from '../../context/MatchContext';
import { RotateCcw, Play, Pause, Timer, RefreshCw } from 'lucide-react';
import { formatTimer } from '../../utils/helpers';

export const BasketballReferee: React.FC<{ match: Match }> = ({ match }) => {
  const { updateMatch, undoLastAction, canUndo, toggleTimer } = useMatch();

  const bb = match.basketball || {
    teamAScore: 0,
    teamBScore: 0,
    quarter: 'Q1',
    shotClock: 24,
    isShotClockRunning: false,
    teamAFouls: 0,
    teamBFouls: 0,
    teamATimeouts: 3,
    teamBTimeouts: 3
  };

  const addPoints = (team: 'A' | 'B', pts: number) => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.basketball) return;
      if (team === 'A') draft.basketball.teamAScore += pts;
      else draft.basketball.teamBScore += pts;
      draft.basketball.shotClock = 24;
    }, {
      description: `+${pts} Points — ${teamName}`,
      team,
      type: 'score'
    });
  };

  const recordFoul = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.basketball) return;
      if (team === 'A') draft.basketball.teamAFouls += 1;
      else draft.basketball.teamBFouls += 1;
    }, {
      description: `Personal Foul — ${teamName}`,
      team,
      type: 'foul'
    });
  };

  const useTimeout = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.basketball) return;
      if (team === 'A' && draft.basketball.teamATimeouts > 0) draft.basketball.teamATimeouts -= 1;
      else if (team === 'B' && draft.basketball.teamBTimeouts > 0) draft.basketball.teamBTimeouts -= 1;
    }, {
      description: `Timeout Called — ${teamName}`,
      team,
      type: 'timeout'
    });
  };

  const resetShotClock = (seconds: number) => {
    updateMatch((draft) => {
      if (!draft.basketball) return;
      draft.basketball.shotClock = seconds;
    }, {
      description: `Shot Clock Reset to ${seconds}s`,
      type: 'other'
    });
  };

  const nextQuarter = () => {
    updateMatch((draft) => {
      if (!draft.basketball) return;
      if (draft.basketball.quarter === 'Q1') draft.basketball.quarter = 'Q2';
      else if (draft.basketball.quarter === 'Q2') draft.basketball.quarter = 'Q3';
      else if (draft.basketball.quarter === 'Q3') draft.basketball.quarter = 'Q4';
      else draft.basketball.quarter = 'OT';
      draft.basketball.teamAFouls = 0;
      draft.basketball.teamBFouls = 0;
    }, {
      description: `Quarter Advanced to ${bb.quarter === 'Q1' ? 'Q2' : bb.quarter === 'Q2' ? 'Q3' : bb.quarter === 'Q3' ? 'Q4' : 'OT'}`,
      type: 'period'
    });
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto pb-6">
      {/* Scoreboard Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3 text-center">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
          <span className="text-amber-400 font-extrabold">{bb.quarter}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTimer}
              className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-xs"
            >
              {match.timerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="font-mono">{formatTimer(match.elapsedSeconds)}</span>
            </button>
          </div>
          <div className="flex items-center gap-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-lg">
            <Timer className="w-3.5 h-3.5" />
            <span className="font-mono font-bold">{bb.shotClock}s</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-950/90 p-5 rounded-2xl border border-slate-800/80 items-center">
          <div className="border-r border-slate-800/80 pr-2">
            <p className="text-sm font-bold text-blue-400 truncate uppercase tracking-wider">{match.teamA}</p>
            <div className="text-6xl font-black text-slate-100 font-mono tracking-tight my-2">
              {bb.teamAScore}
            </div>
            <div className="space-y-1 text-xs text-slate-400 font-medium">
              <p>Team Fouls: <span className={bb.teamAFouls >= 4 ? 'text-red-400 font-bold' : 'text-slate-200'}>{bb.teamAFouls}</span></p>
              <p>Timeouts Left: <span className="text-blue-400">{bb.teamATimeouts}</span></p>
            </div>
          </div>

          <div className="pl-2">
            <p className="text-sm font-bold text-emerald-400 truncate uppercase tracking-wider">{match.teamB}</p>
            <div className="text-6xl font-black text-slate-100 font-mono tracking-tight my-2">
              {bb.teamBScore}
            </div>
            <div className="space-y-1 text-xs text-slate-400 font-medium">
              <p>Team Fouls: <span className={bb.teamBFouls >= 4 ? 'text-red-400 font-bold' : 'text-slate-200'}>{bb.teamBFouls}</span></p>
              <p>Timeouts Left: <span className="text-emerald-400">{bb.teamBTimeouts}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Team A Scoring Controls */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-blue-400 uppercase tracking-wider">
          <span>{match.teamA} SCORING</span>
          <span>Fouls: {bb.teamAFouls}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => addPoints('A', 1)}
            className="py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xl rounded-xl shadow-md active:scale-95 transition-all"
          >
            +1 FT
          </button>
          <button
            onClick={() => addPoints('A', 2)}
            className="py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xl rounded-xl shadow-md active:scale-95 transition-all"
          >
            +2 PTS
          </button>
          <button
            onClick={() => addPoints('A', 3)}
            className="py-4 bg-blue-700 hover:bg-blue-600 text-white font-extrabold text-xl rounded-xl shadow-md active:scale-95 transition-all border border-blue-400/40"
          >
            +3 PTS
          </button>
        </div>
      </div>

      {/* Team B Scoring Controls */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <span>{match.teamB} SCORING</span>
          <span>Fouls: {bb.teamBFouls}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => addPoints('B', 1)}
            className="py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xl rounded-xl shadow-md active:scale-95 transition-all"
          >
            +1 FT
          </button>
          <button
            onClick={() => addPoints('B', 2)}
            className="py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xl rounded-xl shadow-md active:scale-95 transition-all"
          >
            +2 PTS
          </button>
          <button
            onClick={() => addPoints('B', 3)}
            className="py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xl rounded-xl shadow-md active:scale-95 transition-all border border-emerald-400/40"
          >
            +3 PTS
          </button>
        </div>
      </div>

      {/* Additional Controls & Shot Clock */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => recordFoul('A')}
          className="py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 active:scale-95"
        >
          Foul {match.teamA}
        </button>
        <button
          onClick={() => recordFoul('B')}
          className="py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 active:scale-95"
        >
          Foul {match.teamB}
        </button>

        <button
          onClick={() => useTimeout('A')}
          disabled={bb.teamATimeouts <= 0}
          className="py-3 bg-slate-800 hover:bg-slate-750 text-blue-300 font-bold text-xs rounded-xl border border-slate-700 disabled:opacity-50"
        >
          Timeout {match.teamA} ({bb.teamATimeouts})
        </button>
        <button
          onClick={() => useTimeout('B')}
          disabled={bb.teamBTimeouts <= 0}
          className="py-3 bg-slate-800 hover:bg-slate-750 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 disabled:opacity-50"
        >
          Timeout {match.teamB} ({bb.teamBTimeouts})
        </button>
      </div>

      {/* Shot Clock Resets */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => resetShotClock(24)}
          className="flex-1 py-3 bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Shot Clock (24s)</span>
        </button>
        <button
          onClick={() => resetShotClock(14)}
          className="flex-1 py-3 bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Offensive Reb (14s)</span>
        </button>
      </div>

      {/* Quarter Progression & Undo */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={undoLastAction}
          disabled={!canUndo}
          className={`py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border ${
            canUndo
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-100'
              : 'bg-slate-900/50 border-slate-800/50 text-slate-600 cursor-not-allowed'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>UNDO ACTION</span>
        </button>

        <button
          onClick={nextQuarter}
          className="py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all border border-indigo-400/30"
        >
          NEXT QUARTER ({bb.quarter})
        </button>
      </div>
    </div>
  );
};
