import { apiClient } from './client';
import type { VideoItem } from '../types';

export const videosApi = {
  getMine: () => apiClient<VideoItem[]>('/api/videos/mine'),

  upload: (uri: string, message: string) => {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('video', {
      uri,
      type: 'video/mp4',
      name: `video-${Date.now()}.mp4`,
    } as unknown as Blob);

    return apiClient<{ message: string }>('/api/videos', {
      method: 'POST',
      data: formData,
    });
  },
};
