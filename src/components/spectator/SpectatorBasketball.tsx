import React from 'react';
import type { Match } from '../../types/scoreboard';
import { formatTimer } from '../../utils/helpers';

export const SpectatorBasketball: React.FC<{ match: Match }> = ({ match }) => {
  const bb = match.basketball || {
    teamAScore: 0,
    teamBScore: 0,
    quarter: 'Q1',
    shotClock: 24,
    teamAFouls: 0,
    teamBFouls: 0,
    teamATimeouts: 3,
    teamBTimeouts: 3
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
            🏀 BASKETBALL — {bb.quarter}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-3xl md:text-5xl font-black font-mono text-emerald-400">
            {formatTimer(match.elapsedSeconds)}
          </div>
          <div className="px-4 py-1.5 bg-amber-950 border-2 border-amber-500 rounded-xl text-2xl md:text-4xl font-black font-mono text-amber-300">
            {bb.shotClock}s
          </div>
        </div>
      </div>

      {/* Big Score Board */}
      <div className="grid grid-cols-5 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-xl text-center">
        {/* Team A */}
        <div className="col-span-2 space-y-3">
          <h2 className="text-3xl md:text-6xl font-black text-blue-400 tracking-tight uppercase truncate">
            {match.teamA}
          </h2>
          <div className="text-8xl md:text-[140px] font-black font-mono text-slate-100 leading-none">
            {bb.teamAScore}
          </div>
        </div>

        {/* Divider */}
        <div className="col-span-1 text-5xl md:text-8xl font-black text-slate-600">
          —
        </div>

        {/* Team B */}
        <div className="col-span-2 space-y-3">
          <h2 className="text-3xl md:text-6xl font-black text-emerald-400 tracking-tight uppercase truncate">
            {match.teamB}
          </h2>
          <div className="text-8xl md:text-[140px] font-black font-mono text-slate-100 leading-none">
            {bb.teamBScore}
          </div>
        </div>
      </div>

      {/* Fouls & Timeouts Bar */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-around text-center">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">TEAM FOULS (A)</p>
            <p className={`text-4xl font-black font-mono mt-1 ${bb.teamAFouls >= 4 ? 'text-red-400' : 'text-slate-200'}`}>
              {bb.teamAFouls}
            </p>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">TEAM FOULS (B)</p>
            <p className={`text-4xl font-black font-mono mt-1 ${bb.teamBFouls >= 4 ? 'text-red-400' : 'text-slate-200'}`}>
              {bb.teamBFouls}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-around text-center">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">TIMEOUTS LEFT (A)</p>
            <p className="text-4xl font-black font-mono text-blue-400 mt-1">{bb.teamATimeouts}</p>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">TIMEOUTS LEFT (B)</p>
            <p className="text-4xl font-black font-mono text-emerald-400 mt-1">{bb.teamBTimeouts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
