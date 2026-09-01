import { apiClient } from './client';
import { saveSession, clearSession } from '../storage/authStorage';
import type { AuthResponse, User } from '../types';

export const authApi = {
  register: async (fullName: string, password: string): Promise<AuthResponse> => {
    const data = await apiClient<AuthResponse>('/api/auth/register', {
      method: 'POST',
      data: { fullName, password },
    });
    await saveSession(data.token, data.user);
    return data;
  },

  login: async (username: string, password: string): Promise<AuthResponse> => {
    const data = await apiClient<AuthResponse>('/api/auth/login', {
      method: 'POST',
      data: { username, password },
    });
    await saveSession(data.token, data.user);
    return data;
  },

  me: () => apiClient<User>('/api/auth/me'),

  logout: async () => {
    await clearSession();
  },
};
