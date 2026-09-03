import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { getStoredUser, getToken, saveSession, clearSession } from '../storage/authStorage';
import { authApi, setOnUnauthorized } from '../api';
import { queryClient } from '../lib/queryClient';
import type { User } from '../types';

interface SessionContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = useCallback(async () => {
    await clearSession();
    queryClient.clear();
    setUser(null);
  }, []);

  useEffect(() => {
    setOnUnauthorized(() => {
      queryClient.clear();
      setUser(null);
    });

    let cancelled = false;

    (async () => {
      try {
        const stored = await getStoredUser();
        const token = await getToken();

        if (!stored || !token) {
          if (!cancelled) setUser(null);
          return;
        }

        const me = await authApi.me();
        if (cancelled) return;

        await saveSession(token, me);
        setUser(me);
      } catch {
        await clearSession();
        queryClient.clear();
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        setUser,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
