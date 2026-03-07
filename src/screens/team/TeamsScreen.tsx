// =============================================
// PhuiConnect - Team Management Screen
// =============================================
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS, POSITIONS } from '../../constants/theme';
import { Avatar, Badge, Card, Button, SectionHeader, EmptyState } from '../../components/ui';
import { MOCK_TEAMS, MOCK_PLAYERS } from '../../data/mockData';
import { TeamMember, MatchFormat } from '../../types';

interface TeamsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function TeamsScreen({ onNavigate }: TeamsScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'my' | 'discover'>('my');
  const myTeams = MOCK_TEAMS.filter(t => t.ownerId === 'u1' || t.id === 't1');
  const allTeams = MOCK_TEAMS;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👥 Đội bóng</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => onNavigate('CreateTeam')}>
          <Text style={styles.createBtnText}>+ Tạo đội</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['my', 'discover'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.tabActive]}
            onPress={() => setSelectedTab(tab)}>
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
              {tab === 'my' ? 'Đội của tôi' : 'Khám phá'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {selectedTab === 'my' ? (
          myTeams.length > 0 ? (
            myTeams.map(team => (
              <TeamCard key={team.id} team={team} onPress={() => onNavigate('TeamDetail', { teamId: team.id })} />
            ))
          ) : (
            <EmptyState
              icon="👥"
              title="Chưa có đội bóng"
              subtitle="Tạo đội mới hoặc tìm đội để tham gia"
            />
          )
        ) : (
          allTeams.map(team => (
            <TeamCard key={team.id} team={team} onPress={() => onNavigate('TeamDetail', { teamId: team.id })} />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

function TeamCard({ team, onPress }: { team: typeof MOCK_TEAMS[0]; onPress: () => void }) {
  return (
    <Card onPress={onPress} style={styles.teamCard}>
      <View style={styles.teamHeader}>
        <Avatar name={team.name} size={52} />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamMeta}>📍 {team.district}, {team.city}</Text>
          <Text style={styles.teamMeta}>🏟️ {team.homeStadium}</Text>
        </View>
      </View>
      <View style={styles.teamStats}>
        <View style={styles.teamStat}>
          <Text style={styles.teamStatValue}>{team.memberCount}</Text>
          <Text style={styles.teamStatLabel}>Thành viên</Text>
        </View>
        <View style={styles.teamStat}>
          <Text style={styles.teamStatValue}>{team.level}</Text>
          <Text style={styles.teamStatLabel}>Level</Text>
        </View>
        <View style={styles.teamStat}>
          <Badge text={team.ownerId === 'u1' ? 'Chủ đội' : 'Tham gia'} color={team.ownerId === 'u1' ? COLORS.primary : COLORS.accent} />
        </View>
      </View>
    </Card>
  );
}

// =============================================
// Team Detail Screen
// =============================================
interface TeamDetailScreenProps {
  teamId: string;
  onBack: () => void;
  onNavigate: (screen: string, params?: any) => void;
}

export function TeamDetailScreen({ teamId, onBack, onNavigate }: TeamDetailScreenProps) {
  const team = MOCK_TEAMS.find(t => t.id === teamId) || MOCK_TEAMS[0];
  const isOwner = team.ownerId === 'u1';
  const [selectedFormation, setSelectedFormation] = useState<MatchFormat>('7v7');

  // Mock members
  const members: TeamMember[] = MOCK_PLAYERS.slice(0, 4).map((p, i) => ({
    teamId: team.id,
    userId: p.userId,
    role: i === 0 ? 'owner' : i === 1 ? 'captain' : 'member',
    position: p.preferredPosition,
    status: 'active',
    playerName: p.fullName,
    avatar: '',
  }));

  const tasks = [
    { key: 'collect_money', icon: '💰', label: 'Thu tiền', assigned: 'Hoàng Sơn' },
    { key: 'bring_ball', icon: '⚽', label: 'Mang bóng', assigned: 'Minh Tuấn' },
    { key: 'book_stadium', icon: '🏟️', label: 'Đặt sân', assigned: 'Hoàng Sơn' },
    { key: 'bring_jersey', icon: '👕', label: 'Mang áo', assigned: 'Văn Khang' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Quay lại</Text>
        </TouchableOpacity>
        {isOwner && (
          <TouchableOpacity>
            <Text style={styles.editText}>⚙️ Quản lý</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Team Hero */}
        <View style={styles.teamHero}>
          <Avatar name={team.name} size={72} />
          <Text style={styles.heroName}>{team.name}</Text>
          <View style={styles.heroTags}>
            <Badge text={`📍 ${team.district}`} color={COLORS.textSecondary} />
            <Badge text={`Level ${team.level}`} color={COLORS.secondary} />
          </View>
          <Text style={styles.heroStadium}>🏟️ Sân nhà: {team.homeStadium}</Text>
        </View>

        {/* Stats */}
        <View style={styles.detailStats}>
          <View style={styles.detailStat}>
            <Text style={styles.detailStatValue}>{team.memberCount}</Text>
            <Text style={styles.detailStatLabel}>Thành viên</Text>
          </View>
          <View style={styles.detailStat}>
            <Text style={styles.detailStatValue}>12</Text>
            <Text style={styles.detailStatLabel}>Trận đấu</Text>
          </View>
          <View style={styles.detailStat}>
            <Text style={styles.detailStatValue}>8W - 2D - 2L</Text>
            <Text style={styles.detailStatLabel}>Thành tích</Text>
          </View>
        </View>

        {/* Formation Selector */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>⚽ Đội hình</Text>
          <View style={styles.formationPicker}>
            {(['5v5', '7v7', '11v11'] as MatchFormat[]).map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.formationBtn, selectedFormation === f && styles.formationBtnActive]}
                onPress={() => setSelectedFormation(f)}>
                <Text style={[styles.formationBtnText, selectedFormation === f && styles.formationBtnTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Simple formation display */}
          <View style={styles.pitch}>
            <View style={styles.pitchBg}>
              <Text style={styles.pitchLabel}>Sơ đồ {selectedFormation}</Text>
              <View style={styles.pitchPlayers}>
                {members.slice(0, parseInt(selectedFormation)).map((m, i) => (
                  <View key={m.userId} style={styles.pitchPlayer}>
                    <Avatar name={m.playerName} size={32} />
                    <Text style={styles.pitchPlayerName}>{m.playerName.split(' ').pop()}</Text>
                    <Badge text={m.position} color={COLORS.primary} />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Card>

        {/* Members */}
        <Card style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>👥 Thành viên</Text>
            {isOwner && <Button title="+ Thêm" onPress={() => {}} variant="ghost" size="sm" />}
          </View>
          {members.map(member => (
            <View key={member.userId} style={styles.memberItem}>
              <Avatar name={member.playerName} size={40} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.playerName}</Text>
                <Text style={styles.memberRole}>
                  {member.role === 'owner' ? '👑 Chủ đội' : member.role === 'captain' ? '©️ Đội trưởng' : '⚽ Thành viên'}
                  {' · '}{POSITIONS[member.position]}
                </Text>
              </View>
              <Badge text={member.position} color={COLORS.accent} />
            </View>
          ))}
        </Card>

        {/* Tasks */}
        {isOwner && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Phân công</Text>
            {tasks.map(task => (
              <View key={task.key} style={styles.taskItem}>
                <Text style={styles.taskIcon}>{task.icon}</Text>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskLabel}>{task.label}</Text>
                  <Text style={styles.taskAssigned}>{task.assigned}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.taskEdit}>Đổi</Text>
                </TouchableOpacity>
              </View>
            ))}
          </Card>
        )}

        {/* Actions */}
        <View style={styles.actionSection}>
          <Button title="⚔️ Tìm đối thủ" onPress={() => onNavigate('CreateMatch')} style={{ marginBottom: SPACING.sm }} />
          <Button title="🙋 Tuyển thêm người" onPress={() => onNavigate('CreateFindPost')} variant="secondary" style={{ marginBottom: SPACING.sm }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 20 : 56,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  createBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  createBtnText: {
    color: COLORS.textWhite,
    fontWeight: '600',
    fontSize: FONTS.sizes.md,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginRight: SPACING.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  scroll: {
    flex: 1,
  },
  teamCard: {
    marginHorizontal: SPACING.xl,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  teamInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  teamName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  teamMeta: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  teamStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  teamStat: {
    alignItems: 'center',
  },
  teamStatValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.primary,
  },
  teamStatLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  // Detail
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 20 : 56,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.primary,
  },
  backBtn: {},
  backText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textWhite,
    fontWeight: '600',
  },
  editText: {
    fontSize: FONTS.sizes.md,
    color: '#D1FAE5',
    fontWeight: '600',
  },
  teamHero: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingBottom: SPACING.xxl,
  },
  heroName: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.textWhite,
    marginTop: SPACING.sm,
  },
  heroTags: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  heroStadium: {
    fontSize: FONTS.sizes.md,
    color: '#D1FAE5',
    marginTop: SPACING.sm,
  },
  detailStats: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.xl,
    marginTop: -16,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    justifyContent: 'space-around',
    ...SHADOWS.md,
    marginBottom: SPACING.md,
  },
  detailStat: {
    alignItems: 'center',
  },
  detailStatValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.primary,
  },
  detailStatLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formationPicker: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  formationBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formationBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  formationBtnText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  formationBtnTextActive: {
    color: COLORS.textWhite,
  },
  pitch: {
    marginTop: SPACING.sm,
  },
  pitchBg: {
    backgroundColor: '#1B5E20',
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    minHeight: 200,
    alignItems: 'center',
  },
  pitchLabel: {
    color: '#A5D6A7',
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  pitchPlayers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  pitchPlayer: {
    alignItems: 'center',
    gap: 2,
  },
  pitchPlayerName: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textWhite,
    fontWeight: '600',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  memberInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  memberName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  memberRole: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  taskIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  taskInfo: {
    flex: 1,
  },
  taskLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  taskAssigned: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  taskEdit: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  actionSection: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
});
