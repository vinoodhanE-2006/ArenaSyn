import React from 'react';
import type { Match } from '../../types/scoreboard';
import { useMatch } from '../../context/MatchContext';
import { RotateCcw, Play, Pause } from 'lucide-react';
import { formatTimer } from '../../utils/helpers';

export const HandballReferee: React.FC<{ match: Match }> = ({ match }) => {
  const { updateMatch, undoLastAction, canUndo, toggleTimer } = useMatch();

  const hb = match.handball || {
    teamAScore: 0,
    teamBScore: 0,
    teamAFouls: 0,
    teamBFouls: 0,
    suspensionsA: 0,
    suspensionsB: 0,
    penaltiesA: 0,
    penaltiesB: 0,
    yellowCardsA: 0,
    yellowCardsB: 0,
    redCardsA: 0,
    redCardsB: 0,
    period: '1st Half'
  };

  const addGoal = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.handball) return;
      if (team === 'A') draft.handball.teamAScore += 1;
      else draft.handball.teamBScore += 1;
    }, {
      description: `GOAL — ${teamName}`,
      team,
      type: 'score'
    });
  };

  const recordFoul = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.handball) return;
      if (team === 'A') draft.handball.teamAFouls += 1;
      else draft.handball.teamBFouls += 1;
    }, {
      description: `Foul — ${teamName}`,
      team,
      type: 'foul'
    });
  };

  const addSuspension = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.handball) return;
      if (team === 'A') draft.handball.suspensionsA += 1;
      else draft.handball.suspensionsB += 1;
    }, {
      description: `2-Min Suspension — ${teamName}`,
      team,
      type: 'card'
    });
  };

  const addPenalty = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.handball) return;
      if (team === 'A') draft.handball.penaltiesA += 1;
      else draft.handball.penaltiesB += 1;
    }, {
      description: `7m Penalty Awarded to ${teamName}`,
      team,
      type: 'other'
    });
  };

  const togglePeriod = () => {
    updateMatch((draft) => {
      if (!draft.handball) return;
      draft.handball.period = draft.handball.period === '1st Half' ? '2nd Half' : '1st Half';
    }, {
      description: `Period Switched`,
      type: 'period'
    });
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto pb-6">
      {/* Handball Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3 text-center">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
          <span>🤾 HANDBALL</span>
          <span className="text-emerald-400 font-bold">{hb.period}</span>
          <button
            onClick={toggleTimer}
            className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-xs"
          >
            {match.timerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="font-mono">{formatTimer(match.elapsedSeconds)}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-950/90 p-5 rounded-2xl border border-slate-800/80 items-center">
          <div className="border-r border-slate-800/80 pr-2">
            <p className="text-sm font-bold text-blue-400 truncate uppercase tracking-wider">{match.teamA}</p>
            <div className="text-6xl font-black text-slate-100 font-mono tracking-tight my-2">
              {hb.teamAScore}
            </div>
            <p className="text-xs text-slate-400">2-Min Suspensions: <span className="text-amber-400 font-bold">{hb.suspensionsA}</span></p>
          </div>

          <div className="pl-2">
            <p className="text-sm font-bold text-emerald-400 truncate uppercase tracking-wider">{match.teamB}</p>
            <div className="text-6xl font-black text-slate-100 font-mono tracking-tight my-2">
              {hb.teamBScore}
            </div>
            <p className="text-xs text-slate-400">2-Min Suspensions: <span className="text-amber-400 font-bold">{hb.suspensionsB}</span></p>
          </div>
        </div>
      </div>

      {/* Main Goal Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => addGoal('A')}
          className="py-8 bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 text-white font-black text-2xl md:text-3xl rounded-2xl shadow-xl active:scale-95 transition-all border border-blue-400/30 flex flex-col items-center justify-center gap-1"
        >
          <span>GOAL {match.teamA}</span>
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">+1 Goal</span>
        </button>

        <button
          onClick={() => addGoal('B')}
          className="py-8 bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 text-white font-black text-2xl md:text-3xl rounded-2xl shadow-xl active:scale-95 transition-all border border-emerald-400/30 flex flex-col items-center justify-center gap-1"
        >
          <span>GOAL {match.teamB}</span>
          <span className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">+1 Goal</span>
        </button>
      </div>

      {/* Penalties, Fouls & Suspensions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Handball Sanctions & Fouls</p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => recordFoul('A')}
            className="py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 active:scale-95"
          >
            Foul ({match.teamA})
          </button>
          <button
            onClick={() => recordFoul('B')}
            className="py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 active:scale-95"
          >
            Foul ({match.teamB})
          </button>

          <button
            onClick={() => addSuspension('A')}
            className="py-3 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-bold text-xs rounded-xl"
          >
            ⏱ 2-Min Suspension ({match.teamA})
          </button>
          <button
            onClick={() => addSuspension('B')}
            className="py-3 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-bold text-xs rounded-xl"
          >
            ⏱ 2-Min Suspension ({match.teamB})
          </button>

          <button
            onClick={() => addPenalty('A')}
            className="py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700"
          >
            7m Penalty ({match.teamA})
          </button>
          <button
            onClick={() => addPenalty('B')}
            className="py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700"
          >
            7m Penalty ({match.teamB})
          </button>
        </div>
      </div>

      {/* Control Actions & Undo */}
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
          onClick={togglePeriod}
          className="py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all border border-indigo-400/30"
        >
          SWITCH PERIOD ({hb.period})
        </button>
      </div>
    </div>
  );
};
