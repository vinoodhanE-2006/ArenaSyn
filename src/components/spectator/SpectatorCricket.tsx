import React from 'react';
import type { Match } from '../../types/scoreboard';

export const SpectatorCricket: React.FC<{ match: Match }> = ({ match }) => {
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
  const battingTeamName = isBattingA ? match.teamA : match.teamB;
  const bowlingTeamName = isBattingA ? match.teamB : match.teamA;
  const currentRuns = isBattingA ? c.teamAScore : c.teamBScore;
  const currentWickets = isBattingA ? c.teamAWickets : c.teamBWickets;
  const currentBalls = isBattingA ? c.teamABalls : c.teamBBalls;
  const oversStr = `${Math.floor(currentBalls / 6)}.${currentBalls % 6}`;

  const reqRuns = c.target ? Math.max(0, c.target - currentRuns) : null;
  const totalMaxBalls = (c.maxOvers || 20) * 6;
  const reqBalls = c.target ? Math.max(0, totalMaxBalls - currentBalls) : null;

  return (
    <div className="flex flex-col justify-between h-full space-y-8 p-4 md:p-8">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-md animate-pulse">
            LIVE
          </span>
          <span className="text-xl md:text-2xl font-black text-slate-300 tracking-wider uppercase">
            🏏 CRICKET — INNINGS {c.currentInnings}
          </span>
        </div>
        {match.tournament && (
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest hidden sm:inline">
            {match.tournament}
          </span>
        )}
      </div>

      {/* Center Score Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-xl">
        {/* Batting Team */}
        <div className="text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-8">
          <span className="px-3 py-1 bg-emerald-950 text-emerald-300 font-extrabold text-xs tracking-widest rounded-lg border border-emerald-500/40 uppercase">
            BATTING NOW
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-emerald-400 tracking-tight uppercase">
            {battingTeamName}
          </h2>
          <div className="text-7xl md:text-9xl font-black font-mono text-slate-100 tracking-tight my-2">
            {currentRuns}<span className="text-red-500">/{currentWickets}</span>
          </div>
          <div className="text-2xl md:text-4xl font-extrabold text-slate-400 font-mono">
            {oversStr} <span className="text-lg text-slate-500 uppercase">Overs</span>
          </div>
        </div>

        {/* Target / Bowling Team */}
        <div className="text-center md:text-left space-y-4 md:pl-4">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">BOWLING TEAM</p>
            <h3 className="text-2xl md:text-4xl font-bold text-slate-200">{bowlingTeamName}</h3>
            <p className="text-lg font-mono text-slate-400 mt-1">
              1st Innings Score: {isBattingA ? c.teamBScore : c.teamAScore}
            </p>
          </div>

          {c.target && reqRuns !== null && reqBalls !== null && (
            <div className="p-5 bg-amber-950/40 border border-amber-500/40 rounded-2xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">TARGET</span>
                <span className="text-3xl font-black text-amber-300 font-mono">{c.target}</span>
              </div>
              <p className="text-lg font-bold text-amber-100">
                NEED <span className="text-2xl text-emerald-400 font-mono">{reqRuns}</span> RUNS FROM <span className="text-2xl text-emerald-400 font-mono">{reqBalls}</span> BALLS
              </p>
            </div>
          )}

          {c.currentBatter && (
            <div className="text-sm text-slate-300 font-medium pt-2">
              <span className="text-slate-500 uppercase">Batter:</span> {c.currentBatter}
            </div>
          )}
        </div>
      </div>

      {/* Current Over Trail */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm md:text-base font-extrabold text-slate-400 uppercase tracking-wider">
          LAST OVER:
        </span>
        <div className="flex items-center gap-3">
          {c.currentOverBalls.length === 0 ? (
            <span className="text-slate-500 font-medium">Over in progress...</span>
          ) : (
            c.currentOverBalls.map((b, idx) => (
              <span
                key={idx}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg md:text-xl font-mono border-2 shadow-lg ${
                  b === 'W'
                    ? 'bg-red-600 border-red-400 text-white'
                    : b === '4' || b === '6'
                    ? 'bg-emerald-600 border-emerald-400 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-100'
                }`}
              >
                {b}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
