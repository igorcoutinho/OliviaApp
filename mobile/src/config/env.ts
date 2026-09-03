import Constants from 'expo-constants';

type AppExtra = {
  appEnv?: 'local' | 'prd';
  apiUrl?: string;
  appSecret?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as AppExtra;

export const APP_ENV = extra.appEnv ?? 'local';
export const API_URL =
  extra.apiUrl ||
  process.env.EXPO_PUBLIC_API_URL ||
  'http://127.0.0.1:4000';
export const APP_SECRET =
  extra.appSecret ||
  process.env.EXPO_PUBLIC_APP_SECRET ||
  '';
