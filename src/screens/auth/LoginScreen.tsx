// =============================================
// PhuiConnect - Login Screen
// =============================================
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { Button, Input } from '../../components/ui';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    onLogin();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>⚽</Text>
          <Text style={styles.heroTitle}>PhuiConnect</Text>
          <Text style={styles.heroSubtitle}>
            Nền tảng kết nối cộng đồng{'\n'}bóng đá phong trào
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Đăng nhập</Text>

          {!otpSent ? (
            <>
              <Input
                label="Số điện thoại"
                placeholder="0901234567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Button
                title="Gửi mã OTP"
                onPress={handleSendOtp}
                icon="📱"
                disabled={phone.length < 9}
              />
            </>
          ) : (
            <>
              <Text style={styles.otpInfo}>
                Mã OTP đã gửi đến <Text style={styles.otpPhone}>{phone}</Text>
              </Text>
              <Input
                label="Mã OTP"
                placeholder="123456"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
              />
              <Button
                title="Xác nhận"
                onPress={handleVerifyOtp}
                icon="✅"
                disabled={otp.length < 4}
              />
              <TouchableOpacity
                onPress={() => setOtpSent(false)}
                style={styles.backLink}>
                <Text style={styles.backLinkText}>← Đổi số điện thoại</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>HOẶC</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialBtn} onPress={onLogin}>
              <Text style={styles.socialIcon}>🔵</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={onLogin}>
              <Text style={styles.socialIcon}>🍎</Text>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={onLogin}>
              <Text style={styles.socialIcon}>🔷</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {[
            { icon: '🔍', text: 'Tìm người đá ké' },
            { icon: '⚔️', text: 'Tìm đối thủ' },
            { icon: '🏟️', text: 'Tìm sân bóng' },
            { icon: '🏆', text: 'Giải đấu' },
          ].map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'web' ? 60 : 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 56,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: FONTS.sizes.hero,
    fontWeight: '800',
    color: COLORS.textWhite,
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: FONTS.sizes.lg,
    color: '#D1FAE5',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.xl,
    marginTop: -20,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    ...SHADOWS.lg,
  },
  formTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  otpInfo: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  otpPhone: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  backLink: {
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  backLinkText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xxl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  socialIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  socialText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: SPACING.xxl,
    gap: SPACING.lg,
  },
  featureItem: {
    alignItems: 'center',
    width: 80,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  featureText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
