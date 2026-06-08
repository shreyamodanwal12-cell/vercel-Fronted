# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend and admin panel

This project now includes a backend server and an admin panel.

- Run `npm run dev` from the project root to start both the frontend and backend together.
- The backend listens on `http://localhost:4000` and the frontend proxies `/api` requests automatically.
- The admin panel is available at `http://localhost:5173/admin`.
- Admin sign-in:
  - Email: `admin@ibid.com`
  - Password: `admin123`

## Deploying the frontend to Vercel

1. Push this repository to GitHub.
2. Create a Vercel account and import this repository.
3. Set the Vercel project root to the repository root.
4. In Vercel environment variables, add:
   - `VITE_API_BASE_URL` = `https://your-backend-url.com`
5. Vercel build command: `npm run build`
6. Output directory: `dist`

> The frontend will deploy on Vercel as a static Vite app. The backend should be hosted separately and referenced via `VITE_API_BASE_URL`.

## Deploying the backend

This backend is in the `server/` folder and can be hosted on any Node.js platform such as Render, Railway, or Fly.io.

1. Deploy the `server` folder as a separate Node.js app.
2. Ensure `server/package.json` is used and the start command is `npm start`.
3. If the backend is live at `https://your-backend-url.com`, set Vercel's `VITE_API_BASE_URL` to that URL.

## Local environment variables

Create a `.env` file in the project root and set:

```
VITE_API_BASE_URL=http://localhost:4000
```

This will allow the frontend to call the local backend during development.
