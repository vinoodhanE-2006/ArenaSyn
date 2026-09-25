import React from 'react';
import { useMatch } from '../context/MatchContext';
import { Volume2, VolumeX, ShieldAlert, Wifi, Monitor } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useMatch();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">System Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Customize referee safety checks, audio feedback, and spectator display scaling.</p>
      </div>

      <div className="space-y-6">
        {/* Display & Sound Settings */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <Monitor className="w-4 h-4 text-blue-400" />
            Display & Sound Settings
          </h2>

          <div className="space-y-4 divide-y divide-slate-800/80">
            {/* Audio Toggle */}
            <div className="flex items-center justify-between pt-3">
              <div>
                <h3 className="text-sm font-bold text-slate-200">Audio Sound Effects</h3>
                <p className="text-xs text-slate-400">Synthesizer beeps for goals, whistles, and score updates.</p>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`p-3 rounded-2xl border transition-all active:scale-95 flex items-center gap-2 ${
                  settings.soundEnabled
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                <span className="text-xs font-bold">{settings.soundEnabled ? 'Enabled' : 'Muted'}</span>
              </button>
            </div>

            {/* Font Scale */}
            <div className="flex items-center justify-between pt-4">
              <div>
                <h3 className="text-sm font-bold text-slate-200">Scoreboard Typography Scaling</h3>
                <p className="text-xs text-slate-400">Scale scoreboard font size for huge stadium LED monitors.</p>
              </div>
              <select
                value={settings.fontScale}
                onChange={(e) => updateSettings({ fontScale: e.target.value as any })}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none"
              >
                <option value="normal">Normal (Standard)</option>
                <option value="large">Large (Stadium TV)</option>
                <option value="huge">Huge (Outdoor LED Screen)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Referee Safety & Confirmations */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Referee Safety & Error Prevention
          </h2>

          <div className="space-y-4 divide-y divide-slate-800/80">
            {/* Confirm End Match */}
            <div className="flex items-center justify-between pt-3">
              <div>
                <h3 className="text-sm font-bold text-slate-200">Confirm Before Ending Match</h3>
                <p className="text-xs text-slate-400">Require safety confirmation dialog before ending a match.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.confirmEndMatch}
                onChange={(e) => updateSettings({ confirmEndMatch: e.target.checked })}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            {/* Confirm Reset */}
            <div className="flex items-center justify-between pt-4">
              <div>
                <h3 className="text-sm font-bold text-slate-200">Confirm Before Score Reset</h3>
                <p className="text-xs text-slate-400">Require confirmation before clearing all current match scores.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.confirmReset}
                onChange={(e) => updateSettings({ confirmReset: e.target.checked })}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Simulated Connection State */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            Simulated Realtime Network State
          </h2>

          <div className="space-y-2">
            <p className="text-xs text-slate-400">
              Test how the referee interface behaves during weak outdoor network connectivity.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => updateSettings({ simulatedConnection: 'online' })}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  settings.simulatedConnection === 'online'
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                ● Connected
              </button>
              <button
                onClick={() => updateSettings({ simulatedConnection: 'offline' })}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  settings.simulatedConnection === 'offline'
                    ? 'bg-red-950 border-red-500 text-red-300 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                ⚠ Offline
              </button>
              <button
                onClick={() => updateSettings({ simulatedConnection: 'reconnecting' })}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                  settings.simulatedConnection === 'reconnecting'
                    ? 'bg-amber-950 border-amber-500 text-amber-300 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                ↻ Reconnecting...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
