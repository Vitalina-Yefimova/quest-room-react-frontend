# Quest Room — React frontend

React + TypeScript app for escape-room quests: browse by genre, book sessions, sign in (phone / email), manage profile, favorites and orders, and a contacts page with Google Maps. Client-side routing (React Router).

**Source:** [github.com/Vitalina-Yefimova/quest-room-react-frontend](https://github.com/Vitalina-Yefimova/quest-room-react-frontend) · **Live demo:** [quest-room-react-frontend-vitalina-yefimova.vercel.app](https://quest-room-react-frontend-vitalina-yefimova.vercel.app/)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Features

- Quest catalog + genre filtering (`/genre/:genre`)
- Quest page + booking (`/detailed-quest/:id`)
- Auth, password reset, email verification
- Profile: favorites, orders, profile / password edits
- Contacts + map (`@vis.gl/react-google-maps`)

## Stack

React 19 · TypeScript 5 · Vite 6 · Tailwind CSS 4 · React Router 7 · Zustand · React Hook Form + Zod · `fetch` · Lucide · react-datepicker

---

## Environment

Client env is read via **`import.meta.env`** and checked in [`src/utils/config.ts`](src/utils/config.ts) with Zod **`schema.parse()`**. [`main.tsx`](src/main.tsx) imports **`VITE_GOOGLE_MAPS_API_KEY`** from that module for `APIProvider`; API calls import **`API_BASE_URL`** there too.

Copy [`.env.example`](.env.example) to `.env`, or define the keys on **Vercel → Settings → Environment Variables** (applied at **`npm run build`**).

| Variable                   | Notes                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`        | Full `http(s)` URL, no trailing slash ([deployed API](https://quest-room-api-git-master-vitalina-yefimova.vercel.app) matches `.env.example`). |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key (secret — not committed in `.env`).                                                                             |

---

## Backend / API (separate repo)

| This repo (React UI) | Backend API                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| SPA only             | [**Vitalina-Yefimova/quest-room-api**](https://github.com/Vitalina-Yefimova/quest-room-api) — NestJS: users, quests, orders, `/auth`, etc. |

**Deployed API:** [https://quest-room-api-git-master-vitalina-yefimova.vercel.app](https://quest-room-api-git-master-vitalina-yefimova.vercel.app) — set **`VITE_API_BASE_URL`** to this URL on the frontend host for production demos.

REST calls originate in `src/utils/`, auth forms, and profile sections — they use the validated **`API_BASE_URL`**.

### Cross-origin: CORS and `credentials: include`

This app is **not** self-contained: deployed UI and deployed API live on **different origins** (e.g. two Vercel URLs). Several `fetch` calls use **`credentials: "include"`** so cookies/session work where the backend expects them.

**Known limitation:** the SPA cannot configure CORS. The [**quest-room-api**](https://github.com/Vitalina-Yefimova/quest-room-api) Nest app must expose CORS appropriately, for credentialed requests typically:

| Requirement                                                                                      | Purpose                                                     |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `Access-Control-Allow-Origin` set to the **exact** frontend URL (not `*`) when using credentials | Browsers refuse credentialed responses with wildcard origin |
| `Access-Control-Allow-Credentials: true`                                                         | Allow cookies / `Authorization` in cross-origin mode        |
| `Access-Control-Allow-Methods` / `Allow-Headers`                                                 | Match the methods and headers your routes use               |

If authentication relies on **`Set-Cookie`**, cookies used cross-site generally need **`SameSite=None`** and **`Secure`** (HTTPS on both ends). JWT-only flows may avoid cookies but still need the CORS rows above unless you switch to headers-only same-site patterns.

**Local dev:** `localhost:5173` (Vite) and `localhost:3000` (API) are separate origins unless you put a **`vite`-proxy** to the API or share one hostname.

Until the backend exposes that policy against your real frontend origin, **sessions or cookie-based flows can fail silently** in production even when `VITE_*` URL is correct.

---

## Deploy (static hosting + SPA routing)

Build: `npm run build` → **`dist`**. SPA fallback avoids **404** on refresh for deep routes:

| Host                           | Notes                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Vercel**                     | `vercel.json`. Set **`VITE_API_BASE_URL`**, **`VITE_GOOGLE_MAPS_API_KEY`**, **`npm run build`**, publish **`dist`**. |
| **Netlify / Cloudflare Pages** | `public/_redirects`. Same **`dist`**, env vars, and maps key in the dashboard.                                       |

## Run locally

**Node.js 20+**.

```bash
npm install
cp .env.example .env          # Windows: copy .env.example .env
# Edit .env — both variables are mandatory.
```

```bash
npm run dev       # dev server (default http://localhost:5173 )
npm run build
npm run preview
npm run lint
```

## Repo layout

```
src/main.tsx           # imports ./utils/config for Google Maps Provider
src/utils/config.ts    # validated VITE_* (throws if invalid)
src/utils/             # API helpers, hooks
src/components/
src/store/
public/
```

### Optional: SVG → React

```bash
npx @svgr/cli src/assets/icons/vector-contacts-icon.svg --out-dir src/components/icons
```

---

On GitHub you can set the repo **About** blurb and **topics** (not stored in this file).

## License & `private` (npm)

No open-source license file is bundled here — treat as personal / portfolio usage.

[`package.json`](package.json) contains **`"private": true`** so this **app cannot be published to the npm registry** by mistake (`npm publish` is blocked). It does **not** control whether the GitHub repository is public or private; that lives in repo settings only.
