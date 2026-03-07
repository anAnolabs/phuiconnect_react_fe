// =============================================
// PhuiConnect - Type Definitions
// =============================================

// ---- User & Auth ----
export type UserRole = 'player' | 'team_owner' | 'organizer' | 'admin';
export type LoginMethod = 'phone_otp' | 'google' | 'apple' | 'facebook';

export interface User {
  id: string;
  phone: string;
  email: string;
  name: string;
  avatar: string;
  location: string;
  role: UserRole;
  createdAt: string;
}

// ---- Player Profile ----
export type Position =
  | 'GK' | 'CB' | 'LB' | 'RB'
  | 'DM' | 'CM' | 'AM'
  | 'LW' | 'RW' | 'ST';

export type DominantFoot = 'left' | 'right' | 'both';
export type PlayStyle = 'attacking' | 'defending' | 'playmaker';
export type PlayTime = 'morning' | 'afternoon' | 'evening' | 'night';

export interface SkillRatings {
  speed: number;
  passing: number;
  shooting: number;
  dribbling: number;
  defending: number;
  stamina: number;
}

export interface PlayerProfile {
  userId: string;
  fullName: string;
  birthYear: number;
  height: number;
  weight: number;
  preferredPosition: Position;
  secondaryPosition: Position | null;
  dominantFoot: DominantFoot;
  skillLevel: number; // 1-100
  playStyle: PlayStyle;
  city: string;
  district: string;
  preferredPlayTime: PlayTime[];
  bio: string;
  rating: number;
  totalMatches: number;
  skills: SkillRatings;
  avatar: string;
  teams: string[];
}

// ---- Team ----
export type TeamRole = 'owner' | 'captain' | 'member';
export type TeamMemberStatus = 'active' | 'pending' | 'inactive';
export type MatchFormat = '5v5' | '7v7' | '11v11';

export interface Team {
  id: string;
  name: string;
  logo: string;
  city: string;
  district: string;
  level: number; // 1-100
  ownerId: string;
  homeStadium: string;
  memberCount: number;
  createdAt: string;
}

export interface TeamMember {
  teamId: string;
  userId: string;
  role: TeamRole;
  position: Position;
  status: TeamMemberStatus;
  playerName: string;
  avatar: string;
}

export type TeamTask = 'collect_money' | 'bring_ball' | 'book_stadium' | 'bring_jersey';

// ---- Match ----
export type MatchStatus = 'OPEN' | 'CONFIRMED' | 'FINISHED' | 'CANCELLED';

export interface Match {
  id: string;
  hostTeamId: string;
  hostTeamName: string;
  hostTeamLogo: string;
  opponentTeamId: string | null;
  opponentTeamName: string | null;
  stadiumId: string;
  stadiumName: string;
  dateTime: string;
  format: MatchFormat;
  skillLevel: number;
  status: MatchStatus;
  note: string;
  score?: { home: number; away: number };
}

// ---- Find Player / Join Game ----
export type FindType = 'need_players' | 'looking_for_match';

export interface FindPlayerPost {
  id: string;
  type: FindType;
  teamId?: string;
  teamName?: string;
  teamLogo?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  date: string;
  time: string;
  location: string;
  district: string;
  city: string;
  stadiumName?: string;
  position: Position[];
  skillLevel: number;
  format: MatchFormat;
  fee: number;
  note: string;
  spotsLeft?: number;
  createdAt: string;
}

// ---- Stadium ----
export interface Stadium {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  lat: number;
  lng: number;
  price: number;
  phone: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  formats: MatchFormat[];
}

// ---- Tournament ----
export type TournamentFormat = 'knockout' | 'round_robin' | 'group_stage';
export type TournamentStatus = 'upcoming' | 'ongoing' | 'finished';

export interface Tournament {
  id: string;
  name: string;
  organizerId: string;
  location: string;
  startDate: string;
  endDate: string;
  format: TournamentFormat;
  teamsLimit: number;
  teamsRegistered: number;
  entryFee: number;
  status: TournamentStatus;
  imageUrl: string;
}

// ---- Navigation ----
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  PlayerProfile: { userId: string };
  EditProfile: undefined;
  TeamDetail: { teamId: string };
  CreateTeam: undefined;
  MatchDetail: { matchId: string };
  CreateMatch: undefined;
  StadiumDetail: { stadiumId: string };
  FindPlayerDetail: { postId: string };
  CreateFindPost: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  FindMatch: undefined;
  FindPlayer: undefined;
  Teams: undefined;
  Profile: undefined;
};
