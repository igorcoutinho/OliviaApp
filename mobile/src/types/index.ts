export interface User {
  id: string;
  full_name: string;
  username: string;
  avatar_url?: string | null;
  created_at?: string;
}

export interface ProfileStats {
  photos: number;
  videos: number;
}

export interface ProfileResponse {
  user: User;
  stats: ProfileStats;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface PhotoMediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface PhotoFeedItem {
  id: string;
  caption: string;
  url: string;
  media: PhotoMediaItem[];
  created_at: string;
  author: { id?: string; full_name: string; username: string; avatar_url?: string | null };
  isMine?: boolean;
  reactions: { emoji: string; username: string; full_name: string; user_id: string }[];
  myReaction: string | null;
}

export interface VideoItem {
  id: string;
  message: string;
  url: string;
  created_at: string;
}

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Feed: undefined;
  UploadPhoto: undefined;
  RecordVideo: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
