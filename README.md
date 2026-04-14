# Lab13 Full-Stack Deployment

This workspace includes:
- Frontend: React + Vite in `frontend`
- Backend: Express in `backend`

## 1) Install

```bash
npm run install:all
```

## 2) Local environment setup

Backend:
```bash
copy backend\.env.example backend\.env
```

Frontend:
```bash
copy frontend\.env.example frontend\.env
```

Update the backend `.env` file. The frontend can run locally without a `.env` file because Vite proxies `/api` to the backend in development.

## 3) Run locally

Backend:
```bash
npm --prefix backend run dev
```

Frontend:
```bash
npm --prefix frontend run dev
```

## 4) Bundle-size optimization included

- Terser minification with `drop_console` and `drop_debugger`
- Vendor chunk splitting for React runtime
- Lazy loading via `React.lazy` + `Suspense`
- CSS code splitting enabled

## 5) Deploy backend on Render

1. Push this repo to GitHub.
2. Create new Web Service on Render.
3. Render will auto-detect `render.yaml`.
4. Set secret env var:
   - `CORS_ORIGIN` = your Vercel frontend URL
5. Deploy and copy backend URL.

## 6) Deploy frontend on Vercel

1. Import same GitHub repo in Vercel.
2. Set project root directory to `frontend`.
3. Add environment variable:
   - `VITE_API_BASE_URL` = your Render backend URL
4. Deploy.

If you serve the built frontend from the backend during local testing, it will use same-origin `/api` calls automatically.

## 7) Production CORS check

After both deployments, verify the backend `CORS_ORIGIN` exactly matches the Vercel domain.
