import type { Match } from '../types/scoreboard';

export const demoMatches: Match[] = [
  {
    id: 'demo_football_1',
    sport: 'football',
    teamA: 'Rising Lions',
    teamB: 'Blue Warriors',
    tournament: 'State College Championship',
    venue: 'Main Sports Complex',
    date: '31 Aug 2026',
    status: 'live',
    elapsedSeconds: 2538, // 42:18
    timerRunning: true,
    actionHistory: [
      { id: 'a1', timestamp: '15:10', team: 'A', description: 'Goal — Rising Lions', type: 'score' },
      { id: 'a2', timestamp: '15:24', team: 'B', description: 'Yellow Card — Blue Warriors', type: 'card' },
      { id: 'a3', timestamp: '15:35', team: 'B', description: 'Goal — Blue Warriors', type: 'score' },
      { id: 'a4', timestamp: '15:40', team: 'A', description: 'Goal — Rising Lions', type: 'score' }
    ],
    football: {
      teamAScore: 2,
      teamBScore: 1,
      teamAFouls: 3,
      teamBFouls: 5,
      teamAYellowCards: 0,
      teamBYellowCards: 1,
      teamARedCards: 0,
      teamBRedCards: 0,
      teamACorners: 4,
      teamBCorners: 2,
      period: '1st Half'
    },
    createdAt: '2026-08-31T15:00:00Z'
  },
  {
    id: 'demo_basketball_1',
    sport: 'basketball',
    teamA: 'Coimbatore Eagles',
    teamB: 'Salem Warriors',
    tournament: 'Inter-University Basketball Trophy',
    venue: 'Indoor Arena Court 1',
    date: '30 Aug 2026',
    status: 'live',
    elapsedSeconds: 1472, // 24:32
    timerRunning: true,
    actionHistory: [
      { id: 'b1', timestamp: '17:05', team: 'A', description: '+3 Points — Coimbatore Eagles', type: 'score' },
      { id: 'b2', timestamp: '17:12', team: 'B', description: '+2 Points — Salem Warriors', type: 'score' },
      { id: 'b3', timestamp: '17:18', team: 'B', description: 'Foul committed by Salem Warriors', type: 'foul' }
    ],
    basketball: {
      teamAScore: 56,
      teamBScore: 52,
      quarter: 'Q3',
      shotClock: 18,
      isShotClockRunning: true,
      teamAFouls: 3,
      teamBFouls: 4,
      teamATimeouts: 1,
      teamBTimeouts: 2
    },
    createdAt: '2026-08-30T17:00:00Z'
  },
  {
    id: 'demo_cricket_1',
    sport: 'cricket',
    teamA: 'Tamil Warriors',
    teamB: 'City Kings',
    tournament: 'Premier Academy Cup',
    venue: 'Greenfield Oval',
    date: '29 Aug 2026',
    status: 'live',
    elapsedSeconds: 5200,
    timerRunning: true,
    actionHistory: [
      { id: 'c1', timestamp: '11:20', team: 'A', description: '4 runs — Tamil Warriors', type: 'score' },
      { id: 'c2', timestamp: '11:22', team: 'B', description: 'Wicket! Batter Bowled', type: 'wicket' },
      { id: 'c3', timestamp: '11:25', team: 'A', description: '6 runs — Tamil Warriors', type: 'score' }
    ],
    cricket: {
      teamAScore: 145,
      teamAWickets: 4,
      teamAOvers: 23.2,
      teamABalls: 140,
      teamBScore: 200,
      teamBWickets: 8,
      teamBOvers: 50.0,
      teamBBalls: 300,
      currentInnings: 2,
      battingTeam: 'A',
      currentOverBalls: ['1', '4', '0', '1', '6', '0'],
      extras: { wides: 5, noBalls: 2, byes: 1, legByes: 3 },
      target: 201,
      maxOvers: 50,
      currentBatter: 'R. Sharma (54*)',
      currentBowler: 'K. Patel (2/38)'
    },
    createdAt: '2026-08-29T10:00:00Z'
  },
  {
    id: 'demo_volleyball_1',
    sport: 'volleyball',
    teamA: 'Thunder Spikers',
    teamB: 'Blue Stars',
    tournament: 'Regional Volleyball League',
    venue: 'Central Gymnasium',
    date: '28 Aug 2026',
    status: 'live',
    elapsedSeconds: 2100,
    timerRunning: true,
    actionHistory: [
      { id: 'v1', timestamp: '16:10', team: 'A', description: 'Point — Thunder Spikers', type: 'score' },
      { id: 'v2', timestamp: '16:15', team: 'B', description: 'Point — Blue Stars', type: 'score' }
    ],
    volleyball: {
      teamAScore: 21,
      teamBScore: 18,
      currentSet: 3,
      setsWonA: 2,
      setsWonB: 0,
      teamATimeouts: 1,
      teamBTimeouts: 2,
      setHistory: [
        { setNumber: 1, teamA: 25, teamB: 22 },
        { setNumber: 2, teamA: 25, teamB: 19 }
      ]
    },
    createdAt: '2026-08-28T16:00:00Z'
  },
  {
    id: 'demo_handball_1',
    sport: 'handball',
    teamA: 'Red Hawks',
    teamB: 'Black Panthers',
    tournament: 'National Youth Handball Championship',
    venue: 'Indoor Sports Arena',
    date: '27 Aug 2026',
    status: 'live',
    elapsedSeconds: 1112, // 18:32
    timerRunning: true,
    actionHistory: [
      { id: 'h1', timestamp: '18:10', team: 'A', description: 'Goal — Red Hawks', type: 'score' },
      { id: 'h2', timestamp: '18:14', team: 'B', description: '2-Min Suspension — Black Panthers', type: 'card' }
    ],
    handball: {
      teamAScore: 24,
      teamBScore: 21,
      teamAFouls: 6,
      teamBFouls: 9,
      suspensionsA: 1,
      suspensionsB: 2,
      penaltiesA: 3,
      penaltiesB: 2,
      yellowCardsA: 1,
      yellowCardsB: 2,
      redCardsA: 0,
      redCardsB: 0,
      period: '2nd Half'
    },
    createdAt: '2026-08-27T18:00:00Z'
  }
];

export const demoHistoryMatches: Match[] = [
  {
    id: 'hist_1',
    sport: 'football',
    teamA: 'Lions FC',
    teamB: 'Tigers United',
    tournament: 'City Summer Cup',
    venue: 'City Stadium',
    date: '31 Aug 2026',
    status: 'completed',
    winner: 'Lions FC',
    elapsedSeconds: 5400,
    timerRunning: false,
    actionHistory: [],
    football: {
      teamAScore: 3,
      teamBScore: 2,
      teamAFouls: 7,
      teamBFouls: 10,
      teamAYellowCards: 1,
      teamBYellowCards: 2,
      teamARedCards: 0,
      teamBRedCards: 0,
      teamACorners: 6,
      teamBCorners: 4,
      period: '2nd Half'
    },
    createdAt: '2026-08-31T14:00:00Z'
  },
  {
    id: 'hist_2',
    sport: 'basketball',
    teamA: 'Eagles',
    teamB: 'Warriors',
    tournament: 'District Tournament',
    venue: 'Youth Center Court',
    date: '30 Aug 2026',
    status: 'completed',
    winner: 'Eagles',
    elapsedSeconds: 2400,
    timerRunning: false,
    actionHistory: [],
    basketball: {
      teamAScore: 78,
      teamBScore: 74,
      quarter: 'Q4',
      shotClock: 0,
      isShotClockRunning: false,
      teamAFouls: 4,
      teamBFouls: 3,
      teamATimeouts: 0,
      teamBTimeouts: 1
    },
    createdAt: '2026-08-30T16:00:00Z'
  },
  {
    id: 'hist_3',
    sport: 'cricket',
    teamA: 'Southern Strikers',
    teamB: 'Northern Rangers',
    tournament: 'Regional T20 Trophy',
    venue: 'County Cricket Ground',
    date: '25 Aug 2026',
    status: 'completed',
    winner: 'Southern Strikers',
    elapsedSeconds: 9600,
    timerRunning: false,
    actionHistory: [],
    cricket: {
      teamAScore: 182,
      teamAWickets: 5,
      teamAOvers: 20,
      teamABalls: 120,
      teamBScore: 176,
      teamBWickets: 9,
      teamBOvers: 20,
      teamBBalls: 120,
      currentInnings: 2,
      battingTeam: 'B',
      currentOverBalls: [],
      extras: { wides: 4, noBalls: 1, byes: 2, legByes: 2 },
      target: 183,
      maxOvers: 20
    },
    createdAt: '2026-08-25T14:00:00Z'
  }
];
