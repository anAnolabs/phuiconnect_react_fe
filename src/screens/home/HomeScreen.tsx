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
import Header from '../../components/Header';
import ActivityCard from '../../components/ActivityCard';
import Icon from '../../components/Icon';
import { MOCK_FEED } from '../../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section: Summary Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Hoạt động hôm nay</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Icon name="event_available" size={32} color={COLORS.primary} style={styles.statIcon} />
              <Text style={styles.statNum}>12</Text>
              <Text style={styles.statLabel}>Trận đấu</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Icon name="group_add" size={32} color={COLORS.primary} style={styles.statIcon} />
              <Text style={styles.statNum}>5</Text>
              <Text style={styles.statLabel}>Đội tìm đối</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
               <Icon name="stadium" size={32} color={COLORS.primary} style={styles.statIcon} />
              <Text style={styles.statNum}>8</Text>
              <Text style={styles.statLabel}>Sân trống</Text>
            </View>
          </View>

          <View style={styles.actionButtonsRow}>
             <TouchableOpacity style={[styles.createBtn, styles.createMatchBtn]}>
                <Icon name="add_circle" size={20} color={COLORS.white} style={{ marginRight: SPACING.xs }} />
                <Text style={styles.createBtnText}>Tạo trận</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[styles.createBtn, styles.createTeamBtn]}>
                <Icon name="group" size={20} color={COLORS.primary} style={{ marginRight: SPACING.xs }} />
                <Text style={[styles.createBtnText, styles.createTeamBtnText]}>Lập đội</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Activity Feed */}
        <Text style={styles.feedTitle}>Feed Cộng Đồng</Text>
        {MOCK_FEED.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.md,
  },
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  heroTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontFamily: FONTS.bold,
    fontSize: 24, // text-2xl
    color: COLORS.primaryDark,
    lineHeight: 28,
  },
  statIcon: {
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  createBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createMatchBtn: {
    backgroundColor: COLORS.primary,
  },
  createTeamBtn: {
    backgroundColor: COLORS.primaryBg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  createBtnText: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
  },
  createTeamBtnText: {
    color: COLORS.primary,
  },
  feedTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  }
});
