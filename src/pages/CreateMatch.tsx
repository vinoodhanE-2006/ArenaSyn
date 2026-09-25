import React, { useState } from 'react';
import type { SportType } from '../types/scoreboard';
import { useMatch } from '../context/MatchContext';
import { CheckCircle2, Trophy, MapPin, Calendar, Users } from 'lucide-react';

export const CreateMatch: React.FC = () => {
  const { createMatch } = useMatch();
  const [selectedSport, setSelectedSport] = useState<SportType>('football');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [tournament, setTournament] = useState('');
  const [venue, setVenue] = useState('');

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const sports: Array<{ id: SportType; icon: string; name: string; desc: string }> = [
    { id: 'cricket', icon: '🏏', name: 'Cricket', desc: 'Runs, wickets & overs' },
    { id: 'football', icon: '⚽', name: 'Football', desc: 'Goals, fouls & cards' },
    { id: 'basketball', icon: '🏀', name: 'Basketball', desc: 'Points, quarters & shot clock' },
    { id: 'volleyball', icon: '🏐', name: 'Volleyball', desc: 'Sets won & rally points' },
    { id: 'handball', icon: '🤾', name: 'Handball', desc: 'Goals, 7m & 2-min suspensions' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalA = teamA.trim() || 'Team A';
    const finalB = teamB.trim() || 'Team B';
    createMatch(selectedSport, finalA, finalB, tournament, venue);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">Create New Match</h1>
        <p className="text-slate-400 text-sm mt-1">Select a sport and configure team details to launch referee scoring controls.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Select Sport */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-200 uppercase tracking-wider text-xs font-mono">1. Select Sport</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {sports.map((s) => {
              const isSelected = selectedSport === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSport(s.id)}
                  className={`relative p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2 active:scale-95 ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50 text-white shadow-lg shadow-blue-950/40'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-4xl my-1">{s.icon}</span>
                  <span className="font-bold text-sm text-slate-100">{s.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Match Details */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-slate-200 uppercase tracking-wider text-xs font-mono">2. Match Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Team / Player 1 *
              </label>
              <input
                type="text"
                value={teamA}
                onChange={(e) => setTeamA(e.target.value)}
                placeholder="e.g. Lions FC or Player 1"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 font-semibold focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                Team / Player 2 *
              </label>
              <input
                type="text"
                value={teamB}
                onChange={(e) => setTeamB(e.target.value)}
                placeholder="e.g. Tigers FC or Player 2"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Tournament (Optional)
              </label>
              <input
                type="text"
                value={tournament}
                onChange={(e) => setTournament(e.target.value)}
                placeholder="e.g. Annual College Championship"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                Venue (Optional)
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Main Ground Court 1"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-400 font-medium border-t border-slate-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              Date: <strong className="text-slate-200">{currentDate}</strong>
            </span>
            <span>Status: <strong className="text-emerald-400">Ready to Launch</strong></span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-blue-950/60 active:scale-98 transition-all"
        >
          Create Match & Open Referee Controls
        </button>
      </form>
    </div>
  );
};
