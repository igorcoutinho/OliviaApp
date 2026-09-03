export { colors } from './colors';
export type { ColorKey } from './colors';
export { fonts, typography } from './typography';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  screen: 20,
  screenLg: 24,
} as const;

export const radius = {
  sm: 12,
  md: 20,
  lg: 24,
  xl: 32,
  pill: 100,
  full: 999,
} as const;

export const layout = {
  tabBarHeight: 56,
  statusBarHeight: 44,
} as const;

export const shadows = {
  soft: {
    shadowColor: '#6A4F9E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  card: {
    shadowColor: '#4A5D3E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  gradientButton: {
    shadowColor: '#4A5C3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientButtonLavender: {
    shadowColor: '#7D4F9E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  reactionSheet: {
    shadowColor: '#708063',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  reactionCell: {
    shadowColor: '#708063',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  reactedButton: {
    shadowColor: '#6A4F9E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
} as const;

export const gradients = {
  button: {
    colors: ['#8FAB85', '#7D9C75', '#59734D'] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  buttonLavender: {
    colors: ['#C7B0E5', '#B29EDB', '#8C70BF'] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
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

export const REACTIONS = ['❤️', '🥰', '😍', '😂', '😊', '👏', '👀', '🎉', '✨', '🌸', '🧚', '🫶'] as const;

export { API_URL } from '../config/env';
