import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { apiClient, setAuthToken } from '../services/api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      setAuthToken(token);
      try {
        const res = await apiClient.get('/auth/me');
        setUser(res.data);
      } catch {
        await SecureStore.deleteItemAsync('authToken');
      }
    }
    setIsLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    const res = await apiClient.post('/auth/login', { email, password });
    const { access_token, user } = res.data;
    await SecureStore.setItemAsync('authToken', access_token);
    setAuthToken(access_token);
    setUser(user);
  };

  const signUp = async (email: string, password: string) => {
    await apiClient.post('/auth/register', { email, password });
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
