import React from 'react';
import type { Match } from '../../types/scoreboard';
import { useMatch } from '../../context/MatchContext';
import { RotateCcw } from 'lucide-react';

export const VolleyballReferee: React.FC<{ match: Match }> = ({ match }) => {
  const { updateMatch, undoLastAction, canUndo } = useMatch();

  const vb = match.volleyball || {
    teamAScore: 0,
    teamBScore: 0,
    currentSet: 1,
    setsWonA: 0,
    setsWonB: 0,
    teamATimeouts: 2,
    teamBTimeouts: 2,
    setHistory: []
  };

  const addPoint = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.volleyball) return;
      if (team === 'A') draft.volleyball.teamAScore += 1;
      else draft.volleyball.teamBScore += 1;
    }, {
      description: `Point — ${teamName}`,
      team,
      type: 'score'
    });
  };

  const endSet = () => {
    updateMatch((draft) => {
      if (!draft.volleyball) return;
      const scoreA = draft.volleyball.teamAScore;
      const scoreB = draft.volleyball.teamBScore;

      const winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : null;
      if (winner === 'A') draft.volleyball.setsWonA += 1;
      else if (winner === 'B') draft.volleyball.setsWonB += 1;

      draft.volleyball.setHistory.push({
        setNumber: draft.volleyball.currentSet,
        teamA: scoreA,
        teamB: scoreB
      });

      draft.volleyball.currentSet += 1;
      draft.volleyball.teamAScore = 0;
      draft.volleyball.teamBScore = 0;
      draft.volleyball.teamATimeouts = 2;
      draft.volleyball.teamBTimeouts = 2;
    }, {
      description: `Set ${vb.currentSet} Ended (${vb.teamAScore} - ${vb.teamBScore})`,
      type: 'period'
    });
  };

  const useTimeout = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.volleyball) return;
      if (team === 'A' && draft.volleyball.teamATimeouts > 0) draft.volleyball.teamATimeouts -= 1;
      else if (team === 'B' && draft.volleyball.teamBTimeouts > 0) draft.volleyball.teamBTimeouts -= 1;
    }, {
      description: `Timeout Called — ${teamName}`,
      team,
      type: 'timeout'
    });
  };

  const recordChallenge = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch(() => {
      // Record challenge event
    }, {
      description: `Video Challenge Requested by ${teamName}`,
      team,
      type: 'other'
    });
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto pb-6">
      {/* Volleyball Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3 text-center">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
          <span>🏐 VOLLEYBALL</span>
          <span className="text-amber-400 font-extrabold">SET {vb.currentSet}</span>
          <span className="text-emerald-400">Sets: {vb.setsWonA} - {vb.setsWonB}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-950/90 p-5 rounded-2xl border border-slate-800/80 items-center">
          <div className="border-r border-slate-800/80 pr-2">
            <p className="text-sm font-bold text-blue-400 truncate uppercase tracking-wider">{match.teamA}</p>
            <div className="text-6xl font-black text-slate-100 font-mono tracking-tight my-2">
              {vb.teamAScore}
            </div>
            <p className="text-xs text-slate-400 font-medium">Sets Won: <span className="text-blue-400 font-bold">{vb.setsWonA}</span></p>
          </div>

          <div className="pl-2">
            <p className="text-sm font-bold text-emerald-400 truncate uppercase tracking-wider">{match.teamB}</p>
            <div className="text-6xl font-black text-slate-100 font-mono tracking-tight my-2">
              {vb.teamBScore}
            </div>
            <p className="text-xs text-slate-400 font-medium">Sets Won: <span className="text-emerald-400 font-bold">{vb.setsWonB}</span></p>
          </div>
        </div>

        {/* Set History Bar */}
        {vb.setHistory.length > 0 && (
          <div className="flex items-center justify-center gap-3 text-xs text-slate-400 pt-1">
            <span>Previous Sets:</span>
            {vb.setHistory.map((s) => (
              <span key={s.setNumber} className="bg-slate-800 px-2.5 py-1 rounded-lg font-mono font-semibold text-slate-300">
                S{s.setNumber}: {s.teamA}-{s.teamB}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Point Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => addPoint('A')}
          className="py-8 bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 text-white font-black text-2xl md:text-3xl rounded-2xl shadow-xl shadow-blue-950/60 active:scale-95 transition-all border border-blue-400/30 flex flex-col items-center justify-center gap-1"
        >
          <span>POINT {match.teamA}</span>
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">+1 Point</span>
        </button>

        <button
          onClick={() => addPoint('B')}
          className="py-8 bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 text-white font-black text-2xl md:text-3xl rounded-2xl shadow-xl shadow-emerald-950/60 active:scale-95 transition-all border border-emerald-400/30 flex flex-col items-center justify-center gap-1"
        >
          <span>POINT {match.teamB}</span>
          <span className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">+1 Point</span>
        </button>
      </div>

      {/* Timeouts & Challenge */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => useTimeout('A')}
          disabled={vb.teamATimeouts <= 0}
          className="py-3 bg-slate-800 hover:bg-slate-750 text-blue-300 font-bold text-xs rounded-xl border border-slate-700 disabled:opacity-50"
        >
          Timeout {match.teamA} ({vb.teamATimeouts} left)
        </button>
        <button
          onClick={() => useTimeout('B')}
          disabled={vb.teamBTimeouts <= 0}
          className="py-3 bg-slate-800 hover:bg-slate-750 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 disabled:opacity-50"
        >
          Timeout {match.teamB} ({vb.teamBTimeouts} left)
        </button>

        <button
          onClick={() => recordChallenge('A')}
          className="py-2.5 bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 font-semibold text-xs rounded-xl"
        >
          Challenge ({match.teamA})
        </button>
        <button
          onClick={() => recordChallenge('B')}
          className="py-2.5 bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 font-semibold text-xs rounded-xl"
        >
          Challenge ({match.teamB})
        </button>
      </div>

      {/* Set End & Undo */}
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
          onClick={endSet}
          className="py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all border border-indigo-400/30"
        >
          END SET {vb.currentSet}
        </button>
      </div>
    </div>
  );
};
