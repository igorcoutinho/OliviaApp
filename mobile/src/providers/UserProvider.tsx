import { createContext, useContext, ReactNode } from 'react';
import type { User } from '../types';

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  user: User;
  children: ReactNode;
}

export function UserProvider({ user, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): User {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error('useUser must be used within UserProvider (área autenticada)');
  }
  return user;
}
