// src/components/Header.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SPACING, SHADOWS, RADIUS } from '../constants/theme';
import Icon from './Icon';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}

export default function Header({ title = 'PhuiConnect', showSearch = true }: HeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Row: Logo & Notifications */}
        <View style={styles.topRow}>
          <View style={styles.logoContainer}>
            <Icon name="sports_soccer" size={32} color={COLORS.primary} style={styles.logoIcon} />
            <Text style={styles.logoText}>{title}</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications" size={24} color={COLORS.textSecondary} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Bottom Row: Search Bar */}
        {showSearch && (
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search players, teams, or fields"
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.surface,
  },
  container: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === 'android' ? SPACING.xl : SPACING.sm,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: SPACING.xs,
  },
  logoText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 40,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    height: '100%',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' as any } : {}),
  },
});
