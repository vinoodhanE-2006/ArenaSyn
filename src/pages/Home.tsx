import React from 'react';
import { Plus, Radio, Monitor, Sparkles } from 'lucide-react';
import { useMatch } from '../context/MatchContext';
import type { SportType } from '../types/scoreboard';

export const Home: React.FC = () => {
  const { setActiveTab, activeMatch, createMatch } = useMatch();

  const sportsList: Array<{ id: SportType; icon: string; name: string; desc: string; color: string }> = [
    { id: 'cricket', icon: '🏏', name: 'Cricket', desc: 'Runs, wickets, overs & ball tracking', color: 'from-amber-600/20 to-amber-950/40 border-amber-500/30' },
    { id: 'football', icon: '⚽', name: 'Football', desc: 'Goals, fouls, yellow & red cards', color: 'from-emerald-600/20 to-emerald-950/40 border-emerald-500/30' },
    { id: 'basketball', icon: '🏀', name: 'Basketball', desc: 'Quarter points, shot clock & team fouls', color: 'from-orange-600/20 to-orange-950/40 border-orange-500/30' },
    { id: 'volleyball', icon: '🏐', name: 'Volleyball', desc: 'Sets won, points & challenge system', color: 'from-blue-600/20 to-blue-950/40 border-blue-500/30' },
    { id: 'handball', icon: '🤾', name: 'Handball', desc: 'Goals, 7m penalties & 2-min suspensions', color: 'from-indigo-600/20 to-indigo-950/40 border-indigo-500/30' }
  ];

  const quickStartSport = (sport: SportType) => {
    if (sport === 'football') createMatch('football', 'Lions FC', 'Tigers FC', 'Inter-School League', 'Main Field');
    else if (sport === 'cricket') createMatch('cricket', 'Tamil Warriors', 'City Kings', 'Academy Cup', 'Greenfield');
    else if (sport === 'basketball') createMatch('basketball', 'Eagles', 'Warriors', 'District Championship', 'Court 1');
    else if (sport === 'volleyball') createMatch('volleyball', 'Thunder Spikers', 'Blue Stars', 'Regional Series', 'Gym A');
    else createMatch('handball', 'Red Hawks', 'Black Panthers', 'Youth Cup', 'Arena 2');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Sport Stadium Solution</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Smart Sports Scoreboard
          </h1>
          <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed">
            Simple live scoring for every game. Designed for schools, colleges, playgrounds, tournaments, and local competitions.
          </p>
        </div>
      </div>

      {/* 3 Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CREATE MATCH CARD */}
        <div
          onClick={() => setActiveTab('create')}
          className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-blue-950/40 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Plus className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">CREATE MATCH</h2>
              <p className="text-slate-400 text-sm mt-1">Start a new match with custom teams, venue, and tournament details.</p>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95">
            Create Match
          </button>
        </div>

        {/* LIVE MATCH CARD */}
        <div
          onClick={() => setActiveTab('referee')}
          className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-emerald-950/40 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Radio className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">LIVE MATCH</h2>
              <p className="text-slate-400 text-sm mt-1">
                {activeMatch ? `Control ongoing ${activeMatch.sport.toUpperCase()} match: ${activeMatch.teamA} vs ${activeMatch.teamB}` : 'Control an ongoing match with fast 1-tap referee buttons.'}
              </p>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95">
            {activeMatch ? 'Open Live Match' : 'Open Live Referee'}
          </button>
        </div>

        {/* SPECTATOR DISPLAY CARD */}
        <div
          onClick={() => setActiveTab('spectator')}
          className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-amber-950/40 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Monitor className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">SPECTATOR DISPLAY</h2>
              <p className="text-slate-400 text-sm mt-1">Open the large TV / LED scoreboard with huge readable typography.</p>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95">
            Launch Display
          </button>
        </div>
      </div>

      {/* Supported Sports Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Supported Sports</h2>
          <span className="text-xs text-slate-400 font-semibold">Click to Quick-Start Match</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sportsList.map((sport) => (
            <div
              key={sport.id}
              onClick={() => quickStartSport(sport.id)}
              className={`p-5 rounded-2xl bg-gradient-to-b ${sport.color} border hover:scale-[1.03] transition-all cursor-pointer shadow-lg space-y-3 flex flex-col justify-between`}
            >
              <div className="space-y-2">
                <span className="text-4xl">{sport.icon}</span>
                <h3 className="text-lg font-bold text-slate-100">{sport.name}</h3>
                <p className="text-xs text-slate-400 leading-normal">{sport.desc}</p>
              </div>
              <button className="w-full py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700">
                Quick Start
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
