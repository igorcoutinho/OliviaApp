# Festa da Olivia — Jardim Encantado 🌸

App para convidados da festa de 1 ano: cadastro, feed de fotos com reações, e vídeos privados para entregar à Olivia aos 10 anos.

## Infraestrutura (Docker)

```bash
docker compose up -d
```

Sobe:
- **PostgreSQL** → `localhost:5432` (user: `olivia`, senha: `olivia123`, db: `festa_olivia`)
- **MinIO** (bucket S3-compatible) → API: `localhost:9000`, Console: `localhost:9001` (user: `minioadmin`, senha: `minioadmin123`)

## Backend

```bash
cd backend
cp .env.example .env
npm install
npm start
```

Roda em **http://localhost:4000**

## Mobile

```bash
cd mobile
npm install
cp .env.example .env
# Edite EXPO_PUBLIC_API_URL com o IP do seu Mac (porta 4000)
npm start
```

Metro bundler em **http://localhost:8082** (porta padrão 8081 fica livre)

## Funcionalidades

- **Cadastro**: nome completo + senha → gera `@usuario` automaticamente
- **Login**: usuário + senha
- **Feed**: fotos da festa com reações (❤️ 🥰 😍 👏 🎉 ✨ 🌸 🧚)
- **Vídeos**: privados, visíveis só para quem gravou
- **Storage**: MinIO local (fácil migrar para S3 depois)

## Migrar para S3 (depois)

No `.env` do backend, troque:
```
MINIO_ENDPOINT=s3.amazonaws.com
MINIO_PORT=443
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=sua-access-key
MINIO_SECRET_KEY=sua-secret-key
MINIO_BUCKET=seu-bucket
```

## Build APK / TestFlight

```bash
cd mobile
eas build -p android --profile preview   # APK
eas build -p ios --profile preview       # TestFlight
```
