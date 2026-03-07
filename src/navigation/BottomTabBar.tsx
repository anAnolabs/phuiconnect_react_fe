// =============================================
// PhuiConnect - Bottom Tab Navigation
// =============================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';

export type TabName = 'Home' | 'FindMatch' | 'FindPlayer' | 'Teams' | 'Profile';

interface TabBarProps {
  activeTab: TabName;
  onChangeTab: (tab: TabName) => void;
}

const TABS: { key: TabName; icon: string; label: string }[] = [
  { key: 'Home', icon: '🏠', label: 'Trang chủ' },
  { key: 'FindMatch', icon: '⚔️', label: 'Tìm đối' },
  { key: 'FindPlayer', icon: '🙋', label: 'Tìm người' },
  { key: 'Teams', icon: '👥', label: 'Đội bóng' },
  { key: 'Profile', icon: '👤', label: 'Cá nhân' },
];

export default function BottomTabBar({ activeTab, onChangeTab }: TabBarProps) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onChangeTab(tab.key)}
            activeOpacity={0.7}>
            <Text style={[styles.icon, isActive && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    ...SHADOWS.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  icon: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
});
