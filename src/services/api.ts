// =============================================
// PhuiConnect - API Service
// =============================================
import { Platform } from 'react-native';

// Backend URL based on platform
const getBaseUrl = (): string => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3001'; // Android emulator -> host machine
  }
  return 'http://localhost:3001'; // iOS simulator & Web
};

const BASE_URL = getBaseUrl();

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  token?: string;
  user?: T;
}

async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `API error: ${response.status}`);
  }

  return data;
}

// ---- Auth API ----
export const authApi = {
  /** Send Google ID token to backend, get JWT + user */
  loginWithGoogle(idToken: string) {
    return apiRequest('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  /** Get current user profile (requires JWT) */
  getMe() {
    return apiRequest('/api/auth/me');
  },

  /** Update user profile */
  updateProfile(data: { name?: string; phone?: string; location?: string; avatar?: string }) {
    return apiRequest('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /** Health check */
  healthCheck() {
    return apiRequest('/api/health');
  },
};

export default authApi;
