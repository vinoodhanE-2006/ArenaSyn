import React, { useState } from 'react';
import type { Match } from '../../types/scoreboard';
import { useMatch } from '../../context/MatchContext';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

export const CricketReferee: React.FC<{ match: Match }> = ({ match }) => {
  const { updateMatch, undoLastAction, canUndo } = useMatch();
  const [showExtrasMenu, setShowExtrasMenu] = useState(false);
  const [showMoreStats, setShowMoreStats] = useState(false);

  const c = match.cricket || {
    teamAScore: 0,
    teamAWickets: 0,
    teamAOvers: 0,
    teamABalls: 0,
    teamBScore: 0,
    teamBWickets: 0,
    teamBOvers: 0,
    teamBBalls: 0,
    currentInnings: 1,
    battingTeam: 'A',
    currentOverBalls: [],
    extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0 },
    target: null,
    maxOvers: 20
  };

  const isBattingA = c.battingTeam === 'A';
  const currentRuns = isBattingA ? c.teamAScore : c.teamBScore;
  const currentWickets = isBattingA ? c.teamAWickets : c.teamBWickets;
  const currentBalls = isBattingA ? c.teamABalls : c.teamBBalls;
  const oversStr = `${Math.floor(currentBalls / 6)}.${currentBalls % 6}`;

  const addRuns = (runs: number) => {
    updateMatch((draft) => {
      if (!draft.cricket) return;
      const battingA = draft.cricket.battingTeam === 'A';
      if (battingA) {
        draft.cricket.teamAScore += runs;
        draft.cricket.teamABalls += 1;
      } else {
        draft.cricket.teamBScore += runs;
        draft.cricket.teamBBalls += 1;
      }
      draft.cricket.currentOverBalls.push(runs.toString());
    }, {
      description: `${runs} ${runs === 1 ? 'run' : 'runs'} — Team ${c.battingTeam}`,
      team: c.battingTeam,
      type: 'score'
    });
  };

  const addWicket = () => {
    updateMatch((draft) => {
      if (!draft.cricket) return;
      const battingA = draft.cricket.battingTeam === 'A';
      if (battingA) {
        draft.cricket.teamAWickets += 1;
        draft.cricket.teamABalls += 1;
      } else {
        draft.cricket.teamBWickets += 1;
        draft.cricket.teamBBalls += 1;
      }
      draft.cricket.currentOverBalls.push('W');
    }, {
      description: `Wicket! Team ${c.battingTeam}`,
      team: c.battingTeam,
      type: 'wicket'
    });
  };

  const addExtra = (type: 'wides' | 'noBalls' | 'byes' | 'legByes') => {
    setShowExtrasMenu(false);
    updateMatch((draft) => {
      if (!draft.cricket) return;
      draft.cricket.extras[type] += 1;
      const battingA = draft.cricket.battingTeam === 'A';
      
      if (type === 'wides' || type === 'noBalls') {
        if (battingA) draft.cricket.teamAScore += 1;
        else draft.cricket.teamBScore += 1;
        draft.cricket.currentOverBalls.push(type === 'wides' ? 'WD' : 'NB');
      } else {
        if (battingA) {
          draft.cricket.teamAScore += 1;
          draft.cricket.teamABalls += 1;
        } else {
          draft.cricket.teamBScore += 1;
          draft.cricket.teamBBalls += 1;
        }
        draft.cricket.currentOverBalls.push(type === 'byes' ? 'B' : 'LB');
      }
    }, {
      description: `Extra (${type.toUpperCase()}) — Team ${c.battingTeam}`,
      team: c.battingTeam,
      type: 'extra'
    });
  };

  const switchInnings = () => {
    updateMatch((draft) => {
      if (!draft.cricket) return;
      const nextTeam = draft.cricket.battingTeam === 'A' ? 'B' : 'A';
      draft.cricket.currentInnings = 2;
      draft.cricket.battingTeam = nextTeam;
      draft.cricket.target = (nextTeam === 'B' ? draft.cricket.teamAScore : draft.cricket.teamBScore) + 1;
      draft.cricket.currentOverBalls = [];
    }, {
      description: `Innings Switched! Target: ${(isBattingA ? c.teamAScore : c.teamBScore) + 1}`,
      type: 'period'
    });
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto pb-6">
      {/* Cricket Big Scoreboard Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-center space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
          <span>Innings {c.currentInnings}</span>
          <span className="text-emerald-400">Batting: {isBattingA ? match.teamA : match.teamB}</span>
          <span>Target: {c.target ? c.target : '*'}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="border-r border-slate-800 pr-2">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">{isBattingA ? match.teamA : match.teamB}</p>
            <div className="text-4xl md:text-5xl font-black text-slate-100 font-mono tracking-tight my-1">
              {currentRuns}/<span className="text-red-400">{currentWickets}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Overs: {oversStr}</p>
          </div>

          <div className="pl-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{!isBattingA ? match.teamA : match.teamB}</p>
            <div className="text-4xl md:text-5xl font-black text-slate-400 font-mono tracking-tight my-1">
              {isBattingA ? c.teamBScore : c.teamAScore}/<span>{isBattingA ? c.teamBWickets : c.teamAWickets}</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Overs: {isBattingA ? `${Math.floor(c.teamBBalls / 6)}.${c.teamBBalls % 6}` : `${Math.floor(c.teamABalls / 6)}.${c.teamABalls % 6}`}
            </p>
          </div>
        </div>

        {/* Current Over Trail */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">This Over:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {c.currentOverBalls.length === 0 ? (
              <span className="text-xs text-slate-600 italic">No balls yet</span>
            ) : (
              c.currentOverBalls.map((b, idx) => (
                <span
                  key={idx}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                    b === 'W'
                      ? 'bg-red-950 border-red-500 text-red-300'
                      : b === '4' || b === '6'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  {b}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Scoring Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => addRuns(1)}
          className="py-5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-2xl rounded-2xl shadow-lg shadow-blue-950/50 active:scale-95 transition-all border border-blue-400/30"
        >
          +1 RUN
        </button>
        <button
          onClick={() => addRuns(2)}
          className="py-5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-2xl rounded-2xl shadow-lg shadow-blue-950/50 active:scale-95 transition-all border border-blue-400/30"
        >
          +2 RUNS
        </button>
        <button
          onClick={() => addRuns(3)}
          className="py-5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-2xl rounded-2xl shadow-lg shadow-blue-950/50 active:scale-95 transition-all border border-blue-400/30"
        >
          +3 RUNS
        </button>

        <button
          onClick={() => addRuns(4)}
          className="py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-3xl rounded-2xl shadow-lg shadow-emerald-950/50 active:scale-95 transition-all border border-emerald-400/30"
        >
          +4
        </button>
        <button
          onClick={() => addRuns(6)}
          className="py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-3xl rounded-2xl shadow-lg shadow-emerald-950/50 active:scale-95 transition-all border border-emerald-400/30"
        >
          +6
        </button>
        <button
          onClick={addWicket}
          className="py-6 bg-red-600 hover:bg-red-500 text-white font-black text-2xl rounded-2xl shadow-lg shadow-red-950/50 active:scale-95 transition-all border border-red-400/30"
        >
          WICKET
        </button>
      </div>

      {/* Extras Button & Drawer */}
      <div className="relative">
        <button
          onClick={() => setShowExtrasMenu(!showExtrasMenu)}
          className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-amber-950/40 active:scale-98 transition-all flex items-center justify-center gap-2 border border-amber-400/30"
        >
          <span>EXTRA (WIDE / NO BALL / BYE)</span>
          {showExtrasMenu ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showExtrasMenu && (
          <div className="mt-2 grid grid-cols-2 gap-2 bg-slate-900 p-3 rounded-2xl border border-slate-800 animate-fade-in">
            <button
              onClick={() => addExtra('wides')}
              className="py-3 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-bold rounded-xl active:scale-95"
            >
              WIDE (+1)
            </button>
            <button
              onClick={() => addExtra('noBalls')}
              className="py-3 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-bold rounded-xl active:scale-95"
            >
              NO BALL (+1)
            </button>
            <button
              onClick={() => addExtra('byes')}
              className="py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold rounded-xl active:scale-95"
            >
              BYE (+1)
            </button>
            <button
              onClick={() => addExtra('legByes')}
              className="py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold rounded-xl active:scale-95"
            >
              LEG BYE (+1)
            </button>
          </div>
        )}
      </div>

      {/* Control Actions & Undo */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={undoLastAction}
          disabled={!canUndo}
          className={`py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border ${
            canUndo
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-100'
              : 'bg-slate-900/50 border-slate-800/50 text-slate-600 cursor-not-allowed'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>UNDO LAST ACTION</span>
        </button>

        <button
          onClick={switchInnings}
          className="py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all active:scale-95 border border-indigo-400/30"
        >
          END INNINGS
        </button>
      </div>

      {/* Expandable More Stats */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowMoreStats(!showMoreStats)}
          className="w-full px-4 py-3 text-xs font-bold text-slate-400 hover:text-slate-200 flex items-center justify-between"
        >
          <span>More Cricket Statistics</span>
          {showMoreStats ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showMoreStats && (
          <div className="p-4 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <p className="font-semibold text-slate-400 mb-1">Extras Breakdown</p>
              <ul className="space-y-1 font-mono text-slate-400">
                <li>Wides: {c.extras.wides}</li>
                <li>No Balls: {c.extras.noBalls}</li>
                <li>Byes: {c.extras.byes}</li>
                <li>Leg Byes: {c.extras.legByes}</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-400 mb-1">Current Batters & Bowler</p>
              <p className="text-slate-300 font-medium">{c.currentBatter || 'R. Sharma (54*)'}</p>
              <p className="text-slate-300 font-medium">{c.currentBowler || 'K. Patel (2/38)'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
