This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Monorepo layout (separate client and server)

- `client/`: Next.js app with its own `package.json` and `node_modules`
- `server/`: Express + SQLite API with its own `package.json` and `node_modules`

Both projects are independent and can be installed, started, and deployed separately.

### Install

```bash
cd server && npm install
cd ../client && npm install
```

### Run

- Server (default port 4000):
```bash
cd server
npm run start
```

- Client (Next.js dev server on port 3000):
```bash
cd client
set NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev
```

On macOS/Linux use:
```bash
cd client
NEXT_PUBLIC_API_URL=http://localhost:4000 npm run dev
```

### Build

```bash
cd client && npm run build
```

### Notes

- Update `NEXT_PUBLIC_API_URL` in the client environment to point to your server URL in each environment.
- The client no longer references server scripts; each side is isolated.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


