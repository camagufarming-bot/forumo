# Forumo Backend (MVP)

Quick start:
1. `cp .env.example .env` and adjust values.
2. `npm install`
3. Start MongoDB locally or use docker-compose.
4. `npm run dev`

Seed categories: `npm run seed`

Key endpoints:
- `POST /api/auth/register` `POST /api/auth/login`
- `GET /api/products` `POST /api/products` (seller/admin)
- `POST /api/orders` `GET /api/orders/me`
- `POST /api/escrow/intent` `POST /api/escrow/confirm-delivery`
- `POST /api/reviews`

Sockets: join a room with `join(conversationId)` and emit `message` events.
