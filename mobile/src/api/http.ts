import { API_URL } from '../theme';
import { getToken, clearSession } from '../storage/authStorage';
import { appSignatureHeaders } from '../lib/appSignature';
import { ApiError } from './errors';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
  method?: Method;
  data?: unknown;
  timeout?: number;
};

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(callback: () => void) {
  onUnauthorized = callback;
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return null;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', data, timeout = 60_000 } = options;
  const token = await getToken();
  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(await appSignatureHeaders(method, path)),
      },
      body:
        data === undefined
          ? undefined
          : isFormData
            ? (data as FormData)
            : JSON.stringify(data),
      signal: controller.signal,
    });

    const body = await parseBody(response);

    const sessionInvalid =
      response.status === 401 ||
      (response.status === 404 && path === '/api/auth/me');

    if (sessionInvalid) {
      await clearSession();
      onUnauthorized?.();
    }

    if (!response.ok) {
      const message =
        (body as { error?: string } | null)?.error ||
        `Erro na requisição (${response.status})`;
      throw new ApiError(message, response.status);
    }

    return body as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Tempo de conexão esgotado');
      }
      if (error.message === 'Network request failed') {
        throw new ApiError(`Sem conexão com o servidor (${API_URL})`);
      }
      throw new ApiError(error.message);
    }

    throw new ApiError('Erro inesperado na requisição');
  } finally {
    clearTimeout(timer);
  }
}

export const http = {
  get: <T>(path: string, options?: { timeout?: number }) =>
    apiRequest<T>(path, { method: 'GET', ...options }),
  request: <T>(config: { url: string; method?: Method; data?: unknown }) =>
    apiRequest<T>(config.url, { method: config.method, data: config.data }),
};
