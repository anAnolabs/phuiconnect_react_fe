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
  ImageBackground,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS, POSITIONS } from '../../constants/theme';
import { Card, EmptyState, Avatar, Badge } from '../../components/ui';
import Header from '../../components/Header';
import ActivityCard from '../../components/ActivityCard';
import Icon from '../../components/Icon';
import { MOCK_TEAMS, MOCK_PLAYERS, MOCK_FEED } from '../../data/mockData';
import { TeamMember } from '../../types';

interface TeamsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function TeamsScreen({ onNavigate }: TeamsScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'my' | 'discover'>('my');
  const myTeams = MOCK_TEAMS.filter(t => t.ownerId === 'u1' || t.id === 't1');
  const allTeams = MOCK_TEAMS;

  return (
    <View style={styles.container}>
      <Header title="Đội bóng" />
      
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
      <View style={styles.teamCardHeader}>
         <View style={styles.teamAvatar}><Text style={styles.teamAvatarText}>{team.name.substring(0, 2).toUpperCase()}</Text></View>
        <View style={styles.teamInfo}>
          <Text style={styles.teamNameList}>{team.name}</Text>
          <Text style={styles.teamMeta}>
             <Icon name="location_on" size={14} color={COLORS.textSecondary} style={{ marginRight: 2 }} />
             {team.district}, {team.city}
          </Text>
          <Text style={styles.teamMeta}>
             <Icon name="stadium" size={14} color={COLORS.textSecondary} style={{ marginRight: 2 }} />
             {team.homeStadium}
          </Text>
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
           <View style={[styles.statusPill, { backgroundColor: team.ownerId === 'u1' ? COLORS.primaryBg : '#FDF2F8' }]}>
              <Text style={[styles.statusPillText, { color: team.ownerId === 'u1' ? COLORS.primaryDark : '#DB2777' }]}>
                 {team.ownerId === 'u1' ? 'Chủ đội' : 'Tham gia'}
              </Text>
           </View>
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
  const [activeTab, setActiveTab] = useState('Feed');
  const tabs = ['Feed', 'Thành viên', 'Lịch thi đấu'];

  // Mock members
  const members: TeamMember[] = MOCK_PLAYERS.map((p, i) => ({
    teamId: team.id,
    userId: p.userId,
    role: i === 0 ? 'owner' : i === 1 ? 'captain' : 'member',
    position: p.preferredPosition,
    status: 'active',
    playerName: p.fullName,
    avatar: '',
  }));

  return (
    <View style={styles.container}>
      <Header showSearch={false} title={team.name} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <ImageBackground 
            source={{ uri: (team as any).banner || 'https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?w=800&q=80' }} 
            style={styles.heroBanner}
            imageStyle={{ opacity: 0.8 }}
        >
          <TouchableOpacity style={styles.backBtnWrapper} onPress={onBack}>
             <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* Info overlapping banner */}
        <View style={styles.teamHeroInfo}>
           <View style={styles.heroAvatarWrapper}>
              <Avatar name={team.name} size={64} />
           </View>
           <Text style={styles.heroTeamName}>{team.name}</Text>
           <Text style={styles.heroLocation}>📍 {team.district}, {team.city}</Text>
        </View>

        {/* Overarching Stats (W/D/L) */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{(team as any).stats?.wins || 0}</Text>
            <Text style={styles.statLabel}>Thắng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{(team as any).stats?.draws || 0}</Text>
            <Text style={styles.statLabel}>Hòa</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{(team as any).stats?.losses || 0}</Text>
            <Text style={styles.statLabel}>Thua</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.primaryBtn]}>
             <Text style={styles.primaryBtnText}>⚔️ Thách đấu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.secondaryBtn]}>
             <Text style={styles.secondaryBtnText}>🙋 Chiêu mộ</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.itemTabBtn, activeTab === tab && styles.itemTabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.itemTabText, activeTab === tab && styles.itemTabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
           {activeTab === 'Feed' && (
             <>
               {MOCK_FEED.map(activity => (
                 <ActivityCard key={activity.id} activity={activity} />
               ))}
             </>
           )}
           
           {activeTab === 'Thành viên' && (
             <View style={styles.membersList}>
               {members.map(member => (
                 <View key={member.userId} style={styles.memberItem}>
                   <Avatar name={member.playerName} size={40} />
                   <View style={styles.memberInfo}>
                     <Text style={styles.memberName}>{member.playerName}</Text>
                     <Text style={styles.memberRole}>
                       {member.role === 'owner' ? '👑 Chủ đội' : member.role === 'captain' ? '©️ Đội trưởng' : '⚽ Thành viên'}
                     </Text>
                   </View>
                   <Badge text={POSITIONS[member.position] || member.position} color={COLORS.accent} />
                 </View>
               ))}
             </View>
           )}

           {activeTab === 'Lịch thi đấu' && (
             <View style={styles.placeholderContent}>
                <Text style={styles.placeholderText}>Chưa có lịch thi đấu.</Text>
             </View>
           )}
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
  scroll: {
    flex: 1,
  },
  // List Screen Styles
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
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  teamCard: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.divider,
    shadowColor: 'transparent', // remove default card shadow
  },
  teamCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  teamInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  teamAvatar: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0', // slate-200 equivalent
  },
  teamAvatarText: {
    fontFamily: FONTS.bold,
    color: COLORS.textSecondary,
    fontSize: 20,
    fontWeight: '700',
  },
  teamNameList: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
  },
  teamMeta: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.primary,
  },
  teamStatLabel: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  statusPill: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  statusPillText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },

  // Detail Screen Styles
  heroBanner: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.textPrimary,
  },
  backBtnWrapper: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: RADIUS.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.bold,
  },
  teamHeroInfo: {
    alignItems: 'center',
    marginTop: -32,
    marginBottom: SPACING.lg,
  },
  heroAvatarWrapper: {
    borderWidth: 4,
    borderColor: COLORS.background,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  heroTeamName: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.textPrimary,
  },
  heroLocation: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.xl,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    ...SHADOWS.sm,
    marginBottom: SPACING.lg,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.divider,
  },
  // Actions
  actionButtonsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.md,
  },
  secondaryBtn: {
    backgroundColor: COLORS.primaryBg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryBtnText: {
    color: COLORS.primaryDark,
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.md,
  },
  // Tabs
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  itemTabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  itemTabBtnActive: {
    borderBottomColor: COLORS.primary,
  },
  itemTabText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  itemTabTextActive: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  tabContent: {
    paddingTop: SPACING.lg,
  },
  membersList: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
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
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
  },
  memberRole: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  placeholderContent: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  }
});
