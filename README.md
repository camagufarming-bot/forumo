# Forumo Web (React + Vite + Tailwind + RTK)

A clean, production-ready web frontend wired to your Node/Express backend.

## Quick start
```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL
npm run dev
```

## Expected backend endpoints
- `POST /api/auth/register` → { user, token }
- `POST /api/auth/login` → { user, token }
- `GET /api/auth/me` → user
- `GET /api/products` → array or { items: [] }
- `GET /api/products/:id` → product
- `POST /api/products` → product (auth: seller)
- `POST /api/orders` → order
- `GET /api/orders/my` → my orders

## Notes
- Minimal UI with Tailwind, easy to re-skin.
- JWT is stored in localStorage and attached via axios interceptor.
- Cart is persisted to localStorage.
- Protected routes gate Checkout/Orders/Profile/Add Product.
