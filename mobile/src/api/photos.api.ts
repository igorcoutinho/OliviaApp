import { apiClient } from './client';
import type { PhotoFeedItem } from '../types';

export interface PhotoUploadParams {
  uri: string;
  caption: string;
  mimeType?: string | null;
  fileName?: string | null;
}

function buildPhotoFormData({ uri, caption, mimeType, fileName }: PhotoUploadParams) {
  const formData = new FormData();
  formData.append('caption', caption);
  formData.append('photo', {
    uri,
    type: mimeType || 'image/jpeg',
    name: fileName || `photo-${Date.now()}.jpg`,
  } as unknown as Blob);
  return formData;
}

export const photosApi = {
  getFeed: () => apiClient<PhotoFeedItem[]>('/api/photos/feed'),

  upload: (params: PhotoUploadParams) =>
    apiClient<{ message: string }>('/api/photos', {
      method: 'POST',
      data: buildPhotoFormData(params),
    }),

  react: (photoId: string, emoji: string) =>
    apiClient(`/api/photos/${photoId}/react`, {
      method: 'POST',
      data: { emoji },
    }),

  removeReaction: (photoId: string) =>
    apiClient(`/api/photos/${photoId}/react`, { method: 'DELETE' }),
};
