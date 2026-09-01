export interface User {
  id: string;
  full_name: string;
  username: string;
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface PhotoFeedItem {
  id: string;
  caption: string;
  url: string;
  created_at: string;
  author: { full_name: string; username: string };
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
