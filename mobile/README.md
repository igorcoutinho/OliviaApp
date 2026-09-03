# Festa da Olivia — Mobile

App Expo (SDK 57) consumindo a API **OliviaBff**.

| Item | Valor |
|------|--------|
| Bundle ID (iOS/Android) | `com.igorcoutinho.festaolivia` |
| App Store Connect ID | `6808076977` |
| EAS project | `2a018683-6cec-4601-aa11-84d5c61aeecb` |
| Expo owner / slug | `igor-lds` / `festa-da-olivia` |
| API de produção | `https://api.minhasfotos.net` |

## Desenvolvimento local

```bash
cd mobile
npm install
cp envs/local.env.example envs/local.env   # se ainda não existir
cp envs/prd.env.example envs/prd.env       # se for testar contra a API deployada

# API local (precisa do backend + MySQL no Docker)
npm run start:local

# API de produção
npm run start:prd
```

Ambiente é escolhido por `APP_ENV` via `app.config.js` (lê `envs/local.env` ou `envs/prd.env`).

Metro: `http://localhost:8082`.

## Pré-requisitos de build (EAS / TestFlight)

1. Conta Expo logada:

```bash
npm install -g eas-cli
eas login
eas whoami   # deve ser igor-lds (ou conta com acesso ao projeto)
```

2. Conta Apple com acesso ao app no App Store Connect (`6808076977`).

3. Secret de produção no EAS (assinatura do app):

```bash
eas env:create \
  --name EXPO_PUBLIC_APP_SECRET \
  --value 'SEU_APP_SECRET_IGUAL_AO_BACKEND' \
  --environment production \
  --visibility sensitive \
  --type string
```

O profile `production` no `eas.json` já define:

- `APP_ENV=prd`
- `EXPO_PUBLIC_API_URL=https://api.minhasfotos.net`

4. Dependências alinhadas ao SDK (se o doctor reclamar):

```bash
npx expo install --fix
npx expo-doctor
```

## Gerar build iOS (produção → TestFlight)

```bash
cd mobile
npm run build:ios
# equivalente: APP_ENV=prd eas build --platform ios --profile production
```

Na primeira vez o EAS pede login Apple para gerar certificados/provisioning. Use a conta do App Store Connect.

Acompanhe o build em: [expo.dev](https://expo.dev) → projeto **festa-da-olivia** → Builds.

## Enviar para o TestFlight

Quando o build iOS terminar com sucesso:

```bash
cd mobile
npm run submit:ios
# equivalente: eas submit --platform ios --profile production --latest
```

O `eas.json` já aponta `ascAppId: 6808076977`. Depois do submit, o build aparece no App Store Connect → TestFlight (pode levar alguns minutos de processamento da Apple).

## Android (APK / Play)

```bash
# APK interno (preview)
eas build --platform android --profile preview

# AAB produção
eas build --platform android --profile production
```

## Scripts úteis

| Script | O que faz |
|--------|-----------|
| `npm run start:local` | Expo + API local |
| `npm run start:prd` | Expo + API produção |
| `npm run build:ios` | EAS build iOS produção |
| `npm run submit:ios` | Envia o último build iOS ao TestFlight |
| `npm run fix` | Alinha versões nativas ao SDK 57 |

## Ícone e splash

Gerados a partir de `assets/olivia.png` (foto da home):

- `assets/icon.png` (1024×1024)
- `assets/splash-icon.png`
- `assets/android-icon-foreground.png`

## Troubleshooting

**Build Xcode falha com `EXPromiseResolveBlock` / `EXFatal`**  
Pacotes nativos desatualizados. Rode `npx expo install --fix` e rebuild.

**App abre logado com usuário “fantasma” ao trocar local ↔ prd**  
Sessão é separada por `APP_ENV`. No boot o app valida `/api/auth/me` e desloga se o usuário não existir.

**Perfil / SQL syntax no MySQL**  
Backend precisa do conversor de `$1` → `?` em `OliviaBff` (`src/db.js`). Redeploy da API se ainda estiver a versão antiga.
