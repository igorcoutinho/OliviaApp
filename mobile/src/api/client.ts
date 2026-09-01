import type { AxiosRequestConfig } from 'axios';
import { http } from './http';
import { ApiError } from './errors';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
};

export { ApiError } from './errors';
export { http, setOnUnauthorized } from './http';

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', data } = options;

  const config: AxiosRequestConfig = { url: path, method, data };
  const response = await http.request<T>(config);
  return response.data;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await http.get('/api/health', { timeout: 5_000 });
    return response.status === 200;
  } catch {
    return false;
  }
}
