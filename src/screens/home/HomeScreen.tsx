// =============================================
// PhuiConnect - Home / Feed Screen
// =============================================
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { Avatar, Badge, Card, SectionHeader, StatusBadge, Button } from '../../components/ui';
import { MOCK_MATCHES, MOCK_FIND_POSTS, MOCK_TOURNAMENTS } from '../../data/mockData';
import { POSITIONS } from '../../constants/theme';

interface HomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const upcomingMatches = MOCK_MATCHES.filter(m => m.status === 'OPEN' || m.status === 'CONFIRMED');
  const hotPosts = MOCK_FIND_POSTS.slice(0, 3);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Xin chào! 👋</Text>
          <Text style={styles.headerTitle}>PhuiConnect</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Text style={styles.notifIcon}>🔔</Text>
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {[
            { icon: '⚔️', label: 'Tìm đối', screen: 'FindMatch' },
            { icon: '🙋', label: 'Tìm người', screen: 'FindPlayer' },
            { icon: '🏟️', label: 'Tìm sân', screen: 'Stadiums' },
            { icon: '👥', label: 'Đội bóng', screen: 'Teams' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.quickItem}
              onPress={() => onNavigate(item.screen)}>
              <View style={styles.quickIcon}>
                <Text style={styles.quickIconText}>{item.icon}</Text>
              </View>
              <Text style={styles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hot: Find Players */}
        <SectionHeader title="🔥 Đang tìm người" actionText="Xem tất cả" onAction={() => onNavigate('FindPlayer')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {hotPosts.map(post => (
            <TouchableOpacity key={post.id} style={styles.findCard} onPress={() => onNavigate('FindPlayerDetail', { postId: post.id })}>
              <View style={styles.findCardHeader}>
                <Avatar name={post.type === 'need_players' ? post.teamName || '' : post.userName} size={36} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.findCardName} numberOfLines={1}>
                    {post.type === 'need_players' ? post.teamName : post.userName}
                  </Text>
                  <Text style={styles.findCardMeta}>
                    {post.type === 'need_players' ? `Cần ${post.spotsLeft} người` : 'Tìm đội'}
                  </Text>
                </View>
                <Badge
                  text={post.type === 'need_players' ? 'Tuyển' : 'Tìm đội'}
                  color={post.type === 'need_players' ? COLORS.primary : COLORS.accent}
                />
              </View>
              <View style={styles.findCardBody}>
                <Text style={styles.findCardInfo}>📅 {post.date} - {post.time}</Text>
                <Text style={styles.findCardInfo}>📍 {post.stadiumName || post.location}</Text>
                <Text style={styles.findCardInfo}>⚽ {post.format}</Text>
                <View style={styles.findCardPositions}>
                  {post.position.map(p => (
                    <Badge key={p} text={p} color={COLORS.accent} />
                  ))}
                </View>
              </View>
              {post.fee > 0 && (
                <Text style={styles.findCardFee}>{post.fee.toLocaleString('vi-VN')}đ/người</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Upcoming Matches */}
        <SectionHeader title="⚽ Trận sắp tới" actionText="Xem tất cả" onAction={() => onNavigate('FindMatch')} />
        {upcomingMatches.map(match => (
          <Card key={match.id} onPress={() => onNavigate('MatchDetail', { matchId: match.id })} style={styles.matchCard}>
            <View style={styles.matchHeader}>
              <StatusBadge status={match.status} />
              <Badge text={match.format} color={COLORS.secondary} />
            </View>
            <View style={styles.matchTeams}>
              <View style={styles.matchTeam}>
                <Avatar name={match.hostTeamName} size={40} />
                <Text style={styles.matchTeamName} numberOfLines={1}>{match.hostTeamName}</Text>
              </View>
              <View style={styles.matchVs}>
                <Text style={styles.vsText}>VS</Text>
                {match.score && (
                  <Text style={styles.scoreText}>{match.score.home} - {match.score.away}</Text>
                )}
              </View>
              <View style={styles.matchTeam}>
                {match.opponentTeamName ? (
                  <>
                    <Avatar name={match.opponentTeamName} size={40} />
                    <Text style={styles.matchTeamName} numberOfLines={1}>{match.opponentTeamName}</Text>
                  </>
                ) : (
                  <>
                    <View style={[styles.emptyTeam]}>
                      <Text style={styles.emptyTeamText}>?</Text>
                    </View>
                    <Text style={[styles.matchTeamName, { color: COLORS.textLight }]}>Đang tìm...</Text>
                  </>
                )}
              </View>
            </View>
            <View style={styles.matchInfo}>
              <Text style={styles.matchInfoText}>📍 {match.stadiumName}</Text>
              <Text style={styles.matchInfoText}>📅 {new Date(match.dateTime).toLocaleDateString('vi-VN')}</Text>
              <Text style={styles.matchInfoText}>🕐 {new Date(match.dateTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
          </Card>
        ))}

        {/* Tournaments */}
        <SectionHeader title="🏆 Giải đấu" actionText="Xem tất cả" />
        {MOCK_TOURNAMENTS.map(t => (
          <Card key={t.id} style={styles.matchCard}>
            <View style={styles.tournamentHeader}>
              <Text style={styles.tournamentIcon}>🏆</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.tournamentName}>{t.name}</Text>
                <Text style={styles.tournamentMeta}>📍 {t.location}</Text>
                <Text style={styles.tournamentMeta}>📅 {t.startDate} → {t.endDate}</Text>
              </View>
            </View>
            <View style={styles.tournamentStats}>
              <View style={styles.tournamentStat}>
                <Text style={styles.statValue}>{t.teamsRegistered}/{t.teamsLimit}</Text>
                <Text style={styles.statLabel}>Đội</Text>
              </View>
              <View style={styles.tournamentStat}>
                <Text style={styles.statValue}>{t.format === 'knockout' ? 'Loại trực tiếp' : t.format === 'round_robin' ? 'Vòng tròn' : 'Bảng đấu'}</Text>
                <Text style={styles.statLabel}>Thể thức</Text>
              </View>
              <View style={styles.tournamentStat}>
                <Text style={styles.statValue}>{(t.entryFee / 1000000).toFixed(1)}tr</Text>
                <Text style={styles.statLabel}>Phí</Text>
              </View>
            </View>
            <Button title="Đăng ký tham gia" onPress={() => {}} variant="outline" size="sm" />
          </Card>
        ))}

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
  greeting: {
    fontSize: FONTS.sizes.md,
    color: '#D1FAE5',
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.textWhite,
  },
  notifBtn: {
    position: 'relative',
    padding: 8,
  },
  notifIcon: {
    fontSize: 24,
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  scroll: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  quickItem: {
    alignItems: 'center',
  },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickIconText: {
    fontSize: 24,
  },
  quickLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  horizontalList: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  findCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: 280,
    ...SHADOWS.md,
  },
  findCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  findCardName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  findCardMeta: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  findCardBody: {
    gap: 4,
  },
  findCardInfo: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  findCardPositions: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  findCardFee: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.secondary,
    marginTop: SPACING.sm,
  },
  matchCard: {
    marginHorizontal: SPACING.xl,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  matchTeam: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  matchTeamName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  matchVs: {
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  vsText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  scoreText: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.primary,
  },
  emptyTeam: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTeamText: {
    fontSize: 18,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  matchInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  matchInfoText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  tournamentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  tournamentIcon: {
    fontSize: 36,
    marginRight: SPACING.md,
  },
  tournamentName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  tournamentMeta: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  tournamentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.divider,
  },
  tournamentStat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
