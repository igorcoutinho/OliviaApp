import { apiClient } from './client';
import { createFormDataWithFile } from './formData';
import { compressImage } from '../lib/compressImage';
import type { ProfileResponse, User } from '../types';

export const profileApi = {
  get: () => apiClient<ProfileResponse>('/api/profile'),

  uploadAvatar: async (uri: string, _mimeType = 'image/jpeg', _fileName?: string) => {
    const compressed = await compressImage(uri, 'avatar');
    const formData = await createFormDataWithFile(
      {},
      'avatar',
      {
        uri: compressed.uri,
        mimeType: compressed.mimeType,
        fileName: compressed.fileName,
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
