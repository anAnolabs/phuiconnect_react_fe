// =============================================
// PhuiConnect - Stadium Finder Screen
// =============================================
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { Avatar, Badge, Card, Button, Rating, EmptyState } from '../../components/ui';
import { MOCK_STADIUMS } from '../../data/mockData';

interface StadiumScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function StadiumScreen({ onNavigate }: StadiumScreenProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const districts = ['all', ...Array.from(new Set(MOCK_STADIUMS.map(s => s.district)))];

  const filteredStadiums = MOCK_STADIUMS.filter(s => {
    if (selectedDistrict !== 'all' && s.district !== selectedDistrict) return false;
    return true;
  });

  const openGoogleMaps = (lat: number, lng: number, name: string) => {
    const url = Platform.OS === 'web'
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🏟️ Tìm sân bóng</Text>
          <Text style={styles.headerSubtitle}>{MOCK_STADIUMS.length} sân trong khu vực</Text>
        </View>
        <TouchableOpacity
          style={styles.viewToggle}
          onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
          <Text style={styles.viewToggleText}>
            {viewMode === 'list' ? '🗺️ Bản đồ' : '📋 Danh sách'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* District Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}>
        {districts.map(d => (
          <TouchableOpacity
            key={d}
            style={[styles.filterChip, selectedDistrict === d && styles.filterChipActive]}
            onPress={() => setSelectedDistrict(d)}>
            <Text style={[styles.filterChipText, selectedDistrict === d && styles.filterChipTextActive]}>
              {d === 'all' ? '📍 Tất cả' : d}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {viewMode === 'map' ? (
        /* Map View (placeholder) */
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapTitle}>Bản đồ sân bóng</Text>
            <Text style={styles.mapSubtitle}>
              Tích hợp Google Maps API để hiển thị{'\n'}
              vị trí sân bóng trên bản đồ
            </Text>
            {/* Simple dot map */}
            <View style={styles.dotMap}>
              {filteredStadiums.map(s => (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.mapDot, {
                    left: `${((s.lng - 106.65) / 0.15) * 100}%`,
                    top: `${((10.87 - s.lat) / 0.17) * 100}%`,
                  }]}
                  onPress={() => openGoogleMaps(s.lat, s.lng, s.name)}>
                  <Text style={styles.dotEmoji}>📍</Text>
                  <Text style={styles.dotLabel}>{s.name.split(' ').slice(1).join(' ')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ) : (
        /* List View */
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {filteredStadiums.length === 0 ? (
            <EmptyState icon="🏟️" title="Không tìm thấy sân" subtitle="Thử chọn quận khác" />
          ) : (
            filteredStadiums.map(stadium => (
              <Card key={stadium.id} style={styles.stadiumCard}>
                {/* Image placeholder */}
                <View style={styles.stadiumImage}>
                  <Text style={styles.stadiumImageIcon}>🏟️</Text>
                </View>

                {/* Info */}
                <View style={styles.stadiumContent}>
                  <View style={styles.stadiumHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.stadiumName}>{stadium.name}</Text>
                      <Text style={styles.stadiumAddress}>{stadium.address}</Text>
                    </View>
                    <View style={styles.priceTag}>
                      <Text style={styles.priceValue}>{(stadium.price / 1000).toFixed(0)}k</Text>
                      <Text style={styles.priceUnit}>/trận</Text>
                    </View>
                  </View>

                  {/* Rating & Formats */}
                  <View style={styles.stadiumMeta}>
                    <Rating rating={stadium.rating} size={14} />
                    <Text style={styles.reviewCount}>({stadium.reviewCount})</Text>
                    <View style={styles.formatTags}>
                      {stadium.formats.map(f => (
                        <Badge key={f} text={f} color={COLORS.accent} />
                      ))}
                    </View>
                  </View>

                  {/* Actions */}
                  <View style={styles.stadiumActions}>
                    <Button
                      title="📞 Gọi"
                      onPress={() => Linking.openURL(`tel:${stadium.phone}`).catch(() => {})}
                      variant="outline"
                      size="sm"
                    />
                    <Button
                      title="🗺️ Chỉ đường"
                      onPress={() => openGoogleMaps(stadium.lat, stadium.lng, stadium.name)}
                      variant="outline"
                      size="sm"
                    />
                    <Button
                      title="📋 Đặt sân"
                      onPress={() => {}}
                      variant="primary"
                      size="sm"
                    />
                  </View>
                </View>
              </Card>
            ))
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}
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
  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: '#D1FAE5',
    marginTop: 2,
  },
  viewToggle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  viewToggleText: {
    color: COLORS.textWhite,
    fontWeight: '600',
    fontSize: FONTS.sizes.sm,
  },
  filterRow: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
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
  // Map
  mapContainer: {
    flex: 1,
    padding: SPACING.xl,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  mapTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  mapSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  dotMap: {
    width: '100%',
    height: 250,
    backgroundColor: '#C8E6C9',
    borderRadius: RADIUS.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  mapDot: {
    position: 'absolute',
    alignItems: 'center',
  },
  dotEmoji: {
    fontSize: 20,
  },
  dotLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.textPrimary,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  // Stadium Card
  stadiumCard: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
    padding: 0,
    overflow: 'hidden',
  },
  stadiumImage: {
    height: 120,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stadiumImageIcon: {
    fontSize: 48,
  },
  stadiumContent: {
    padding: SPACING.lg,
  },
  stadiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  stadiumName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  stadiumAddress: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  priceTag: {
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  priceValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '800',
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primaryDark,
  },
  stadiumMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: 6,
  },
  reviewCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
  },
  formatTags: {
    flexDirection: 'row',
    gap: 4,
    marginLeft: 'auto',
  },
  stadiumActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
});
