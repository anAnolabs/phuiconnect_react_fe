// =============================================
// PhuiConnect - Login Screen
// =============================================
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { Button } from '../../components/ui';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
  onLoginSuccess: (user: any) => void;
  onGuestLogin: () => void;
}

export default function LoginScreen({ onNavigate, onLoginSuccess, onGuestLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login success
    onLoginSuccess({ id: 'u1', name: 'Hoàng Sơn', role: 'player' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.logoIcon}>⚽</Text>
          <Text style={styles.logoText}>PhuiConnect</Text>
          <Text style={styles.tagline}>Kết nối đam mê bóng đá phủi</Text>
        </View>

        {/* Login Form Card */}
        <View style={styles.formCard}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại / Email"
              placeholderTextColor={COLORS.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor={COLORS.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
            <Text style={styles.primaryBtnText}>Đăng nhập</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Guest Login */}
          <TouchableOpacity style={styles.guestBtn} onPress={onGuestLogin}>
            <Text style={styles.guestBtnText}>Trải nghiệm ngay (Khách)</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Chưa có tài khoản? </Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  logoText: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.primaryDark,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    ...SHADOWS.lg,
    marginBottom: SPACING.xxl,
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    fontFamily: FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
  },
  forgotText: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.primaryDark,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  primaryBtnText: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.sm,
    fontSize: FONTS.sizes.sm,
  },
  guestBtn: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 50,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestBtnText: {
    fontFamily: FONTS.bold,
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  footerLink: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryDark,
    fontSize: FONTS.sizes.md,
  },
});
