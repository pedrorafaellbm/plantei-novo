# Vida Verde Backend API

API REST com Node.js + Express + Sequelize para autenticacao e futuras funcionalidades administrativas.

## Requisitos

- Node.js 20+
- PostgreSQL (Neon ou local)

## Setup

1. Copie `.env.example` para `.env` e preencha:
   - `DATABASE_URL` (ou `BASE_URL_DB`)
   - `JWT_SECRET`
   - `PORT`
   - `CORS_ORIGIN`
   - `CLOUD_NAME`
   - `API_KEY`
   - `API_SECRET`
2. Instale dependencias:
   - `npm install`
3. Rode seed:
   - `npm run db:seed`
4. Suba a API:
   - `npm run dev`

Base URL: `http://localhost:3000/api`

## Deploy no Render (backend)

Crie um `Web Service` no Render apontando para este repositorio e use:

- Build Command: `npm install`
- Start Command: `npm start`

Defina as variaveis de ambiente:

- `NODE_ENV=production`
- `DATABASE_URL=postgresql://...`
- `JWT_SECRET=...`
- `CORS_ORIGIN=https://seu-front.vercel.app` (ou lista separada por virgula)
- `DB_SSL=true` (recomendado em producao)
- `CLOUD_NAME=...`
- `API_KEY=...`
- `API_SECRET=...`

Health Check Path no Render:

- `/api`

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
  "id": "uuid",
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
    "id": "uuid",
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
    "id": "uuid",
    "nome": "Maria Silva",
    "email": "maria@exemplo.com",
    "role": "customer"
  }
}
```

### GET `/api/products`

Lista os produtos com `imageUrl`.

### POST `/api/admin/products`

Protegida para `admin`.

Formato: `multipart/form-data`

- `nome` (string)
- `descricao` (string, opcional)
- `preco` (number)
- `estoque` (number)
- `image` (file, opcional)

Se `image` for enviada, a API faz upload no Cloudinary e salva `secure_url` em `imageUrl`.
