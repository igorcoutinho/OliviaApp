import { apiRequest, http, setOnUnauthorized } from './http';
import { ApiError } from './errors';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
};

export { ApiError } from './errors';
export { http, setOnUnauthorized } from './http';

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', data } = options;
  return apiRequest<T>(path, { method, data });
}

export async function checkHealth(): Promise<boolean> {
  try {
    await apiRequest('/api/health', { timeout: 5_000 });
    return true;
  } catch {
    return false;
  }
}
