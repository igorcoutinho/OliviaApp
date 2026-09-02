import { apiClient } from './client';
import { createFormDataWithFile } from './formData';
import type { ProfileResponse, User } from '../types';

export const profileApi = {
  get: () => apiClient<ProfileResponse>('/api/profile'),

  uploadAvatar: async (uri: string, mimeType = 'image/jpeg', fileName?: string) => {
    const formData = await createFormDataWithFile(
      {},
      'avatar',
      {
        uri,
        mimeType,
        fileName: fileName ?? `avatar-${Date.now()}.jpg`,
      },
    );

    return apiClient<{ message: string; user: User }>('/api/profile/avatar', {
      method: 'POST',
      data: formData,
    });
  },

  removeAvatar: () =>
    apiClient<{ message: string; user: User }>('/api/profile/avatar', {
      method: 'DELETE',
    }),
};
