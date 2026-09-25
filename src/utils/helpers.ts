import type { Match, SportType } from '../types/scoreboard';

export const formatTimer = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
};

export const ballsToOversString = (totalBalls: number): string => {
  const overs = Math.floor(totalBalls / 6);
  const remainingBalls = totalBalls % 6;
  return `${overs}.${remainingBalls}`;
};

export const createInitialMatch = (
  sport: SportType,
  teamA: string,
  teamB: string,
  tournament?: string,
  venue?: string
): Match => {
  const id = 'match_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const baseMatch: Match = {
    id,
    sport,
    teamA: teamA.trim() || 'Team A',
    teamB: teamB.trim() || 'Team B',
    tournament: tournament?.trim() || undefined,
    venue: venue?.trim() || undefined,
    date: dateStr,
    status: 'live',
    elapsedSeconds: 0,
    timerRunning: true,
    actionHistory: [
      {
        id: 'act_' + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: 'Match started',
        type: 'other'
      }
    ],
    createdAt: new Date().toISOString()
  };

  switch (sport) {
    case 'cricket':
      baseMatch.cricket = {
        teamAScore: 0,
        teamAWickets: 0,
        teamAOvers: 0,
        teamABalls: 0,
        teamBScore: 0,
        teamBWickets: 0,
        teamBOvers: 0,
        teamBBalls: 0,
        currentInnings: 1,
        battingTeam: 'A',
        currentOverBalls: [],
        extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0 },
        target: null,
        maxOvers: 20
      };
      break;
    case 'football':
      baseMatch.football = {
        teamAScore: 0,
        teamBScore: 0,
        teamAFouls: 0,
        teamBFouls: 0,
        teamAYellowCards: 0,
        teamBYellowCards: 0,
        teamARedCards: 0,
        teamBRedCards: 0,
        teamACorners: 0,
        teamBCorners: 0,
        period: '1st Half'
      };
      break;
    case 'basketball':
      baseMatch.basketball = {
        teamAScore: 0,
        teamBScore: 0,
        quarter: 'Q1',
        shotClock: 24,
        isShotClockRunning: false,
        teamAFouls: 0,
        teamBFouls: 0,
        teamATimeouts: 3,
        teamBTimeouts: 3
      };
      break;
    case 'volleyball':
      baseMatch.volleyball = {
        teamAScore: 0,
        teamBScore: 0,
        currentSet: 1,
        setsWonA: 0,
        setsWonB: 0,
        teamATimeouts: 2,
        teamBTimeouts: 2,
        setHistory: []
      };
      break;
    case 'handball':
      baseMatch.handball = {
        teamAScore: 0,
        teamBScore: 0,
        teamAFouls: 0,
        teamBFouls: 0,
        suspensionsA: 0,
        suspensionsB: 0,
        penaltiesA: 0,
        penaltiesB: 0,
        yellowCardsA: 0,
        yellowCardsB: 0,
        redCardsA: 0,
        redCardsB: 0,
        period: '1st Half'
      };
      break;
  }

  return baseMatch;
};
