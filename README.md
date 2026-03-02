# Vida Verde Backend API

API REST com Node.js + Express + Prisma para autenticação e futuras funcionalidades administrativas.

## Requisitos

- Node.js 20+
- PostgreSQL (Neon)

## Setup

1. Copie `.env.example` para `.env` e preencha:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `PORT`
   - `CORS_ORIGIN`
2. Instale dependências:
   - `npm install`
3. Gere o client Prisma:
   - `npm run prisma:generate`
4. Rode migrações:
   - `npm run prisma:migrate -- --name init`
5. Rode seed:
   - `npm run prisma:seed`
6. Suba a API:
   - `npm run dev`

Base URL: `http://localhost:3000/api`

## Seed admin

- email: `admin@vidaverde.com`
- senha: `Admin@123`
- role: `admin`

## Endpoints

### POST `/api/auth/register`

Entrada:

```json
{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "senha": "Senha@123",
  "cpf": "12345678901"
}
```

Saida `201`:

```json
{
  "id": "clx...",
  "nome": "Maria Silva",
  "email": "maria@exemplo.com"
}
```

### POST `/api/auth/login`

Entrada:

```json
{
  "email": "maria@exemplo.com",
  "senha": "Senha@123"
}
```

Saida `200`:

```json
{
  "token": "<jwt>",
  "usuario": {
    "id": "clx...",
    "nome": "Maria Silva",
    "email": "maria@exemplo.com",
    "role": "customer"
  }
}
```

### GET `/api/auth/me`

Header:

`Authorization: Bearer <jwt>`

Saida `200`:

```json
{
  "usuario": {
    "id": "clx...",
    "nome": "Maria Silva",
    "email": "maria@exemplo.com",
    "role": "customer"
  }
}
```

## Erros

Formato consistente:

```json
{
  "error": "mensagem"
}
```

## Curl

Registro:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Maria Silva\",\"email\":\"maria@exemplo.com\",\"senha\":\"Senha@123\",\"cpf\":\"12345678901\"}"
```

Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"maria@exemplo.com\",\"senha\":\"Senha@123\"}"
```

Me:

```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <jwt>"
```
