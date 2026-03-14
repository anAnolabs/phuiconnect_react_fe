// src/components/ActivityCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, SHADOWS, RADIUS } from '../constants/theme';
import Icon from './Icon';

interface ActivityCardProps {
  activity: any; // Type 'any' for mock flexibility right now
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  // If it's a match result
  if (activity.type === 'match_result') {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerGeneric}>
            <View style={styles.avatarPlaceholder} />
            <View style={styles.headerTextCol}>
              <Text style={styles.headerTitle}>{activity.homeTeam.name} vs {activity.awayTeam.name}</Text>
              <Text style={styles.headerMetaText}>
                <Icon name="schedule" size={14} color={COLORS.textSecondary} style={{ marginRight: 2 }} />
                {activity.time}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more_horiz" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.matchScoreBoard}>
            <View style={styles.teamCol}>
               <View style={styles.teamAvatar}><Text style={styles.teamAvatarText}>{activity.homeTeam.name.substring(0, 2).toUpperCase()}</Text></View>
               <Text style={styles.teamNameBoard}>{activity.homeTeam.name}</Text>
            </View>
            <View style={styles.scoreCol}>
              <Text style={styles.scoreBoardText}>{activity.score}</Text>
              <View style={styles.statusPill}><Text style={styles.statusPillText}>Full Time</Text></View>
            </View>
            <View style={styles.teamCol}>
               <View style={styles.teamAvatar}><Text style={styles.teamAvatarText}>{activity.awayTeam.name.substring(0, 2).toUpperCase()}</Text></View>
               <Text style={styles.teamNameBoard}>{activity.awayTeam.name}</Text>
            </View>
          </View>

          <View style={styles.motmBox}>
            <Icon name="star" size={18} color={COLORS.primary} style={{ marginRight: SPACING.xs }} filled />
            <Text style={styles.motmLabel}>MotM: </Text>
            <Text style={styles.motmName}>{activity.motm}</Text>
          </View>

          <View style={styles.metaRow}>
            <Icon name="location_on" size={16} color={COLORS.textSecondary} style={{ marginRight: SPACING.xs }} />
            <Text style={styles.metaText}>{activity.location}</Text>
          </View>

          {activity.image && (
            <Image source={{ uri: activity.image }} style={styles.media} resizeMode="cover" />
          )}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="thumb_up" size={20} color={COLORS.textSecondary} style={{ marginRight: SPACING.xs }} />
            <Text style={styles.actionText}>{activity.likes} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chat_bubble" size={20} color={COLORS.textSecondary} style={{ marginRight: SPACING.xs }} />
            <Text style={styles.actionText}>{activity.comments} Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.challengeBtn]}>
             <Icon name="swords" size={20} color={COLORS.primary} style={{ marginRight: SPACING.xs }} />
            <Text style={styles.challengeText}>Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // If looking for opponent / generic post
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerGeneric}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.headerTextCol}>
            <Text style={styles.headerTitle}>{activity.team?.name || activity.userName || 'User'}</Text>
            <Text style={styles.headerMetaText}>
               <Icon name="schedule" size={14} color={COLORS.textSecondary} style={{ marginRight: 2 }} />
               {activity.time}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
           <Icon name="more_horiz" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.message}>{activity.message || activity.note}</Text>
      
      <View style={[styles.metaRow, { paddingHorizontal: SPACING.md }]}>
        <Icon name="location_on" size={16} color={COLORS.textSecondary} style={{ marginRight: SPACING.xs }} />
        <Text style={styles.metaText}>{activity.location}</Text>
      </View>

      <View style={styles.actionRow}>
         <TouchableOpacity style={[styles.actionButton, styles.primaryBtn]}>
            <Text style={styles.primaryBtnText}>Liên hệ ngay</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
    borderWidth: 1,
    borderColor: COLORS.divider,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  headerGeneric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextCol: {
    marginLeft: SPACING.sm,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  headerMetaText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  moreButton: {
    padding: SPACING.xs,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.border,
  },
  cardBody: {
    padding: SPACING.md,
  },
  matchScoreBoard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.divider,
    marginBottom: SPACING.md,
  },
  teamCol: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  teamAvatar: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
    borderWidth: 2,
    borderColor: '#E2E8F0', // slate-200 equivalent
  },
  teamAvatarText: {
    fontFamily: FONTS.bold,
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
  teamNameBoard: {
    fontFamily: FONTS.bold,
    fontSize: 12, // text-xs
    color: COLORS.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreCol: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  scoreBoardText: {
    fontFamily: FONTS.bold,
    fontSize: 24, // text-2xl
    color: COLORS.textPrimary,
    fontWeight: '900',
    letterSpacing: 2, // tracking-widest
  },
  statusPill: {
    backgroundColor: COLORS.primaryBg, // primary/10
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    marginTop: 4,
  },
  statusPillText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  motmBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background, // slate-50
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  motmLabel: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  motmName: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  metaText: {
    fontFamily: FONTS.regular,
    fontSize: 12, // text-xs
    color: COLORS.textSecondary,
  },
  message: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    backgroundColor: '#F8FAFC', // slate-50 equivalent
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  actionText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  challengeBtn: {
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  challengeText: {
    color: COLORS.primaryDark,
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    width: '100%',
    justifyContent: 'center',
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm,
    marginRight: 0,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontWeight: '600',
    textAlign: 'center',
  }
});
