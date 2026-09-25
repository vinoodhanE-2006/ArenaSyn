import React from 'react';
import { Home, PlusCircle, Radio, Monitor, History, Settings } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeMatch } = useMatch();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'create', label: 'New Match', icon: PlusCircle },
    { id: 'referee', label: 'Referee', icon: Radio, isLive: activeMatch?.status === 'live' },
    { id: 'spectator', label: 'Display', icon: Monitor },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-blue-400 font-bold scale-105'
                  : 'text-slate-400 font-medium hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {item.isLive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-slate-950 animate-ping" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
