// =============================================
// PhuiConnect - Find Player Screen
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
import { Avatar, Badge, Card, Button, EmptyState } from '../../components/ui';
import { MOCK_FIND_POSTS, MOCK_PLAYERS } from '../../data/mockData';
import { FindType } from '../../types';

interface FindPlayerScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function FindPlayerScreen({ onNavigate }: FindPlayerScreenProps) {
  const [viewMode, setViewMode] = useState<'posts' | 'players'>('posts');
  const [filterType, setFilterType] = useState<FindType | 'all'>('all');

  const filteredPosts = MOCK_FIND_POSTS.filter(p => {
    if (filterType !== 'all' && p.type !== filterType) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🙋 Tìm người đá</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => onNavigate('CreateFindPost')}>
          <Text style={styles.createBtnText}>+ Đăng tin</Text>
        </TouchableOpacity>
      </View>

      {/* View Mode Toggle */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'posts' && styles.toggleBtnActive]}
          onPress={() => setViewMode('posts')}>
          <Text style={[styles.toggleText, viewMode === 'posts' && styles.toggleTextActive]}>📢 Tin tuyển người</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'players' && styles.toggleBtnActive]}
          onPress={() => setViewMode('players')}>
          <Text style={[styles.toggleText, viewMode === 'players' && styles.toggleTextActive]}>👤 Cầu thủ</Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'posts' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {([
            { key: 'all', label: 'Tất cả', icon: '📋' },
            { key: 'need_players', label: 'Đội tuyển người', icon: '👥' },
            { key: 'looking_for_match', label: 'Cầu thủ tìm đội', icon: '🙋' },
          ] as const).map(f => (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterChip, filterType === f.key && styles.filterChipActive]}
              onPress={() => setFilterType(f.key as any)}>
              <Text style={[styles.filterChipText, filterType === f.key && styles.filterChipTextActive]}>
                {f.icon} {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {viewMode === 'posts' ? (
          filteredPosts.length === 0 ? (
            <EmptyState icon="🔍" title="Không có tin nào" subtitle="Thử thay đổi bộ lọc" />
          ) : (
            filteredPosts.map(post => (
              <FindPostCard key={post.id} post={post} />
            ))
          )
        ) : (
          MOCK_PLAYERS.map(player => (
            <PlayerCard key={player.userId} player={player} />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

// ---- Find Post Card ----
function FindPostCard({ post }: { post: typeof MOCK_FIND_POSTS[0] }) {
  const isTeam = post.type === 'need_players';

  return (
    <Card style={styles.postCard}>
      {/* Header */}
      <View style={styles.postHeader}>
        <Avatar name={isTeam ? post.teamName || '' : post.userName} size={44} />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postName}>{isTeam ? post.teamName : post.userName}</Text>
          <Text style={styles.postTime}>
            {getTimeAgo(post.createdAt)}
          </Text>
        </View>
        <Badge
          text={isTeam ? '👥 Tuyển người' : '🙋 Tìm đội'}
          color={isTeam ? COLORS.primary : COLORS.accent}
        />
      </View>

      {/* Content */}
      <View style={styles.postContent}>
        {/* Main Info */}
        <View style={styles.postMainInfo}>
          <View style={styles.postInfoRow}>
            <Text style={styles.postInfoIcon}>📅</Text>
            <Text style={styles.postInfoText}>{post.date} - {post.time}</Text>
          </View>
          <View style={styles.postInfoRow}>
            <Text style={styles.postInfoIcon}>📍</Text>
            <Text style={styles.postInfoText}>{post.stadiumName || post.location}, {post.district}</Text>
          </View>
          <View style={styles.postInfoRow}>
            <Text style={styles.postInfoIcon}>⚽</Text>
            <Text style={styles.postInfoText}>{post.format} · Skill {post.skillLevel}+</Text>
          </View>
        </View>

        {/* Positions needed */}
        <View style={styles.postPositions}>
          <Text style={styles.positionLabel}>Vị trí cần:</Text>
          <View style={styles.positionTags}>
            {post.position.map(p => (
              <Badge key={p} text={`${p} - ${POSITIONS[p]}`} color={COLORS.accent} />
            ))}
          </View>
        </View>

        {/* Spots & Fee */}
        <View style={styles.postFooter}>
          {isTeam && post.spotsLeft && (
            <View style={styles.spotsInfo}>
              <Text style={styles.spotsText}>🔥 Còn {post.spotsLeft} chỗ</Text>
            </View>
          )}
          {post.fee > 0 && (
            <Text style={styles.feeText}>💰 {post.fee.toLocaleString('vi-VN')}đ/người</Text>
          )}
        </View>

        {/* Note */}
        {post.note && (
          <Text style={styles.postNote}>💬 {post.note}</Text>
        )}
      </View>

      {/* Actions */}
      <View style={styles.postActions}>
        {isTeam ? (
          <Button title="✋ Đăng ký đá" onPress={() => {}} variant="primary" size="sm" />
        ) : (
          <Button title="📩 Mời vào đội" onPress={() => {}} variant="primary" size="sm" />
        )}
        <Button title="💬 Nhắn tin" onPress={() => {}} variant="outline" size="sm" />
      </View>
    </Card>
  );
}

// ---- Player Card ----
function PlayerCard({ player }: { player: typeof MOCK_PLAYERS[0] }) {
  const topSkills = Object.entries(player.skills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <Card style={styles.postCard}>
      <View style={styles.playerRow}>
        <Avatar name={player.fullName} size={52} />
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{player.fullName}</Text>
          <View style={styles.playerTags}>
            <Badge text={POSITIONS[player.preferredPosition]} color={COLORS.primary} />
            <Badge text={`Skill ${player.skillLevel}`} color={COLORS.secondary} />
          </View>
          <Text style={styles.playerMeta}>
            📍 {player.district} · ⚽ {player.totalMatches} trận · ⭐ {player.rating.toFixed(1)}
          </Text>
        </View>
      </View>

      {/* Top Skills */}
      <View style={styles.topSkills}>
        {topSkills.map(([key, val]) => (
          <View key={key} style={styles.skillChip}>
            <Text style={styles.skillChipText}>{SKILL_LABELS_SHORT[key]} {val}</Text>
          </View>
        ))}
      </View>

      {/* Bio */}
      {player.bio && (
        <Text style={styles.playerBio} numberOfLines={2}>💬 {player.bio}</Text>
      )}

      <View style={styles.postActions}>
        <Button title="📩 Mời vào đội" onPress={() => {}} variant="primary" size="sm" />
        <Button title="👤 Xem profile" onPress={() => {}} variant="outline" size="sm" />
      </View>
    </Card>
  );
}

const SKILL_LABELS_SHORT: Record<string, string> = {
  speed: '⚡',
  passing: '🎯',
  shooting: '🥅',
  dribbling: '🔥',
  defending: '🛡️',
  stamina: '💪',
};

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffH = Math.floor((now.getTime() - date.getTime()) / 3600000);
  if (diffH < 1) return 'Vừa xong';
  if (diffH < 24) return `${diffH} giờ trước`;
  return `${Math.floor(diffH / 24)} ngày trước`;
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
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: RADIUS.md,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.primaryBg,
  },
  toggleText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  toggleTextActive: {
    color: COLORS.primary,
  },
  filterRow: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: COLORS.textWhite,
  },
  scroll: {
    flex: 1,
  },
  postCard: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  postName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  postTime: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
  },
  postContent: {
    gap: SPACING.md,
  },
  postMainInfo: {
    gap: 6,
  },
  postInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postInfoIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 20,
  },
  postInfoText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  postPositions: {
    gap: 6,
  },
  positionLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  positionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotsInfo: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  spotsText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: '#D97706',
  },
  feeText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  postNote: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  postActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  // Player Card
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  playerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  playerName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  playerTags: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 4,
  },
  playerMeta: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  topSkills: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  skillChip: {
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  skillChipText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  playerBio: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});
