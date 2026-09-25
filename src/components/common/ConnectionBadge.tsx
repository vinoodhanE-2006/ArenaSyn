import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';

export const ConnectionBadge: React.FC = () => {
  const { settings, updateSettings } = useMatch();
  const state = settings.simulatedConnection;

  const cycleConnection = () => {
    if (state === 'online') updateSettings({ simulatedConnection: 'offline' });
    else if (state === 'offline') updateSettings({ simulatedConnection: 'reconnecting' });
    else updateSettings({ simulatedConnection: 'online' });
  };

  return (
    <button
      onClick={cycleConnection}
      title="Click to toggle connection simulation state"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
        state === 'online'
          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
          : state === 'offline'
          ? 'bg-red-950/60 border-red-500/50 text-red-300 hover:bg-red-900/60'
          : 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/60'
      }`}
    >
      {state === 'online' && (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Wifi className="w-3.5 h-3.5" />
          <span>Connected</span>
        </>
      )}

      {state === 'offline' && (
        <>
          <WifiOff className="w-3.5 h-3.5 text-red-400" />
          <span>Offline (Saving Locally)</span>
        </>
      )}

      {state === 'reconnecting' && (
        <>
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
          <span>Reconnecting...</span>
        </>
      )}
    </button>
  );
};
