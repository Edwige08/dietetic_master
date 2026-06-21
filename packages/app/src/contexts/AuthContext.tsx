'use client';

import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from '@/lib/auth';

type UserProfile = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
};

type AuthContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      const accessToken = window.localStorage.getItem('access_token');

      if (!accessToken) {
        if (!isMounted) return;
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (!isMounted) return;
        setUser(currentUser);
        setIsAuthenticated(true);
      } catch {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('refresh_token');
        if (!isMounted) return;
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const handleStorage = () => {
      const accessToken = window.localStorage.getItem('access_token');
      if (!accessToken) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    bootstrapAuth();
    window.addEventListener('storage', handleStorage);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  async function login(email: string, password: string) {
    await loginRequest(email, password);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(true);
  }

  async function logout() {
    await logoutRequest();
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}