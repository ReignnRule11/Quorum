import { apiClient } from './api';
import * as SecureStore from 'expo-secure-store';
import { AxiosError } from 'axios';

interface LoginSuccess {
  access_token?: string;
  token?: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
  success?: boolean;
}

interface ErrorResponse {
  success: false;
  message: string;
}

export const authService = {
  async register(email: string, password: string): Promise<void> {
    try {
      const response = await apiClient.post('/auth/register', { email, password });
      const data = response.data;
      if (data.success === false) {
        throw new Error(data.message || 'Registration failed');
      }
      // If backend returns a success message, we're good
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
  },

  async login(email: string, password: string): Promise<{ user: LoginSuccess['user']; token: string }> {
    try {
      const response = await apiClient.post<LoginSuccess>('/auth/login', { email, password });
      const data = response.data;
      
      // Handle possible response shapes
      const token = data.access_token || data.token;
      const user = data.user;
      
      if (!token || !user) {
        throw new Error(data.success === false ? data.message : 'Invalid login response');
      }
      
      await SecureStore.setItemAsync('authToken', token);
      return { user, token };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
  },

  async getCurrentUser(): Promise<any> {
    try {
      const response = await apiClient.get('/auth/me');
      // Backend likely returns { success: true, user: {...} } or just the user object
      if (response.data.success === false) {
        throw new Error(response.data.message);
      }
      return response.data.user || response.data;
    } catch (error) {
      // If token is invalid, remove it
      await SecureStore.deleteItemAsync('authToken');
      throw error;
    }
  },

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync('authToken');
    // Optionally call a backend logout endpoint if needed
  },
};
