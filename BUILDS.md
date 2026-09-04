# Comandos EAS Build — Festa da Olivia

> Todos os comandos devem ser rodados dentro de `/Users/nathalialayane/Desktop/Festa/mobile`
> Sempre rodar **fora do sandbox** (permissão `all` no Cursor) para o EAS conseguir fazer `git config`.

---

## ✅ Builds

### iOS — TestFlight (perfil `production`)
```bash
cd /Users/nathalialayane/Desktop/Festa/mobile
eas build --platform ios --profile production --non-interactive --no-wait
```
> 🔗 Último build: https://expo.dev/accounts/igor-lds/projects/festa-da-olivia/builds/38ad6781-4754-4688-b91d-95955160be64

### Android — APK (perfil `preview`, usa `credentials.json` local)
```bash
cd /Users/nathalialayane/Desktop/Festa/mobile
eas build --platform android --profile preview --non-interactive --no-wait
```

### Android — AAB / Google Play (perfil `internal`, usa `credentials.json` local)
```bash
cd /Users/nathalialayane/Desktop/Festa/mobile
eas build --platform android --profile internal --non-interactive --no-wait
```
> ⚠️ O perfil `production` Android **não funciona** — não tem keystore remoto. Usar sempre `internal` para AAB.

---

## ✅ Ver status dos builds
```bash
cd /Users/nathalialayane/Desktop/Festa/mobile
eas build:list --limit 6 --non-interactive
```

---

## ✅ Deploy Backend (Hostinger)

```bash
cd /Users/nathalialayane/Desktop/Festa/backend
bash deploy.sh
```

---

## ✅ Git — Commit e Push

```bash
cd /Users/nathalialayane/Desktop/Festa
git add -A
git commit -m "mensagem"
git push origin impl-expo
```

---

## ⚠️ Notas importantes

| Ponto | Detalhe |
|---|---|
| `credentials.json` | Só tem credencial **Android**. iOS usa credenciais remotas do Expo (perfil `production`). |
| Perfil `preview` iOS | **Não funciona** — não tem credencial local para iOS. Sempre usar `production` para iOS. |
| `--no-wait` | O comando retorna imediatamente após submeter; acompanhe em [expo.dev](https://expo.dev/accounts/igor-lds/projects/festa-da-olivia/builds). |
| `EAS_SKIP_AUTO_FINGERPRINT=1` | Opcional para acelerar se o fingerprint estiver demorando: `EAS_SKIP_AUTO_FINGERPRINT=1 eas build ...` |
