export { colors } from './colors';
export type { ColorKey } from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  full: 999,
} as const;

export const shadows = {
  soft: {
    shadowColor: '#6B5B7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  card: {
    shadowColor: '#8FA68E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 22,
  xxl: 28,
} as const;

export const REACTIONS = ['❤️', '🥰', '😍', '👏', '🎉', '✨', '🌸', '🧚'] as const;

// Simulador iOS: 127.0.0.1 | Celular físico: IP da máquina na Wi-Fi
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:4000';
