// =============================================
// PhuiConnect - Theme & Constants
// =============================================

export const COLORS = {
  // Primary
  primary: '#10B981',       // Green - football field
  primaryDark: '#059669',
  primaryLight: '#34D399',
  primaryBg: '#ECFDF5',

  // Secondary
  secondary: '#F59E0B',     // Amber - football
  secondaryDark: '#D97706',

  // Accent
  accent: '#3B82F6',        // Blue
  accentDark: '#2563EB',

  // Neutral
  white: '#FFFFFF',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  divider: '#F1F5F9',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  textWhite: '#FFFFFF',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Match Status
  matchOpen: '#10B981',
  matchConfirmed: '#3B82F6',
  matchFinished: '#64748B',
  matchCancelled: '#EF4444',

  // Dark mode
  darkBg: '#0F172A',
  darkSurface: '#1E293B',
  darkBorder: '#334155',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 28,
    hero: 36,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const POSITIONS: Record<string, string> = {
  GK: 'Thủ môn',
  CB: 'Trung vệ',
  LB: 'Hậu vệ trái',
  RB: 'Hậu vệ phải',
  DM: 'Tiền vệ phòng ngự',
  CM: 'Tiền vệ trung tâm',
  AM: 'Tiền vệ tấn công',
  LW: 'Tiền đạo cánh trái',
  RW: 'Tiền đạo cánh phải',
  ST: 'Tiền đạo',
};

export const SKILL_LABELS: Record<string, string> = {
  speed: 'Tốc độ',
  passing: 'Chuyền bóng',
  shooting: 'Sút',
  dribbling: 'Rê bóng',
  defending: 'Phòng ngự',
  stamina: 'Thể lực',
};

export const PLAY_TIMES: Record<string, string> = {
  morning: 'Sáng (6-11h)',
  afternoon: 'Chiều (13-17h)',
  evening: 'Tối (17-21h)',
  night: 'Đêm (21-24h)',
};

export const MATCH_FORMATS = ['5v5', '7v7', '11v11'] as const;
