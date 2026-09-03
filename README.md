# Festa da Olivia — OliviaApp (mobile)

App para convidados da festa: cadastro, feed de fotos com reações e vídeos privados.

A API fica no repositório **[OliviaBff](https://github.com/igorcoutinho/OliviaBff)**. Infra local (MySQL + MinIO) também está lá.

## Desenvolvimento

```bash
cd mobile
npm install
cp envs/local.env.example envs/local.env
npm run start:local    # API local
# npm run start:prd    # API https://api.minhasfotos.net
```

Metro em **http://localhost:8082**.

## Build e TestFlight

O passo a passo completo (EAS, Apple, secrets, submit) está em:

**[mobile/README.md](./mobile/README.md)**

Resumo:

```bash
cd mobile
npm run build:ios     # gera build iOS apontando para produção
npm run submit:ios    # envia o último build ao TestFlight
```

## API local

No repo OliviaBff:

```bash
docker compose up -d
cp .env.example .env
npm install
npm start
```

API em **http://localhost:4000**.
