import React from 'react';
import { useMatch } from '../context/MatchContext';
import { formatTimer } from '../utils/helpers';
import { Trophy, Clock, Calendar, MapPin, CheckCircle, PlusCircle, History, Monitor } from 'lucide-react';

export const MatchSummary: React.FC = () => {
  const { activeMatch, matchHistory, setActiveTab } = useMatch();
  const match = activeMatch || matchHistory[0];

  if (!match) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">No Match Summary Available</h2>
        <p className="text-slate-400 text-sm">Complete a live match to view detailed statistics.</p>
        <button
          onClick={() => setActiveTab('home')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl"
        >
          Return Home
        </button>
      </div>
    );
  }

  const getSportScore = () => {
    if (match.football) return `${match.football.teamAScore} — ${match.football.teamBScore}`;
    if (match.basketball) return `${match.basketball.teamAScore} — ${match.basketball.teamBScore}`;
    if (match.volleyball) return `${match.volleyball.teamAScore} — ${match.volleyball.teamBScore}`;
    if (match.handball) return `${match.handball.teamAScore} — ${match.handball.teamBScore}`;
    if (match.cricket) {
      const c = match.cricket;
      return `${match.teamA}: ${c.teamAScore}/${c.teamAWickets} (${Math.floor(c.teamABalls / 6)}.${c.teamABalls % 6} ov) vs ${match.teamB}: ${c.teamBScore}/${c.teamBWickets} (${Math.floor(c.teamBBalls / 6)}.${c.teamBBalls % 6} ov)`;
    }
    return 'Completed';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs tracking-widest uppercase">
          <CheckCircle className="w-4 h-4" />
          <span>MATCH COMPLETE</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black text-slate-100 tracking-tight uppercase">
            {match.teamA} <span className="text-slate-500 font-normal">vs</span> {match.teamB}
          </h1>
          <div className="text-3xl md:text-5xl font-black font-mono text-emerald-400">
            {getSportScore()}
          </div>
        </div>

        {/* Winner Badge */}
        {match.winner && (
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-lg md:text-xl shadow-lg">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>WINNER: {match.winner}</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium pt-2 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-500" />
            Duration: <strong className="text-slate-200">{formatTimer(match.elapsedSeconds)}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-500" />
            Date: <strong className="text-slate-200">{match.date}</strong>
          </span>
          {match.venue && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-500" />
              Venue: <strong className="text-slate-200">{match.venue}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Sport-Specific Detailed Breakdown Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <h2 className="text-lg font-extrabold text-slate-100 uppercase tracking-wider text-xs font-mono">
          Sport Match Breakdown Statistics ({match.sport.toUpperCase()})
        </h2>

        {/* Football breakdown */}
        {match.football && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Goals</p>
              <p className="text-3xl font-black text-emerald-400 mt-1">{match.football.teamAScore + match.football.teamBScore}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Fouls</p>
              <p className="text-3xl font-black text-slate-200 mt-1">{match.football.teamAFouls + match.football.teamBFouls}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Yellow Cards</p>
              <p className="text-3xl font-black text-amber-400 mt-1">{match.football.teamAYellowCards + match.football.teamBYellowCards}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Red Cards</p>
              <p className="text-3xl font-black text-red-400 mt-1">{match.football.teamARedCards + match.football.teamBRedCards}</p>
            </div>
          </div>
        )}

        {/* Cricket breakdown */}
        {match.cricket && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Runs</p>
                <p className="text-3xl font-black text-emerald-400 mt-1">{match.cricket.teamAScore + match.cricket.teamBScore}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Wickets</p>
                <p className="text-3xl font-black text-red-400 mt-1">{match.cricket.teamAWickets + match.cricket.teamBWickets}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Extras</p>
                <p className="text-3xl font-black text-amber-400 mt-1">
                  {match.cricket.extras.wides + match.cricket.extras.noBalls + match.cricket.extras.byes + match.cricket.extras.legByes}
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-500 font-sans font-bold uppercase">Innings Played</p>
                <p className="text-3xl font-black text-blue-400 mt-1">{match.cricket.currentInnings}</p>
              </div>
            </div>
          </div>
        )}

        {/* Basketball breakdown */}
        {match.basketball && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Points</p>
              <p className="text-3xl font-black text-emerald-400 mt-1">{match.basketball.teamAScore + match.basketball.teamBScore}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Team Fouls</p>
              <p className="text-3xl font-black text-slate-200 mt-1">{match.basketball.teamAFouls + match.basketball.teamBFouls}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Final Quarter</p>
              <p className="text-3xl font-black text-amber-400 mt-1">{match.basketball.quarter}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Timeouts Remaining</p>
              <p className="text-3xl font-black text-blue-400 mt-1">{match.basketball.teamATimeouts + match.basketball.teamBTimeouts}</p>
            </div>
          </div>
        )}

        {/* Volleyball breakdown */}
        {match.volleyball && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-center font-mono">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-500 font-sans font-bold uppercase">{match.teamA} Sets Won</p>
                <p className="text-4xl font-black text-blue-400 mt-1">{match.volleyball.setsWonA}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-500 font-sans font-bold uppercase">{match.teamB} Sets Won</p>
                <p className="text-4xl font-black text-emerald-400 mt-1">{match.volleyball.setsWonB}</p>
              </div>
            </div>
          </div>
        )}

        {/* Handball breakdown */}
        {match.handball && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Goals</p>
              <p className="text-3xl font-black text-emerald-400 mt-1">{match.handball.teamAScore + match.handball.teamBScore}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">Total Fouls</p>
              <p className="text-3xl font-black text-slate-200 mt-1">{match.handball.teamAFouls + match.handball.teamBFouls}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">2-Min Suspensions</p>
              <p className="text-3xl font-black text-amber-400 mt-1">{match.handball.suspensionsA + match.handball.suspensionsB}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-500 font-sans font-bold uppercase">7m Penalties</p>
              <p className="text-3xl font-black text-blue-400 mt-1">{match.handball.penaltiesA + match.handball.penaltiesB}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('create')}
          className="py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Match</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className="py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-2xl border border-slate-700 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <History className="w-4 h-4" />
          <span>View Match History</span>
        </button>

        <button
          onClick={() => setActiveTab('spectator')}
          className="py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Monitor className="w-4 h-4" />
          <span>Open Scoreboard</span>
        </button>
      </div>
    </div>
  );
};
