// =============================================
// PhuiConnect - Nền tảng bóng đá phong trào
// iOS · Android · Web
// =============================================
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Platform, ActivityIndicator, Text } from 'react-native';
import { COLORS } from './src/constants/theme';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Screens
import LoginScreen from './src/screens/auth/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import TeamsScreen, { TeamDetailScreen } from './src/screens/team/TeamsScreen';
import FindMatchScreen from './src/screens/match/FindMatchScreen';
import FindPlayerScreen from './src/screens/find/FindPlayerScreen';
import StadiumScreen from './src/screens/stadium/StadiumScreen';

// Navigation
import BottomTabBar, { TabName } from './src/navigation/BottomTabBar';

type AppScreen =
  | { name: 'Login' }
  | { name: 'Main' }
  | { name: 'TeamDetail'; params: { teamId: string } }
  | { name: 'Stadiums' };

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  // Auth state from context
  const { isAuthenticated, isLoading, signOut } = useAuth();

  // Navigation state
  const [screen, setScreen] = useState<AppScreen>({ name: 'Main' });
  const [activeTab, setActiveTab] = useState<TabName>('Home');

  // Navigate handler
  const navigate = (screenName: string, params?: any) => {
    switch (screenName) {
      case 'Home':
      case 'FindMatch':
      case 'FindPlayer':
      case 'Teams':
      case 'Profile':
        setActiveTab(screenName as TabName);
        setScreen({ name: 'Main' });
        break;
      case 'Stadiums':
        setScreen({ name: 'Stadiums' });
        break;
      case 'TeamDetail':
        setScreen({ name: 'TeamDetail', params: { teamId: params?.teamId || 't1' } });
        break;
      case 'CreateTeam':
      case 'CreateMatch':
      case 'CreateFindPost':
      case 'MatchDetail':
      case 'FindPlayerDetail':
        // TODO: Implement detail screens in next phase
        break;
      default:
        break;
    }
  };

  const goBack = () => {
    setScreen({ name: 'Main' });
  };

  // Auth screen
  if (isLoading) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingIcon}>⚽</Text>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <LoginScreen onLogin={() => {}} />
      </>
    );
  }

  // Sub-screens (outside tabs)
  if (screen.name === 'TeamDetail') {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <TeamDetailScreen
          teamId={screen.params.teamId}
          onBack={goBack}
          onNavigate={navigate}
        />
      </>
    );
  }

  if (screen.name === 'Stadiums') {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View style={styles.container}>
          <StadiumScreen onNavigate={navigate} />
          <BottomTabBar activeTab={activeTab} onChangeTab={(tab) => { setActiveTab(tab); setScreen({ name: 'Main' }); }} />
        </View>
      </>
    );
  }

  // Main Tab Screen
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onNavigate={navigate} />;
      case 'FindMatch':
        return <FindMatchScreen onNavigate={navigate} />;
      case 'FindPlayer':
        return <FindPlayerScreen onNavigate={navigate} />;
      case 'Teams':
        return <TeamsScreen onNavigate={navigate} />;
      case 'Profile':
        return <ProfileScreen onNavigate={navigate} onLogout={() => signOut()} />;
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        {renderTabContent()}
        <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    ...(Platform.OS === 'web' ? { maxWidth: 480, alignSelf: 'center' as const, width: '100%' } : {}),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default App;
