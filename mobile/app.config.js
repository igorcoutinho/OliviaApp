const fs = require('fs');
const path = require('path');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Arquivo de ambiente não encontrado: ${filePath}\n` +
        `Copie o .example correspondente em envs/ e preencha os valores.`,
    );
  }

  const result = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    result[key] = value;
  }
  return result;
}

const APP_ENV = process.env.APP_ENV === 'prd' ? 'prd' : 'local';
const fileEnv = loadEnvFile(path.join(__dirname, 'envs', `${APP_ENV}.env`));

const apiUrl = fileEnv.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:4000';
const appSecret = fileEnv.EXPO_PUBLIC_APP_SECRET || '';

process.env.EXPO_PUBLIC_API_URL = apiUrl;
process.env.EXPO_PUBLIC_APP_SECRET = appSecret;
process.env.EXPO_PUBLIC_APP_ENV = APP_ENV;

const appJson = require('./app.json');

module.exports = {
  expo: {
    ...appJson.expo,
    extra: {
      ...(appJson.expo.extra || {}),
      appEnv: APP_ENV,
      apiUrl,
      appSecret,
    },
  },
};
