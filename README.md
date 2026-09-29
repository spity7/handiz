# Handiz (public website)

Next.js marketing site: student projects, courses catalog, competitions, arch offices, AI prompts, and the **Handiz Shop** storefront.

Data and admin flows are backed by the **handiz-dashboard** repo (Express API + React admin). Course learning redirects to the LMS when configured.

## Getting started

```bash
cp .env.example .env.local   # or use .env for docker compose
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable                          | Purpose                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`             | Handiz API base (e.g. `http://localhost:5016/api/v1/`) — **required for shop, courses, offices, etc.** |
| `NEXT_PUBLIC_DASHBOARD_URL`       | Sign-in and admin links                                                                                |
| `NEXT_PUBLIC_LMS_URL`             | “My courses” / learn redirects                                                                         |
| `NEXT_PUBLIC_ENABLE_ARCH_OFFICES` | `false` hides Arch Offices nav only                                                                    |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`   | Optional analytics                                                                                     |

The shop does **not** need extra `NEXT_PUBLIC_*` keys. Checkout, shipping fee, and Whish redirects are configured on the **API** (`handiz-dashboard/server/.env`). See `server/SHOP.md` in the dashboard repo.

## Shop (storefront)

| Route                   | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `/shop`                 | Landing + featured products                                           |
| `/shop/products`        | Catalog (search, category, sort, pagination via URL)                  |
| `/shop/products/[slug]` | Product detail, add to cart                                           |
| `/shop/cart`            | Cart (guest: `localStorage`; signed-in: server cart, merged on login) |
| `/shop/checkout`        | Shipping form + Whish Pay (requires login; cookie session with API)   |
| `/shop/orders`          | Order history                                                         |
| `/shop/orders/[id]`     | Order status / payment result                                         |

**Admin:** manage products, categories, and orders in the dashboard under **Shop** (see `README.md` in the handiz-dashboard repo).

## Docker

```bash
cp .env.example .env
docker compose up --build
```

Serves on [http://127.0.0.1:3017](http://127.0.0.1:3017). Build args pass `NEXT_PUBLIC_*` from `.env` (including `NEXT_PUBLIC_ENABLE_ARCH_OFFICES`).

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Development server           |
| `npm run build` | Production build             |
| `npm run start` | Run production build locally |

## Related documentation

In the **handiz-dashboard** repository:

- Root `README.md` — local dev, Docker, env file map
- `server/SHOP.md` — shop API env, webhooks, admin routes
