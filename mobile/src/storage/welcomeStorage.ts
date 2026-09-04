import * as SecureStore from 'expo-secure-store';
import { APP_ENV } from '../config/env';

const WELCOME_SEEN_KEY = `welcome_modal_seen_${APP_ENV}`;

export async function getWelcomeSeen(): Promise<boolean> {
  const value = await SecureStore.getItemAsync(WELCOME_SEEN_KEY);
  return value === '1';
}

export async function setWelcomeSeen(): Promise<void> {
  await SecureStore.setItemAsync(WELCOME_SEEN_KEY, '1');
}

export async function clearWelcomeSeen(): Promise<void> {
  await SecureStore.deleteItemAsync(WELCOME_SEEN_KEY);
}
