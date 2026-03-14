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

export type TabName = 'Home' | 'Search' | 'Teams' | 'Profile';

interface TabBarProps {
  activeTab: TabName;
  onChangeTab: (tab: TabName) => void;
}

import Icon from '../components/Icon';

const TABS: { key: TabName; icon: string; label: string }[] = [
  { key: 'Home', icon: 'home', label: 'Home' },
  { key: 'Search', icon: 'search', label: 'Search' },
  { key: 'Teams', icon: 'groups', label: 'Teams' },
  { key: 'Profile', icon: 'person', label: 'Profile' },
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
            <Icon 
               name={tab.icon} 
               size={24} 
               color={isActive ? COLORS.primary : COLORS.textSecondary} 
               filled={isActive}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
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
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 12,
    ...SHADOWS.md,
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
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginTop: 4,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
