// =============================================
// PhuiConnect - Shared UI Components
// =============================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

// ---- Avatar ----
interface AvatarProps {
  name: string;
  size?: number;
  color?: string;
}

export function Avatar({ name, size = 48, color }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  const bgColor = color || getColorForName(name);

  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

function getColorForName(name: string): string {
  const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// ---- Button ----
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = 'primary', size = 'md', icon, disabled, style }: ButtonProps) {
  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: 13 },
    md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: 15 },
    lg: { paddingVertical: 16, paddingHorizontal: 28, fontSize: 17 },
  };

  const variantStyles: Record<string, { bg: string; text: string; border?: string }> = {
    primary: { bg: COLORS.primary, text: COLORS.textWhite },
    secondary: { bg: COLORS.secondary, text: COLORS.textWhite },
    outline: { bg: 'transparent', text: COLORS.primary, border: COLORS.primary },
    ghost: { bg: 'transparent', text: COLORS.primary },
  };

  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? COLORS.textLight : v.bg,
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          borderWidth: v.border ? 1.5 : 0,
          borderColor: v.border || 'transparent',
        },
        style,
      ]}>
      {icon ? <Text style={{ marginRight: 6, fontSize: s.fontSize }}>{icon}</Text> : null}
      <Text style={[styles.buttonText, { color: v.text, fontSize: s.fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

// ---- Badge ----
interface BadgeProps {
  text: string;
  color?: string;
  bgColor?: string;
}

export function Badge({ text, color = COLORS.primary, bgColor }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: bgColor || color + '18' }]}>
      <Text style={[styles.badgeText, { color }]}>{text}</Text>
    </View>
  );
}

// ---- Card ----
interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ children, onPress, style }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

// ---- Input ----
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
  multiline?: boolean;
  style?: ViewStyle;
}

export function Input({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, multiline, style }: InputProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
      <TextInput
        style={[styles.input, multiline && { minHeight: 80, textAlignVertical: 'top' }]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

// ---- Skill Bar ----
interface SkillBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export function SkillBar({ label, value, maxValue = 100, color = COLORS.primary }: SkillBarProps) {
  const pct = Math.min((value / maxValue) * 100, 100);
  return (
    <View style={styles.skillBarContainer}>
      <View style={styles.skillBarHeader}>
        <Text style={styles.skillBarLabel}>{label}</Text>
        <Text style={[styles.skillBarValue, { color }]}>{value}</Text>
      </View>
      <View style={styles.skillBarBg}>
        <View style={[styles.skillBarFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

// ---- Rating Stars ----
interface RatingProps {
  rating: number;
  size?: number;
}

export function Rating({ rating, size = 16 }: RatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push('⭐');
    } else if (i - 0.5 <= rating) {
      stars.push('⭐');
    } else {
      stars.push('☆');
    }
  }
  return (
    <View style={styles.ratingContainer}>
      <Text style={{ fontSize: size - 2 }}>{stars.join('')}</Text>
      <Text style={[styles.ratingText, { fontSize: size - 2 }]}>{rating.toFixed(1)}</Text>
    </View>
  );
}

// ---- Section Header ----
interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionText, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionText ? (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.sectionAction}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// ---- Status Badge ----
interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config: Record<string, { color: string; label: string }> = {
    OPEN: { color: COLORS.matchOpen, label: '🟢 Đang tìm' },
    CONFIRMED: { color: COLORS.matchConfirmed, label: '🔵 Đã xác nhận' },
    FINISHED: { color: COLORS.matchFinished, label: '⚫ Đã kết thúc' },
    CANCELLED: { color: COLORS.matchCancelled, label: '🔴 Đã hủy' },
  };
  const c = config[status] || config.OPEN;
  return <Badge text={c.label} color={c.color} />;
}

// ---- Empty State ----
interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle ? <Text style={styles.emptySubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
  },
  buttonText: {
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skillBarContainer: {
    marginBottom: SPACING.sm,
  },
  skillBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skillBarLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  skillBarValue: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  skillBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginLeft: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sectionAction: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.xxxl,
  },
});
