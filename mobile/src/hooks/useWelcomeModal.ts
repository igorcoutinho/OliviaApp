import { useCallback, useEffect, useState } from 'react';
import { getWelcomeSeen, setWelcomeSeen } from '../storage/welcomeStorage';
import { useSession } from '../providers/SessionProvider';

export function useWelcomeModal() {
  const { isAuthenticated } = useSession();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!isAuthenticated) {
      setVisible(false);
      setReady(false);
      return;
    }

    (async () => {
      const seen = await getWelcomeSeen();
      if (cancelled) return;
      setVisible(!seen);
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const dismiss = useCallback(async () => {
    setVisible(false);
    await setWelcomeSeen();
  }, []);

  return { visible: ready && visible, dismiss };
}
