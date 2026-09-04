import { apiClient } from './client';
import type { PhotoFeedItem } from '../types';
import { compressImage } from '../lib/compressImage';

export interface MediaFile {
  uri: string;
  mimeType?: string | null;
  fileName?: string | null;
}

export interface PhotoUploadParams {
  photos: MediaFile[];
  video?: MediaFile | null;
  caption: string;
}

export interface FeedPage {
  items: PhotoFeedItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export const photosApi = {
  getFeed: async (cursor?: string, limit = 20) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (cursor) params.set('cursor', cursor);
    const raw = await apiClient<FeedPage | PhotoFeedItem[]>(`/api/photos/feed?${params.toString()}`);
    if (Array.isArray(raw)) {
      return { items: raw, nextCursor: null, hasMore: false } as FeedPage;
    }
    return raw;
  },

  upload: async ({ photos, video, caption }: PhotoUploadParams) => {
    const formData = new FormData();
    formData.append('caption', caption);

    for (let i = 0; i < photos.length; i++) {
      const p = photos[i]!;
      const compressed = await compressImage(p.uri, 'photo');
      const response = await fetch(compressed.uri);
      let blob = await response.blob();
      if (blob.type !== compressed.mimeType) {
        blob = new Blob([blob], { type: compressed.mimeType });
      }
      formData.append('photos', blob, compressed.fileName);
    }

    if (video) {
      const response = await fetch(video.uri);
      let blob = await response.blob();
      const mimeType = video.mimeType || 'video/mp4';
      if (blob.type !== mimeType) blob = new Blob([blob], { type: mimeType });
      formData.append('video', blob, video.fileName || `video-${Date.now()}.mp4`);
    }

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

  delete: (photoId: string) =>
    apiClient<{ message: string }>(`/api/photos/${photoId}`, { method: 'DELETE' }),
};
