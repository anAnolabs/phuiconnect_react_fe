// =============================================
// PhuiConnect - Find Match / Opponent Screen
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
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { Avatar, Badge, Card, Button, StatusBadge, EmptyState } from '../../components/ui';
import { MOCK_MATCHES } from '../../data/mockData';
import { MatchFormat, MatchStatus } from '../../types';

interface FindMatchScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function FindMatchScreen({ onNavigate }: FindMatchScreenProps) {
  const [filterFormat, setFilterFormat] = useState<MatchFormat | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<MatchStatus | 'all'>('all');

  const filteredMatches = MOCK_MATCHES.filter(m => {
    if (filterFormat !== 'all' && m.format !== filterFormat) return false;
    if (filterStatus !== 'all' && m.status !== filterStatus) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚔️ Tìm đối thủ</Text>
        <TouchableOpacity style={styles.createBtn} onPress={() => onNavigate('CreateMatch')}>
          <Text style={styles.createBtnText}>+ Tạo trận</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          <Text style={styles.filterLabel}>Loại sân:</Text>
          {(['all', '5v5', '7v7', '11v11'] as const).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filterFormat === f && styles.filterChipActive]}
              onPress={() => setFilterFormat(f)}>
              <Text style={[styles.filterChipText, filterFormat === f && styles.filterChipTextActive]}>
                {f === 'all' ? 'Tất cả' : f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          <Text style={styles.filterLabel}>Trạng thái:</Text>
          {([
            { key: 'all', label: 'Tất cả' },
            { key: 'OPEN', label: 'Đang tìm' },
            { key: 'CONFIRMED', label: 'Đã xác nhận' },
            { key: 'FINISHED', label: 'Kết thúc' },
          ] as const).map(s => (
            <TouchableOpacity
              key={s.key}
              style={[styles.filterChip, filterStatus === s.key && styles.filterChipActive]}
              onPress={() => setFilterStatus(s.key as any)}>
              <Text style={[styles.filterChipText, filterStatus === s.key && styles.filterChipTextActive]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {filteredMatches.length === 0 ? (
          <EmptyState icon="⚔️" title="Không có trận đấu" subtitle="Thử thay đổi bộ lọc hoặc tạo trận mới" />
        ) : (
          filteredMatches.map(match => (
            <Card key={match.id} onPress={() => onNavigate('MatchDetail', { matchId: match.id })} style={styles.matchCard}>
              {/* Status & Format */}
              <View style={styles.matchHeader}>
                <StatusBadge status={match.status} />
                <View style={styles.matchHeaderRight}>
                  <Badge text={match.format} color={COLORS.secondary} />
                  <Badge text={`Skill ${match.skillLevel}`} color={COLORS.accent} />
                </View>
              </View>

              {/* Teams VS */}
              <View style={styles.matchTeams}>
                <View style={styles.matchTeam}>
                  <Avatar name={match.hostTeamName} size={48} />
                  <Text style={styles.teamName} numberOfLines={1}>{match.hostTeamName}</Text>
                  <Badge text="Chủ nhà" color={COLORS.primary} />
                </View>

                <View style={styles.vsContainer}>
                  {match.score ? (
                    <>
                      <Text style={styles.scoreText}>{match.score.home}</Text>
                      <Text style={styles.vsText}>-</Text>
                      <Text style={styles.scoreText}>{match.score.away}</Text>
                    </>
                  ) : (
                    <Text style={styles.vsText}>VS</Text>
                  )}
                </View>

                <View style={styles.matchTeam}>
                  {match.opponentTeamName ? (
                    <>
                      <Avatar name={match.opponentTeamName} size={48} />
                      <Text style={styles.teamName} numberOfLines={1}>{match.opponentTeamName}</Text>
                    </>
                  ) : (
                    <>
                      <View style={styles.emptySlot}>
                        <Text style={styles.emptySlotText}>?</Text>
                      </View>
                      <Text style={[styles.teamName, { color: COLORS.textLight }]}>Đang tìm đối...</Text>
                    </>
                  )}
                </View>
              </View>

              {/* Match Info */}
              <View style={styles.matchInfo}>
                <View style={styles.matchInfoItem}>
                  <Text style={styles.matchInfoIcon}>🏟️</Text>
                  <Text style={styles.matchInfoText}>{match.stadiumName}</Text>
                </View>
                <View style={styles.matchInfoItem}>
                  <Text style={styles.matchInfoIcon}>📅</Text>
                  <Text style={styles.matchInfoText}>
                    {new Date(match.dateTime).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}
                  </Text>
                </View>
                <View style={styles.matchInfoItem}>
                  <Text style={styles.matchInfoIcon}>🕐</Text>
                  <Text style={styles.matchInfoText}>
                    {new Date(match.dateTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>

              {/* Note */}
              {match.note && (
                <Text style={styles.matchNote}>💬 {match.note}</Text>
              )}

              {/* Action */}
              {match.status === 'OPEN' && !match.opponentTeamId && (
                <Button title="📩 Xin đấu" onPress={() => {}} variant="primary" size="sm" style={{ marginTop: SPACING.md }} />
              )}
            </Card>
          ))
        )}

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
  filters: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
    paddingVertical: 4,
  },
  filterLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginRight: 4,
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
  matchCard: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  matchHeaderRight: {
    flexDirection: 'row',
    gap: 6,
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
  },
  matchTeam: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  teamName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    gap: 6,
  },
  vsText: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  scoreText: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '900',
    color: COLORS.primary,
  },
  emptySlot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySlotText: {
    fontSize: 22,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  matchInfo: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    gap: 6,
  },
  matchInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchInfoIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 20,
  },
  matchInfoText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  matchNote: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
});
