import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Platform, type AppStateStatus } from 'react-native';
import Constants from 'expo-constants';
import { appApi, type VersionCheckResult } from '../api/app.api';

type VersionGateState = {
  checking: boolean;
  initialChecking: boolean;
  blocked: boolean;
  info: VersionCheckResult | null;
  error: string | null;
  recheck: () => void;
};

function currentAppVersion(): string {
  return (
    Constants.expoConfig?.version ||
    Constants.nativeAppVersion ||
    '0.0.0'
  );
}

function currentPlatform(): 'ios' | 'android' | 'all' {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  return 'all';
}

export function useAppVersionGate(options?: {
  sessionKey?: string;
}): VersionGateState {
  const sessionKey = options?.sessionKey ?? 'guest';
  const [checking, setChecking] = useState(true);
  const [initialChecking, setInitialChecking] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [info, setInfo] = useState<VersionCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const hasCompletedInitial = useRef(false);
  const requestId = useRef(0);

  const recheck = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    const id = ++requestId.current;
    setChecking(true);
    setError(null);

    (async () => {
      try {
        const result = await appApi.checkVersion(currentAppVersion(), currentPlatform());
        if (id !== requestId.current) return;
        setInfo(result);
        setBlocked(!result.allowed);
      } catch (err) {
        if (id !== requestId.current) return;
        setError(err instanceof Error ? err.message : 'Não foi possível validar a versão');
      } finally {
        if (id !== requestId.current) return;
        setChecking(false);
        if (!hasCompletedInitial.current) {
          hasCompletedInitial.current = true;
          setInitialChecking(false);
        }
      }
    })();
  }, [tick, sessionKey]);

  useEffect(() => {
    const onChange = (next: AppStateStatus) => {
      if (next === 'active') recheck();
    };

    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, [recheck]);

  return { checking, initialChecking, blocked, info, error, recheck };
}
