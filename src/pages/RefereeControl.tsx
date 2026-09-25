import React, { useState } from 'react';
import { useMatch } from '../context/MatchContext';
import { CricketReferee } from '../components/referee/CricketReferee';
import { FootballReferee } from '../components/referee/FootballReferee';
import { BasketballReferee } from '../components/referee/BasketballReferee';
import { VolleyballReferee } from '../components/referee/VolleyballReferee';
import { HandballReferee } from '../components/referee/HandballReferee';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { ArrowLeft, Monitor, History, Square, RefreshCw, AlertCircle } from 'lucide-react';

export const RefereeControl: React.FC = () => {
  const { activeMatch, setActiveTab, settings, resetMatchScore, endMatch } = useMatch();
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!activeMatch) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">No Active Live Match</h2>
        <p className="text-slate-400 text-sm">Create a new match or load a demo match to start referee scoring.</p>
        <button
          onClick={() => setActiveTab('create')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg"
        >
          Create New Match
        </button>
      </div>
    );
  }

  const renderSportReferee = () => {
    switch (activeMatch.sport) {
      case 'cricket':
        return <CricketReferee match={activeMatch} />;
      case 'football':
        return <FootballReferee match={activeMatch} />;
      case 'basketball':
        return <BasketballReferee match={activeMatch} />;
      case 'volleyball':
        return <VolleyballReferee match={activeMatch} />;
      case 'handball':
        return <HandballReferee match={activeMatch} />;
      default:
        return <FootballReferee match={activeMatch} />;
    }
  };

  const getSportIcon = () => {
    switch (activeMatch.sport) {
      case 'cricket': return '🏏';
      case 'football': return '⚽';
      case 'basketball': return '🏀';
      case 'volleyball': return '🏐';
      case 'handball': return '🤾';
    }
  };

  const handleConfirmEnd = () => {
    setShowEndConfirm(false);
    endMatch();
  };

  const handleConfirmReset = () => {
    setShowResetConfirm(false);
    resetMatchScore();
  };

  return (
    <div className="space-y-5 max-w-xl mx-auto pb-16">
      {/* Top Referee Bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-xl">
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-1 text-slate-400 hover:text-white text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xl">{getSportIcon()}</span>
          <span className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">
            {activeMatch.sport}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse">
            ● LIVE
          </span>
        </div>

        <button
          onClick={() => setActiveTab('spectator')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 text-xs font-bold transition-all"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Display</span>
        </button>
      </div>

      {/* Main Sport Referee Controls */}
      {renderSportReferee()}

      {/* Recent Actions Feed */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-slate-400" />
            Recent Match Log
          </span>
          <span className="text-slate-500">{activeMatch.actionHistory.length} events</span>
        </div>

        <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
          {activeMatch.actionHistory.length === 0 ? (
            <p className="text-slate-500 italic text-center py-2">No actions recorded yet</p>
          ) : (
            activeMatch.actionHistory.slice(0, 8).map((act) => (
              <div key={act.id} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                <span className="text-slate-300 font-semibold">{act.description}</span>
                <span className="text-[10px] text-slate-500">{act.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Dangerous Referee Match Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Referee Match Controls</p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              if (settings.confirmReset) setShowResetConfirm(true);
              else resetMatchScore();
            }}
            className="py-3.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>Reset Match Score</span>
          </button>

          <button
            onClick={() => {
              if (settings.confirmEndMatch) setShowEndConfirm(true);
              else endMatch();
            }}
            className="py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-lg shadow-red-950/40"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>END MATCH</span>
          </button>
        </div>
      </div>

      {/* Safety Confirmation Modals */}
      <ConfirmModal
        isOpen={showEndConfirm}
        title="End This Match?"
        message="Are you sure you want to end this match? The final score will be saved to history and match summary will be shown."
        confirmLabel="End Match"
        isDanger={true}
        onConfirm={handleConfirmEnd}
        onCancel={() => setShowEndConfirm(false)}
      />

      <ConfirmModal
        isOpen={showResetConfirm}
        title="Reset Score?"
        message="All current score information, event logs, and timers will be reset to zero. This action cannot be undone."
        confirmLabel="Reset Score"
        isDanger={true}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
