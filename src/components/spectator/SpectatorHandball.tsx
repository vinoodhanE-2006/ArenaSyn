import React from 'react';
import type { Match } from '../../types/scoreboard';
import { formatTimer } from '../../utils/helpers';

export const SpectatorHandball: React.FC<{ match: Match }> = ({ match }) => {
  const hb = match.handball || {
    teamAScore: 0,
    teamBScore: 0,
    suspensionsA: 0,
    suspensionsB: 0,
    period: '1st Half'
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
            🤾 HANDBALL — {hb.period}
          </span>
        </div>
        <div className="text-3xl md:text-5xl font-black font-mono text-emerald-400">
          {formatTimer(match.elapsedSeconds)}
        </div>
      </div>

      {/* Main Score Board */}
      <div className="grid grid-cols-5 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-xl text-center">
        <div className="col-span-2 space-y-3">
          <h2 className="text-3xl md:text-6xl font-black text-blue-400 tracking-tight uppercase truncate">
            {match.teamA}
          </h2>
          <div className="text-8xl md:text-[140px] font-black font-mono text-slate-100 leading-none">
            {hb.teamAScore}
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
            {hb.teamBScore}
          </div>
        </div>
      </div>

      {/* Suspensions Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-around text-center">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">2-MIN SUSPENSIONS ({match.teamA})</p>
          <p className="text-3xl font-black font-mono text-amber-400 mt-1">{hb.suspensionsA}</p>
        </div>
        <div className="h-10 w-px bg-slate-800" />
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">2-MIN SUSPENSIONS ({match.teamB})</p>
          <p className="text-3xl font-black font-mono text-amber-400 mt-1">{hb.suspensionsB}</p>
        </div>
      </div>
    </div>
  );
};
