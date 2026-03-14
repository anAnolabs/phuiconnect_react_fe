// =============================================
// PhuiConnect - Auth Context
// Global authentication state management
// =============================================
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, AuthUser } from '../services/authService';

// ---- Context Types ----
interface AuthContextType {
  /** Current user (null if not logged in) */
  user: AuthUser | null;
  /** Whether we're checking stored token on startup */
  isLoading: boolean;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Sign in with Google */
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  /** Sign in as Guest */
  signInAsGuest: () => void;
  /** Sign out */
  signOut: () => Promise<void>;
  /** Refresh user data from backend */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---- Provider ----
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    let mounted = true;

    const restore = async () => {
      try {
        const result = await authService.restoreSession();
        if (mounted && result.success && result.user) {
          setUser(result.user);
        }
      } catch (err) {
        console.log('Session restore failed:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    restore();
    return () => { mounted = false; };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await authService.signInWithGoogle();
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  const signInAsGuest = useCallback(async () => {
    const result = await authService.signInAsGuest();
    if (result.success && result.user) {
      setUser(result.user);
    }
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const result = await authService.restoreSession();
    if (result.success && result.user) {
      setUser(result.user);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signInWithGoogle,
    signInAsGuest,
    signOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ---- Hook ----
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
