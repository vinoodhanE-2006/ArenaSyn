import React from 'react';
import type { Match } from '../../types/scoreboard';

export const SpectatorVolleyball: React.FC<{ match: Match }> = ({ match }) => {
  const vb = match.volleyball || {
    teamAScore: 0,
    teamBScore: 0,
    currentSet: 1,
    setsWonA: 0,
    setsWonB: 0,
    setHistory: []
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-md animate-pulse">
            LIVE
          </span>
          <span className="text-xl md:text-2xl font-black text-slate-300 tracking-wider uppercase">
            🏐 VOLLEYBALL — SET {vb.currentSet}
          </span>
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">
          SETS: {vb.setsWonA} — {vb.setsWonB}
        </div>
      </div>

      {/* Main Score Display */}
      <div className="grid grid-cols-5 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-xl text-center">
        <div className="col-span-2 space-y-3">
          <h2 className="text-3xl md:text-6xl font-black text-blue-400 tracking-tight uppercase truncate">
            {match.teamA}
          </h2>
          <div className="text-8xl md:text-[140px] font-black font-mono text-slate-100 leading-none">
            {vb.teamAScore}
          </div>
        </div>

        <div className="col-span-1 text-5xl md:text-8xl font-black text-slate-600">
          —
        </div>

        <div className="col-span-2 space-y-3">
          <h2 className="text-3xl md:text-6xl font-black text-emerald-400 tracking-tight uppercase truncate">
            {match.teamB}
          </h2>
          <div className="text-8xl md:text-[140px] font-black font-mono text-slate-100 leading-none">
            {vb.teamBScore}
          </div>
        </div>
      </div>

      {/* Set Scores Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
        <span className="text-sm font-extrabold text-slate-400 uppercase tracking-widest">
          SETS WON:
        </span>
        <div className="flex items-center gap-6">
          <span className="text-2xl font-black font-mono text-blue-400">{match.teamA}: {vb.setsWonA}</span>
          <span className="text-2xl font-black font-mono text-emerald-400">{match.teamB}: {vb.setsWonB}</span>
        </div>
      </div>
    </div>
  );
};
