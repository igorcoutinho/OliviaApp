import sha256 from 'js-sha256';
import { APP_SECRET } from '../config/env';

export async function appSignatureHeaders(method: string, path: string): Promise<Record<string, string>> {
  if (!APP_SECRET) return {};

  const timestamp = String(Date.now());
  const signature = sha256.hmac(APP_SECRET, `${timestamp}.${method.toUpperCase()}.${path}`);

  return {
    'X-Timestamp': timestamp,
    'X-Signature': signature,
  };
}
