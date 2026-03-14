// =============================================
// PhuiConnect - Auth Service
// Google Sign-In + Backend Integration
// =============================================
import { Platform } from 'react-native';
import { authApi, setAuthToken } from './api';

// ---- Types ----
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  location: string;
  role: string;
  loginMethod: string;
  createdAt: string;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
}

// ---- AsyncStorage helper ----
// We use a simple wrapper to handle the case when AsyncStorage isn't available (web)
const TOKEN_KEY = '@phuiconnect_token';
const USER_KEY = '@phuiconnect_user';

let storageModule: any = null;

async function getStorage() {
  if (storageModule) return storageModule;
  try {
    if (Platform.OS === 'web') {
      // Use localStorage on web
      return {
        getItem: async (key: string) => localStorage.getItem(key),
        setItem: async (key: string, value: string) => localStorage.setItem(key, value),
        removeItem: async (key: string) => localStorage.removeItem(key),
      };
    }
    // Use AsyncStorage on native
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    storageModule = AsyncStorage;
    return AsyncStorage;
  } catch {
    // Fallback: in-memory storage
    const memStore: Record<string, string> = {};
    return {
      getItem: async (key: string) => memStore[key] || null,
      setItem: async (key: string, value: string) => { memStore[key] = value; },
      removeItem: async (key: string) => { delete memStore[key]; },
    };
  }
}

// ---- Google Sign-In ----
async function getGoogleIdToken(): Promise<string> {
  if (Platform.OS === 'web') {
    return getGoogleIdTokenWeb();
  }
  return getGoogleIdTokenNative();
}

async function getGoogleIdTokenNative(): Promise<string> {
  try {
    const { GoogleSignin } = require('@react-native-google-signin/google-signin');

    // Configure (should be called once, but safe to repeat)
    GoogleSignin.configure({
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual Web Client ID
      offlineAccess: true,
    });

    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (response.data?.idToken) {
      return response.data.idToken;
    }
    throw new Error('No ID token received from Google');
  } catch (error: any) {
    console.error('Google Sign-In native error:', error);
    throw new Error(error.message || 'Google Sign-In failed');
  }
}

async function getGoogleIdTokenWeb(): Promise<string> {
  // For web, we use Google Identity Services (GSI)
  // This requires the GSI script to be loaded in index.html
  return new Promise((resolve, reject) => {
    const w = typeof globalThis !== 'undefined' ? globalThis : ({} as any);
    const google = (w as any).google;
    if (!google?.accounts?.id) {
      reject(new Error('Google Identity Services not loaded. Add GSI script to index.html'));
      return;
    }

    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual Web Client ID
      callback: (response: any) => {
        if (response.credential) {
          resolve(response.credential);
        } else {
          reject(new Error('No credential from Google'));
        }
      },
    });

    // Trigger the One Tap prompt
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback: show the button-based flow
        reject(new Error('Google One Tap not available. Try again.'));
      }
    });
  });
}

// ---- Auth Service ----
export const authService = {
  /**
   * Sign in with Google
   * 1. Get ID token from Google SDK
   * 2. Send to backend for verification
   * 3. Store JWT + user data
   */
  async signInWithGoogle(): Promise<AuthResult> {
    try {
      // Step 1: Get Google ID token
      const idToken = await getGoogleIdToken();

      // Step 2: Send to backend
      const response = await authApi.loginWithGoogle(idToken);

      if (response.success && response.token && response.user) {
        // Step 3: Store token & user
        setAuthToken(response.token);
        const storage = await getStorage();
        await storage.setItem(TOKEN_KEY, response.token);
        await storage.setItem(USER_KEY, JSON.stringify(response.user));

        return {
          success: true,
          user: response.user as AuthUser,
          token: response.token,
        };
      }

      return { success: false, error: 'Login failed' };
    } catch (error: any) {
      console.error('Auth signInWithGoogle error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Sign in as Guest
   */
  async signInAsGuest(): Promise<AuthResult> {
    try {
      const guestUser: AuthUser = {
        id: 'guest', 
        name: 'Khách', 
        role: 'guest',
        email: '',
        avatar: '',
        phone: '',
        location: '',
        loginMethod: 'guest',
        createdAt: new Date().toISOString()
      } as any;
      
      const storage = await getStorage();
      await storage.setItem(TOKEN_KEY, 'guest-token');
      await storage.setItem(USER_KEY, JSON.stringify(guestUser));

      return {
        success: true,
        user: guestUser,
        token: 'guest-token',
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Try to restore session from stored token
   * Called on app start
   */
  async restoreSession(): Promise<AuthResult> {
    try {
      const storage = await getStorage();
      const token = await storage.getItem(TOKEN_KEY);

      if (!token) {
        return { success: false, error: 'No stored token' };
      }

      // Set token and verify with backend
      setAuthToken(token);
      const response = await authApi.getMe();

      if (response.success && response.user) {
        // Update stored user data
        await storage.setItem(USER_KEY, JSON.stringify(response.user));
        return {
          success: true,
          user: response.user as AuthUser,
          token,
        };
      }

      // Token invalid, clean up
      await this.signOut();
      return { success: false, error: 'Session expired' };
    } catch (error: any) {
      // Backend might be down, try cached user
      try {
        const storage = await getStorage();
        const cachedUser = await storage.getItem(USER_KEY);
        const token = await storage.getItem(TOKEN_KEY);
        if (cachedUser && token) {
          setAuthToken(token);
          return {
            success: true,
            user: JSON.parse(cachedUser),
            token,
          };
        }
      } catch {}
      return { success: false, error: error.message };
    }
  },

  /**
   * Sign out: clear stored data
   */
  async signOut(): Promise<void> {
    setAuthToken(null);
    const storage = await getStorage();
    await storage.removeItem(TOKEN_KEY);
    await storage.removeItem(USER_KEY);

    // Also sign out from Google on native
    if (Platform.OS !== 'web') {
      try {
        const { GoogleSignin } = require('@react-native-google-signin/google-signin');
        await GoogleSignin.signOut();
      } catch {}
    }
  },

  /**
   * Get cached user from storage (no network call)
   */
  async getCachedUser(): Promise<AuthUser | null> {
    try {
      const storage = await getStorage();
      const data = await storage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
};

export default authService;
