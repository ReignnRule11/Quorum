import { apiClient } from './api';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

interface AuthResponse {
  access_token?: string;
  token?: string;
  user: { id: string; email: string; role: string };
  success?: boolean;
  message?: string;
}

export const authService = {
  async register(email: string, password: string): Promise<void> {
    try {
      const { data } = await apiClient.post('/auth/register', { email, password });
      if (data.success === false) throw new Error(data.message || 'Registration failed');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  },

  async login(email: string, password: string): Promise<{ user: AuthResponse['user']; token: string }> {
    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
      const token = data.access_token || data.token;
      const user = data.user;
      if (!token || !user) throw new Error(data.message || 'Invalid login response');
      await SecureStore.setItemAsync('authToken', token);
      // Store credentials for biometric login
      if (Platform.OS !== 'web') {
        await SecureStore.setItemAsync('biometricEmail', email);
        await SecureStore.setItemAsync('biometricPassword', password);
      }
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  async getCurrentUser(): Promise<any> {
    try {
      const { data } = await apiClient.get('/auth/me');
      return data.user || data;
    } catch (error) {
      await SecureStore.deleteItemAsync('authToken');
      throw error;
    }
  },

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync('authToken');
    // Optionally clear biometric credentials
    await SecureStore.deleteItemAsync('biometricEmail');
    await SecureStore.deleteItemAsync('biometricPassword');
  },

  async isBiometricAvailable(): Promise<boolean> {
    if (Platform.OS === 'web') return false;
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  },

  async authenticateWithBiometrics(): Promise<boolean> {
    if (Platform.OS === 'web') return false;
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access your account',
      fallbackLabel: 'Use password'
    });
    return result.success;
  },

  async biometricLogin(): Promise<{ user: AuthResponse['user']; token: string } | null> {
    const email = await SecureStore.getItemAsync('biometricEmail');
    const password = await SecureStore.getItemAsync('biometricPassword');
    if (!email || !password) return null;
    const authenticated = await this.authenticateWithBiometrics();
    if (!authenticated) return null;
    return this.login(email, password);
  }
};
