// =============================================
// PhuiConnect - Player Profile Screen
// =============================================
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS, POSITIONS, SKILL_LABELS } from '../../constants/theme';
import { Avatar, Badge, Card, SkillBar, Rating, Button, SectionHeader } from '../../components/ui';
import { MOCK_PLAYER, MOCK_TEAMS } from '../../data/mockData';

interface ProfileScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onLogout: () => void;
}

export default function ProfileScreen({ onNavigate, onLogout }: ProfileScreenProps) {
  const player = MOCK_PLAYER;
  const myTeams = MOCK_TEAMS.filter(t => player.teams.includes(t.id));

  const skillColors: Record<string, string> = {
    speed: '#3B82F6',
    passing: '#10B981',
    shooting: '#EF4444',
    dribbling: '#F59E0B',
    defending: '#8B5CF6',
    stamina: '#06B6D4',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Hồ sơ</Text>
          <TouchableOpacity>
            <Text style={styles.editBtn}>✏️ Sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileHeader}>
          <Avatar name={player.fullName} size={80} />
          <View style={styles.profileInfo}>
            <Text style={styles.playerName}>{player.fullName}</Text>
            <View style={styles.profileTags}>
              <Badge text={POSITIONS[player.preferredPosition]} color={COLORS.primary} />
              {player.secondaryPosition && (
                <Badge text={POSITIONS[player.secondaryPosition]} color={COLORS.accent} />
              )}
            </View>
            <Rating rating={player.rating} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{player.totalMatches}</Text>
            <Text style={styles.statLabel}>Trận</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{player.rating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{player.skillLevel}</Text>
            <Text style={styles.statLabel}>Skill</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{myTeams.length}</Text>
            <Text style={styles.statLabel}>Đội bóng</Text>
          </View>
        </View>

        {/* Bio */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Giới thiệu</Text>
          <Text style={styles.bioText}>{player.bio}</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Năm sinh</Text>
              <Text style={styles.infoValue}>{player.birthYear}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Chiều cao</Text>
              <Text style={styles.infoValue}>{player.height} cm</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Cân nặng</Text>
              <Text style={styles.infoValue}>{player.weight} kg</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Chân thuận</Text>
              <Text style={styles.infoValue}>{player.dominantFoot === 'right' ? 'Phải' : player.dominantFoot === 'left' ? 'Trái' : 'Cả hai'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Khu vực</Text>
              <Text style={styles.infoValue}>{player.district}, {player.city}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phong cách</Text>
              <Text style={styles.infoValue}>
                {player.playStyle === 'attacking' ? '⚡ Tấn công' : player.playStyle === 'defending' ? '🛡️ Phòng ngự' : '🎯 Kiến tạo'}
              </Text>
            </View>
          </View>
        </Card>

        {/* Skills */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Chỉ số kỹ năng</Text>
          {Object.entries(player.skills).map(([key, val]) => (
            <SkillBar
              key={key}
              label={SKILL_LABELS[key] || key}
              value={val}
              color={skillColors[key] || COLORS.primary}
            />
          ))}
        </Card>

        {/* Teams */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Đội bóng</Text>
          {myTeams.length > 0 ? (
            myTeams.map(team => (
              <TouchableOpacity
                key={team.id}
                style={styles.teamItem}
                onPress={() => onNavigate('TeamDetail', { teamId: team.id })}>
                <Avatar name={team.name} size={44} />
                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>{team.name}</Text>
                  <Text style={styles.teamMeta}>{team.district} · {team.memberCount} thành viên</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>Chưa tham gia đội nào</Text>
          )}
          <Button title="+ Tạo đội mới" onPress={() => onNavigate('CreateTeam')} variant="outline" size="sm" style={{ marginTop: SPACING.md }} />
        </Card>

        {/* Preferred Play Time */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Thời gian rảnh</Text>
          <View style={styles.timeSlots}>
            {(['morning', 'afternoon', 'evening', 'night'] as const).map(time => {
              const isActive = player.preferredPlayTime.includes(time);
              const labels: Record<string, string> = {
                morning: '🌅 Sáng',
                afternoon: '☀️ Chiều',
                evening: '🌆 Tối',
                night: '🌙 Đêm',
              };
              return (
                <View
                  key={time}
                  style={[styles.timeSlot, isActive && styles.timeSlotActive]}>
                  <Text style={[styles.timeSlotText, isActive && styles.timeSlotTextActive]}>
                    {labels[time]}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <Button title="Đăng xuất" onPress={onLogout} variant="outline" icon="🚪" />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'web' ? 20 : 56,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  editBtn: {
    fontSize: FONTS.sizes.md,
    color: '#D1FAE5',
    fontWeight: '600',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: SPACING.lg,
    flex: 1,
  },
  playerName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: 4,
  },
  profileTags: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  scroll: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.xl,
    marginTop: -16,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.md,
    marginBottom: SPACING.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 4,
  },
  section: {
    marginHorizontal: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  bioText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  infoItem: {
    width: '47%',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  infoLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  teamInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  teamName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  teamMeta: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.textLight,
  },
  emptyText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingVertical: SPACING.lg,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  timeSlot: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  timeSlotActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryBg,
  },
  timeSlotText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  timeSlotTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  logoutSection: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
});
