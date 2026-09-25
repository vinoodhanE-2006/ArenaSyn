import React, { useState } from 'react';
import { useMatch } from '../context/MatchContext';
import type { SportType } from '../types/scoreboard';
import { Search, Filter, Trophy, Calendar, Trash2 } from 'lucide-react';

export const MatchHistory: React.FC = () => {
  const { matchHistory, deleteMatchFromHistory, setActiveTab } = useMatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('all');

  const filteredMatches = matchHistory.filter((m) => {
    const matchesSearch =
      m.teamA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.teamB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.tournament && m.tournament.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSport = selectedSport === 'all' || m.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const getSportIcon = (sport: SportType) => {
    switch (sport) {
      case 'cricket': return '🏏';
      case 'football': return '⚽';
      case 'basketball': return '🏀';
      case 'volleyball': return '🏐';
      case 'handball': return '🤾';
    }
  };

  const getScoreSummary = (m: (typeof matchHistory)[0]) => {
    if (m.football) return `${m.football.teamAScore} - ${m.football.teamBScore}`;
    if (m.basketball) return `${m.basketball.teamAScore} - ${m.basketball.teamBScore}`;
    if (m.volleyball) return `${m.volleyball.teamAScore} - ${m.volleyball.teamBScore} (Sets ${m.volleyball.setsWonA}-${m.volleyball.setsWonB})`;
    if (m.handball) return `${m.handball.teamAScore} - ${m.handball.teamBScore}`;
    if (m.cricket) return `${m.cricket.teamAScore}/${m.cricket.teamAWickets} vs ${m.cricket.teamBScore}/${m.cricket.teamBWickets}`;
    return '0 - 0';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Match History</h1>
          <p className="text-slate-400 text-sm mt-1">Review past scores, statistics, and tournament results.</p>
        </div>

        <button
          onClick={() => setActiveTab('create')}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg self-start sm:self-auto"
        >
          + New Match
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search teams or tournaments..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <Filter className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-blue-500 capitalize"
          >
            <option value="all">All Sports</option>
            <option value="cricket">🏏 Cricket</option>
            <option value="football">⚽ Football</option>
            <option value="basketball">🏀 Basketball</option>
            <option value="volleyball">🏐 Volleyball</option>
            <option value="handball">🤾 Handball</option>
          </select>
        </div>
      </div>

      {/* Match Cards List */}
      <div className="space-y-3">
        {filteredMatches.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-2">
            <p className="text-base font-semibold">No matches found in history</p>
            <p className="text-xs text-slate-500">Try adjusting your search query or sport filter.</p>
          </div>
        ) : (
          filteredMatches.map((m) => (
            <div
              key={m.id}
              className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shrink-0">
                  {getSportIcon(m.sport)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-100 text-base">
                      {m.teamA} vs {m.teamB}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      m.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-red-950 text-red-300 border border-red-500/40'
                    }`}>
                      {m.status}
                    </span>
                  </div>

                  <p className="text-xl font-black font-mono text-emerald-400">
                    {getScoreSummary(m)}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {m.date}
                    </span>
                    {m.winner && (
                      <span className="flex items-center gap-1 text-amber-300 font-semibold">
                        <Trophy className="w-3 h-3 text-amber-400" />
                        Winner: {m.winner}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => deleteMatchFromHistory(m.id)}
                  title="Delete match"
                  className="p-2.5 bg-slate-950 hover:bg-red-950 text-slate-500 hover:text-red-400 rounded-xl border border-slate-800 hover:border-red-500/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
