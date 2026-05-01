# Quest Room — React frontend

Single-page frontend for escape-room quests: browse by genre, book sessions, authenticate (phone / email), manage profile, favorites and orders — plus contacts with Google Maps.

**Live demo:** *not deployed yet — run locally (see below).*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Features

- Quest catalog + genre filtering (`/genre/:genre`)
- Quest page + booking (`/detailed-quest/:id`)
- Auth flows, reset password, email verification
- Profile: favorites, orders, edits, credentials
- Contacts + map (`@vis.gl/react-google-maps`)

## Stack

React 19, TypeScript 5, Vite 6, Tailwind CSS 4, React Router 7, Zustand, React Hook Form + Zod, Axios / `fetch`, Lucide, react-datepicker.

## Backend

Requests are coded against **`http://localhost:3000`** (quests `GET /quests`, `/orders`, auth, favorites). See `src/utils/` and auth forms.

**Public demo caveat:** deploying only this repo does not yield a fully working app unless the backend is reachable from the browser (HTTPS + CORS as needed). Clone the repo and run backend + frontend locally for development.

## Deploy (static SPA)

Nothing “magic” ships with the repo besides **SPA fallback** so client routes (`/profile`, `/detailed-quest/:id`) do not 404 on refresh:

| Host | Notes |
|------|--------|
| **Vercel** | `vercel.json` wires all paths to `index.html`. Root: **`dist`**. Build command: `npm run build`. Set env **`VITE_GOOGLE_MAPS_API_KEY`** for production. |
| **Netlify / Cloudflare Pages** | `public/_redirects` is copied into **`dist`** on build (same SPA rule). Publish directory: **`dist`**, build: `npm run build`. Same env variable in dashboard. |

## Run locally

**Node.js 20+** recommended.

```bash
npm install
cp .env.example .env          # Windows: copy .env.example .env
```

Set `VITE_GOOGLE_MAPS_API_KEY` in `.env` (Google Maps JavaScript API).

```bash
npm run dev       # → http://localhost:5173
npm run build
npm run preview
npm run lint
```

## Repo layout

```
src/components/   # pages, layout, forms, popups
src/store/        # Zustand
src/utils/        # API, cookies / tokens
public/
```

### Optional tooling

SVG → React (SVGR CLI is in devDependencies):

```bash
npx @svgr/cli src/assets/icons/vector-contacts-icon.svg --out-dir src/components/icons
```

---

**On GitHub:** you can fill in the repo **About** description (one line) and **topics** in the repo settings — separate from this file.

## License

Private (`private` in `package.json`).
