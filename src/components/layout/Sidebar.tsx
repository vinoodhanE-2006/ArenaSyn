import React from 'react';
import { Home, PlusCircle, Radio, Monitor, History, Settings, Play } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, activeMatch, loadDemoMatch } = useMatch();

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'New Match', icon: PlusCircle },
    { id: 'referee', label: 'Live Match', icon: Radio, badge: activeMatch?.status === 'live' ? 'LIVE' : undefined },
    { id: 'spectator', label: 'Spectator Display', icon: Monitor },
    { id: 'history', label: 'Match History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-950/60 border-r border-slate-800/80 p-4 min-h-[calc(100vh-65px)] justify-between shrink-0">
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold tracking-widest text-slate-500 uppercase">Navigation</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-sm transition-all group ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-950/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Demo Mode Quick Box */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Play className="w-3.5 h-3.5 fill-amber-400" />
            <span>Demo Mode</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Load sample sports data to test referee controls & spectator screens instantly.
          </p>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={() => loadDemoMatch('demo_cricket_1')}
              className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              🏏 Cricket
            </button>
            <button
              onClick={() => loadDemoMatch('demo_football_1')}
              className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              ⚽ Football
            </button>
            <button
              onClick={() => loadDemoMatch('demo_basketball_1')}
              className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              🏀 Basketball
            </button>
            <button
              onClick={() => loadDemoMatch('demo_volleyball_1')}
              className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              🏐 Volleyball
            </button>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-500 space-y-1">
        <div className="flex items-center justify-between font-medium">
          <span>Status</span>
          <span className="text-emerald-400 font-semibold">● Ready</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span>Version</span>
          <span className="font-mono text-slate-400">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};
