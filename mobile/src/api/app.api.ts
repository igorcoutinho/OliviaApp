import { http } from './http';

export type VersionCheckResult = {
  allowed: boolean;
  currentVersion: string;
  requiredVersion: string | null;
  title: string | null;
  message: string | null;
  contactName: string | null;
  contactInfo: string | null;
  storeUrl: string | null;
};

export const appApi = {
  checkVersion: (version: string, platform: 'ios' | 'android' | 'all') =>
    http.get<VersionCheckResult>(
      `/api/app/version-check?version=${encodeURIComponent(version)}&platform=${platform}`,
    ),
};
