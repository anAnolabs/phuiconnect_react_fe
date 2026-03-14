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
  ImageBackground,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import Header from '../../components/Header';
import { Rating } from '../../components/ui';
import Icon from '../../components/Icon';
import { MOCK_STADIUMS } from '../../data/mockData';

interface StadiumScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function StadiumScreen({ onNavigate }: StadiumScreenProps) {
  const [activeFilter, setActiveFilter] = useState('Location');
  const filters = ['Location', 'Date', 'Grass Type', 'Format (5/7/11)', 'Price'];

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <Header title="Sân bóng" showSearch={true} />

      {/* Filter Pill Bar */}
      <View style={styles.filterWrapper}>
         <ScrollView
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={styles.filterScroll}>
           {filters.map(f => (
             <TouchableOpacity
               key={f}
               style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
               onPress={() => setActiveFilter(f)}>
               <Text style={[styles.filterPillText, activeFilter === f && styles.filterPillTextActive]}>
                 {f}
               </Text>
             </TouchableOpacity>
           ))}
         </ScrollView>
      </View>

      {/* Field List Container */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {MOCK_STADIUMS.map(stadium => (
          <View key={stadium.id} style={styles.card}>
             
             {/* Main Image */}
             <ImageBackground 
                source={{ uri: (stadium as any).image || 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80' }}
                style={styles.cardImage}
                imageStyle={styles.cardImageInner}
             />

             {/* Info Section */}
             <View style={styles.infoContainer}>
                <View style={styles.titleRow}>
                   <Text style={styles.stadiumName}>{stadium.name}</Text>
                   <View style={styles.ratingBox}>
                      <Text style={styles.ratingText}>⭐ {stadium.rating}</Text>
                   </View>
                </View>
                
                <Text style={styles.metaRow}>
                   {stadium.district} • {stadium.formats.join('/')} • {(stadium.price / 1000).toFixed(0)}k/trận
                </Text>

                {/* Available Time Slots Carousel */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slotsScroll}>
                   {['18:00', '19:30', '21:00'].map((time, idx) => (
                      <TouchableOpacity key={idx} style={styles.slotPill}>
                         <Text style={styles.slotText}>{time}</Text>
                      </TouchableOpacity>
                   ))}
                </ScrollView>

                {/* Full Width Button */}
                <TouchableOpacity style={styles.bookBtn}>
                   <Text style={styles.bookBtnText}>Đặt Sân Ngay</Text>
                </TouchableOpacity>
             </View>
          </View>
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
  filterWrapper: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterScroll: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
  },
  filterPill: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterPillActive: {
    backgroundColor: COLORS.primaryBg,
    borderColor: COLORS.primaryDark,
  },
  filterPillText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  filterPillTextActive: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryDark,
  },
  scroll: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.divider,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardImageInner: {
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
  },
  infoContainer: {
    padding: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stadiumName: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    flex: 1,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  ratingText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.sm,
    color: COLORS.primaryDark,
  },
  metaRow: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  slotsScroll: {
    marginBottom: SPACING.md,
  },
  slotPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: RADIUS.sm,
    marginRight: SPACING.sm,
    backgroundColor: '#FAFAFA',
  },
  slotText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
  },
  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    width: '100%',
  },
  bookBtnText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
  }
});
