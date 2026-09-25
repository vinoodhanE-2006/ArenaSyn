export type SportType = 'cricket' | 'football' | 'basketball' | 'volleyball' | 'handball';

export type MatchStatus = 'not_started' | 'live' | 'paused' | 'completed';

export interface ActionLog {
  id: string;
  timestamp: string;
  team?: 'A' | 'B';
  description: string;
  detail?: string;
  type: 'score' | 'foul' | 'card' | 'extra' | 'wicket' | 'period' | 'timeout' | 'other';
}

export interface CricketScore {
  teamAScore: number;
  teamAWickets: number;
  teamAOvers: number;
  teamABalls: number;
  teamBScore: number;
  teamBWickets: number;
  teamBOvers: number;
  teamBBalls: number;
  currentInnings: 1 | 2;
  battingTeam: 'A' | 'B';
  currentOverBalls: string[];
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
  };
  target: number | null;
  maxOvers: number;
  currentBatter?: string;
  currentBowler?: string;
}

export interface FootballScore {
  teamAScore: number;
  teamBScore: number;
  teamAFouls: number;
  teamBFouls: number;
  teamAYellowCards: number;
  teamBYellowCards: number;
  teamARedCards: number;
  teamBRedCards: number;
  teamACorners: number;
  teamBCorners: number;
  period: '1st Half' | '2nd Half' | 'Extra Time' | 'Penalty Shootout';
}

export interface BasketballScore {
  teamAScore: number;
  teamBScore: number;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'OT';
  shotClock: number;
  isShotClockRunning: boolean;
  teamAFouls: number;
  teamBFouls: number;
  teamATimeouts: number;
  teamBTimeouts: number;
}

export interface VolleyballScore {
  teamAScore: number;
  teamBScore: number;
  currentSet: number;
  setsWonA: number;
  setsWonB: number;
  teamATimeouts: number;
  teamBTimeouts: number;
  setHistory: Array<{ setNumber: number; teamA: number; teamB: number }>;
}

export interface HandballScore {
  teamAScore: number;
  teamBScore: number;
  teamAFouls: number;
  teamBFouls: number;
  suspensionsA: number;
  suspensionsB: number;
  penaltiesA: number;
  penaltiesB: number;
  yellowCardsA: number;
  yellowCardsB: number;
  redCardsA: number;
  redCardsB: number;
  period: '1st Half' | '2nd Half';
}

export interface Match {
  id: string;
  sport: SportType;
  teamA: string;
  teamB: string;
  tournament?: string;
  venue?: string;
  date: string;
  status: MatchStatus;
  elapsedSeconds: number;
  timerRunning: boolean;
  actionHistory: ActionLog[];
  cricket?: CricketScore;
  football?: FootballScore;
  basketball?: BasketballScore;
  volleyball?: VolleyballScore;
  handball?: HandballScore;
  winner?: string | null;
  createdAt: string;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  confirmEndMatch: boolean;
  confirmReset: boolean;
  fontScale: 'normal' | 'large' | 'huge';
  simulatedConnection: 'online' | 'offline' | 'reconnecting';
}
