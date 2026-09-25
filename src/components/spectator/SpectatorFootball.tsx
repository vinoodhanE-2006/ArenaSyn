import React from 'react';
import type { Match } from '../../types/scoreboard';
import { formatTimer } from '../../utils/helpers';

export const SpectatorFootball: React.FC<{ match: Match }> = ({ match }) => {
  const fb = match.football || {
    teamAScore: 0,
    teamBScore: 0,
    teamAFouls: 0,
    teamBFouls: 0,
    teamAYellowCards: 0,
    teamBYellowCards: 0,
    teamARedCards: 0,
    teamBRedCards: 0,
    period: '1st Half'
  };

  const recentScoreLog = match.actionHistory.find((a) => a.type === 'score');

  return (
    <div className="flex flex-col justify-between h-full space-y-6 p-4 md:p-8">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-md animate-pulse">
            LIVE
          </span>
          <span className="text-xl md:text-2xl font-black text-slate-300 tracking-wider uppercase">
            ⚽ FOOTBALL — {fb.period}
          </span>
        </div>
        <div className="text-3xl md:text-5xl font-black font-mono text-emerald-400">
          {formatTimer(match.elapsedSeconds)}
        </div>
      </div>

      {/* Main Score Board */}
      <div className="grid grid-cols-5 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-xl text-center">
        {/* Team A */}
        <div className="col-span-2 space-y-3">
          <h2 className="text-3xl md:text-6xl font-black text-blue-400 tracking-tight uppercase truncate">
            {match.teamA}
          </h2>
          <div className="text-8xl md:text-[140px] font-black font-mono text-slate-100 leading-none">
            {fb.teamAScore}
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
            {fb.teamBScore}
          </div>
        </div>
      </div>

      {/* Bottom Stats & Recent Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-around text-center">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">FOULS TEAM A</p>
            <p className="text-3xl font-black font-mono text-slate-200 mt-1">{fb.teamAFouls}</p>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">FOULS TEAM B</p>
            <p className="text-3xl font-black font-mono text-slate-200 mt-1">{fb.teamBFouls}</p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center justify-center text-center">
          {recentScoreLog ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-bounce">⚽</span>
              <span className="text-lg md:text-xl font-extrabold text-emerald-400 uppercase tracking-wider">
                RECENT: {recentScoreLog.description}
              </span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              MATCH IN PROGRESS
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
