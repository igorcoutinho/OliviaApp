import { apiClient } from './client';
import { createFormDataWithFile } from './formData';
import type { PhotoFeedItem } from '../types';

export interface PhotoUploadParams {
  uri: string;
  caption: string;
  mimeType?: string | null;
  fileName?: string | null;
}

export const photosApi = {
  getFeed: () => apiClient<PhotoFeedItem[]>('/api/photos/feed'),

  upload: async (params: PhotoUploadParams) => {
    const formData = await createFormDataWithFile(
      { caption: params.caption },
      'photo',
      {
        uri: params.uri,
        mimeType: params.mimeType || 'image/jpeg',
        fileName: params.fileName || `photo-${Date.now()}.jpg`,
      },
    );

    return apiClient<{ message: string }>('/api/photos', {
      method: 'POST',
      data: formData,
    });
  },

  react: (photoId: string, emoji: string) =>
    apiClient(`/api/photos/${photoId}/react`, {
      method: 'POST',
      data: { emoji },
    }),

  removeReaction: (photoId: string) =>
    apiClient(`/api/photos/${photoId}/react`, { method: 'DELETE' }),
};
