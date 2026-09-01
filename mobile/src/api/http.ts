import axios, { AxiosError, isAxiosError } from 'axios';
import { API_URL } from '../theme';
import { getToken, clearSession } from '../storage/authStorage';
import { ApiError } from './errors';

export const http = axios.create({
  baseURL: API_URL,
  timeout: 60_000,
  headers: { 'Content-Type': 'application/json' },
});

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(callback: () => void) {
  onUnauthorized = callback;
}

http.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ error?: string }>) => {
    if (error.response?.status === 401) {
      await clearSession();
      onUnauthorized?.();
    }

    if (isAxiosError(error)) {
      const message =
        error.response?.data?.error ||
        (error.code === 'ECONNABORTED' ? 'Tempo de conexão esgotado' : null) ||
        (error.message === 'Network Error'
          ? `Sem conexão com o servidor (${API_URL})`
          : error.message);

      throw new ApiError(message || 'Erro na requisição', error.response?.status);
    }

    throw new ApiError('Erro inesperado na requisição');
  }
);
