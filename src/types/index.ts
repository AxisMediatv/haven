// User and Authentication Types
export interface User {
  id: string;
  email: string;
  username?: string;
  subscription?: Subscription;
  preferences?: UserPreferences;
  createdAt: string;
  lastActive: string;
}

export interface Subscription {
  id: string;
  plan: 'starter' | 'regular' | 'family';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  companionStyle: 'motherly' | 'fatherly' | 'faith-centered' | 'best-friend' | 'wise-mentor' | 'solution-coach' | 'calm-centering' | 'balanced-mix';
  qualities: string[];
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  reminders: boolean;
  weeklyReports: boolean;
}

// Badge and Achievement Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  target: number;
  progress: number;
  earned: boolean;
  premium: boolean;
  earnedDate?: string;
}

export type BadgeCategory = 
  | 'STARTER BADGES'
  | 'CONSISTENCY BADGES'
  | 'CONVERSATION MILESTONES'
  | 'EMOTIONAL GROWTH BADGES'
  | 'LIFE SKILLS BADGES'
  | 'WELLNESS BADGES'
  | 'DAILY HABIT BADGES'
  | 'WEEKLY CHALLENGE BADGES'
  | 'MONTHLY GOAL BADGES'
  | 'STREAK MULTIPLIER BADGES'
  | 'SOCIAL SHARING BADGES'
  | 'ADVANCED TRACKING BADGES'
  | 'SEASONAL CHALLENGE BADGES';

export type BadgeRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

// Conversation and Journal Types
export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  topic?: string;
  mood?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  sentiment?: 'positive' | 'negative' | 'neutral';
  keywords?: string[];
  crisisFlag?: boolean;
}

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  mood: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Progress and Analytics Types
export interface UserProgress {
  userId: string;
  currentStreak: number;
  totalConversations: number;
  totalJournalEntries: number;
  badgesEarned: number;
  weeklyGoals: WeeklyGoal[];
  monthlyGoals: MonthlyGoal[];
}

export interface WeeklyGoal {
  id: string;
  type: 'conversations' | 'journal' | 'activities' | 'comfort-zone';
  target: number;
  current: number;
  weekStart: string;
  completed: boolean;
}

export interface MonthlyGoal {
  id: string;
  type: 'daily_activity' | 'gratitude_journal' | 'conversations' | 'boundary_practice' | 'wellness_activity';
  target: number;
  current: number;
  month: string;
  completed: boolean;
}

// Onboarding Types
export interface OnboardingData {
  userId: string;
  companionStyle: UserPreferences['companionStyle'];
  qualities: string[];
  focusAreas: string[];
  completedAt: string;
  onboardingComplete: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Navigation Types
export interface NavigationItem {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
}
