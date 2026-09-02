import { apiClient } from './client';
import { createFormDataWithFile } from './formData';
import type { VideoItem } from '../types';

export const videosApi = {
  getMine: () => apiClient<VideoItem[]>('/api/videos/mine'),

  upload: async (uri: string, message: string) => {
    const formData = await createFormDataWithFile(
      { message },
      'video',
      {
        uri,
        mimeType: 'video/mp4',
        fileName: `video-${Date.now()}.mp4`,
      },
    );

    return apiClient<{ message: string }>('/api/videos', {
      method: 'POST',
      data: formData,
    });
  },
};
