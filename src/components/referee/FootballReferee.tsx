import React from 'react';
import type { Match } from '../../types/scoreboard';
import { useMatch } from '../../context/MatchContext';
import { RotateCcw, Play, Pause } from 'lucide-react';
import { formatTimer } from '../../utils/helpers';

export const FootballReferee: React.FC<{ match: Match }> = ({ match }) => {
  const { updateMatch, undoLastAction, canUndo, toggleTimer } = useMatch();

  const fb = match.football || {
    teamAScore: 0,
    teamBScore: 0,
    teamAFouls: 0,
    teamBFouls: 0,
    teamAYellowCards: 0,
    teamBYellowCards: 0,
    teamARedCards: 0,
    teamBRedCards: 0,
    teamACorners: 0,
    teamBCorners: 0,
    period: '1st Half'
  };

  const addGoal = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.football) return;
      if (team === 'A') draft.football.teamAScore += 1;
      else draft.football.teamBScore += 1;
    }, {
      description: `GOAL — ${teamName}!`,
      team,
      type: 'score'
    });
  };

  const recordFoul = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.football) return;
      if (team === 'A') draft.football.teamAFouls += 1;
      else draft.football.teamBFouls += 1;
    }, {
      description: `Foul committed by ${teamName}`,
      team,
      type: 'foul'
    });
  };

  const addCard = (team: 'A' | 'B', cardType: 'yellow' | 'red') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.football) return;
      if (cardType === 'yellow') {
        if (team === 'A') draft.football.teamAYellowCards += 1;
        else draft.football.teamBYellowCards += 1;
      } else {
        if (team === 'A') draft.football.teamARedCards += 1;
        else draft.football.teamBRedCards += 1;
      }
    }, {
      description: `${cardType === 'yellow' ? 'Yellow' : 'Red'} Card — ${teamName}`,
      team,
      type: 'card'
    });
  };

  const addCorner = (team: 'A' | 'B') => {
    const teamName = team === 'A' ? match.teamA : match.teamB;
    updateMatch((draft) => {
      if (!draft.football) return;
      if (team === 'A') draft.football.teamACorners += 1;
      else draft.football.teamBCorners += 1;
    }, {
      description: `Corner Kick — ${teamName}`,
      team,
      type: 'other'
    });
  };

  const togglePeriod = () => {
    updateMatch((draft) => {
      if (!draft.football) return;
      if (draft.football.period === '1st Half') draft.football.period = '2nd Half';
      else if (draft.football.period === '2nd Half') draft.football.period = 'Extra Time';
      else draft.football.period = '1st Half';
    }, {
      description: `Period Changed`,
      type: 'period'
    });
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto pb-6">
      {/* Football Score & Timer Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 text-center">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
          <span>⚽ FOOTBALL</span>
          <span className="text-emerald-400 font-bold">{fb.period}</span>
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
              {fb.teamAScore}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
              <span>Fouls: {fb.teamAFouls}</span>
              <span className="text-amber-400">🟨 {fb.teamAYellowCards}</span>
              <span className="text-red-400">🟥 {fb.teamARedCards}</span>
            </div>
          </div>

          <div className="pl-2">
            <p className="text-sm font-bold text-emerald-400 truncate uppercase tracking-wider">{match.teamB}</p>
            <div className="text-6xl font-black text-slate-100 font-mono tracking-tight my-2">
              {fb.teamBScore}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
              <span>Fouls: {fb.teamBFouls}</span>
              <span className="text-amber-400">🟨 {fb.teamBYellowCards}</span>
              <span className="text-red-400">🟥 {fb.teamBRedCards}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Goal Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => addGoal('A')}
          className="py-7 bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-2xl md:text-3xl rounded-2xl shadow-xl shadow-blue-950/60 active:scale-95 transition-all border border-blue-400/30 flex flex-col items-center justify-center gap-1"
        >
          <span>GOAL {match.teamA}</span>
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">+1 Goal</span>
        </button>

        <button
          onClick={() => addGoal('B')}
          className="py-7 bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-2xl md:text-3xl rounded-2xl shadow-xl shadow-emerald-950/60 active:scale-95 transition-all border border-emerald-400/30 flex flex-col items-center justify-center gap-1"
        >
          <span>GOAL {match.teamB}</span>
          <span className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">+1 Goal</span>
        </button>
      </div>

      {/* Match Events: Fouls & Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Match Events</p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => recordFoul('A')}
            className="py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-sm rounded-xl border border-slate-700 active:scale-95"
          >
            FOUL {match.teamA}
          </button>
          <button
            onClick={() => recordFoul('B')}
            className="py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-sm rounded-xl border border-slate-700 active:scale-95"
          >
            FOUL {match.teamB}
          </button>

          <button
            onClick={() => addCard('A', 'yellow')}
            className="py-3 bg-amber-950/80 hover:bg-amber-900/90 text-amber-200 border border-amber-500/40 font-bold text-xs rounded-xl active:scale-95"
          >
            🟨 Yellow ({match.teamA})
          </button>
          <button
            onClick={() => addCard('B', 'yellow')}
            className="py-3 bg-amber-950/80 hover:bg-amber-900/90 text-amber-200 border border-amber-500/40 font-bold text-xs rounded-xl active:scale-95"
          >
            🟨 Yellow ({match.teamB})
          </button>

          <button
            onClick={() => addCard('A', 'red')}
            className="py-3 bg-red-950/80 hover:bg-red-900/90 text-red-200 border border-red-500/40 font-bold text-xs rounded-xl active:scale-95"
          >
            🟥 Red ({match.teamA})
          </button>
          <button
            onClick={() => addCard('B', 'red')}
            className="py-3 bg-red-950/80 hover:bg-red-900/90 text-red-200 border border-red-500/40 font-bold text-xs rounded-xl active:scale-95"
          >
            🟥 Red ({match.teamB})
          </button>

          <button
            onClick={() => addCorner('A')}
            className="py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700"
          >
            Corner ({match.teamA})
          </button>
          <button
            onClick={() => addCorner('B')}
            className="py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700"
          >
            Corner ({match.teamB})
          </button>
        </div>
      </div>

      {/* Period & Undo Controls */}
      <div className="grid grid-cols-2 gap-3">
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
          SWITCH PERIOD ({fb.period})
        </button>
      </div>
    </div>
  );
};
