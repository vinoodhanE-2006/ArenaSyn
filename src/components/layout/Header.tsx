import React from 'react';
import { Activity, PlayCircle, PlusCircle, Monitor } from 'lucide-react';
import { ConnectionBadge } from '../common/ConnectionBadge';
import { useMatch } from '../../context/MatchContext';

export const Header: React.FC = () => {
  const { activeMatch, setActiveTab, loadDemoMatch } = useMatch();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-400 group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-base md:text-lg text-slate-100 tracking-tight leading-none group-hover:text-blue-400 transition-colors">
              Smart Sports Scoreboard
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Multi-Sport Live System</p>
          </div>
        </div>

        {/* Right side status & Quick Demo button */}
        <div className="flex items-center gap-3">
          <ConnectionBadge />

          <button
            onClick={() => loadDemoMatch('demo_football_1')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition-all"
            title="Load realistic sample match for fast testing"
          >
            <PlayCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Demo Match</span>
          </button>

          {activeMatch && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setActiveTab('referee')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition-all active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Referee</span>
              </button>
              <button
                onClick={() => setActiveTab('spectator')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-950/40 transition-all active:scale-95"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Display</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
