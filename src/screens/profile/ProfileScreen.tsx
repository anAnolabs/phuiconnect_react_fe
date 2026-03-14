// =============================================
// PhuiConnect - Player Profile Screen
// =============================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS, POSITIONS } from '../../constants/theme';
import { SkillBar } from '../../components/ui';
import Header from '../../components/Header';
import ActivityCard from '../../components/ActivityCard';
import Icon from '../../components/Icon';
import { MOCK_PLAYER, MOCK_FEED } from '../../data/mockData';

interface ProfileScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onLogout: () => void;
}

export default function ProfileScreen({ onNavigate, onLogout }: ProfileScreenProps) {
  const player = MOCK_PLAYER;
  const [activeTab, setActiveTab] = useState('Hoạt động');

  const tabs = ['Hoạt động', 'Đội bóng', 'Highlights'];

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Player Info Card */}
        <View style={styles.playerCard}>
          <View style={styles.avatarWrapper}>
             <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoF1EfU2KuNc2b8s0_iqiZ2uVSkYmPpjyxVXPZ5pof6FNXVOWUWqty6q_jf-ZOeMpJygoHyvhKsDgcqDeUSLQ9_5kcKIVcbRd8cU49cUcacWNFdyH9XRf7QNZuY9H8Ax1-NqE0t6wC7lvvZOGVk14HKmWSjCI6jmOdEClHia1wTGR2Y66DdrYQFjXrvMx55sQL458QIL0A0htOqa2IjtdFHImTooMr3fnn2GXhbalKuYbpiZnsTT_HETdmCf9H-dZnv3mZrXVvud0" }} style={styles.avatarImg} />
          </View>
          <Text style={styles.playerName}>{player.fullName}</Text>
          <Text style={styles.playerPosition}>{POSITIONS[player.preferredPosition]}</Text>
          <Text style={styles.playerMeta}>
             <Icon name="location_on" size={16} color={COLORS.textSecondary} style={{ marginRight: 2 }} />
             {player.city}
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsScrollContainer}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
             <View style={styles.statBox}>
               <Text style={styles.statLabel}>Bàn thắng</Text>
               <Text style={styles.statNum}>12</Text>
             </View>
             <View style={styles.statBox}>
               <Text style={styles.statLabel}>Kiến tạo</Text>
               <Text style={styles.statNum}>24</Text>
             </View>
             <View style={styles.statBox}>
               <Text style={[styles.statLabel, { textAlign: 'center' }]}>Số trận\nđã đá</Text>
               <Text style={styles.statNum}>45</Text>
             </View>
           </ScrollView>
        </View>

        {/* Skills Section */}
        <View style={styles.skillsSection}>
           <Text style={styles.sectionTitle}>Chỉ số kỹ năng</Text>
           <View style={styles.skillsList}>
              <SkillBar label="Tốc độ" value={player.skills.speed || 85} color={COLORS.primary} />
              <SkillBar label="Chuyền bóng" value={player.skills.passing || 78} color={COLORS.primary} />
              <SkillBar label="Sút bóng" value={player.skills.shooting || 70} color={COLORS.primary} />
              <SkillBar label="Phòng ngự" value={player.skills.defending || 65} color={COLORS.primary} />
           </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
           {activeTab === 'Hoạt động' && (
             <>
               {MOCK_FEED.map(activity => (
                 <ActivityCard key={activity.id} activity={activity} />
               ))}
             </>
           )}
           {activeTab === 'Đội bóng' && (
             <View style={styles.placeholderContent}>
                <Text style={styles.placeholderText}>Chưa có thông tin đội bóng.</Text>
             </View>
           )}
           {activeTab === 'Highlights' && (
             <View style={styles.placeholderContent}>
                <Text style={styles.placeholderText}>Chưa có video highlights.</Text>
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
  playerCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingBottom: SPACING.md,
    position: 'relative',
  },
  avatarWrapper: {
    marginBottom: SPACING.md,
    width: 96,
    height: 96,
    borderRadius: RADIUS.full,
    ...SHADOWS.md,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  playerName: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  playerPosition: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  playerMeta: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsScrollContainer: {
    marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  statBox: {
    flex: 1,
    minWidth: 100,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.divider,
    ...SHADOWS.sm,
  },
  statNum: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  statLabel: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  skillsList: {
    flexDirection: 'column',
    gap: SPACING.md,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  tabContent: {
    paddingTop: SPACING.lg,
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
