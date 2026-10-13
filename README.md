# NoteHub

NoteHub is a Next.js App Router notes application with server-rendered note details, client-side note browsing, and persistent Zustand drafts.

## Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_NOTEHUB_TOKEN` to the API token issued for your NoteHub backend.
3. Start the development server with `npm run dev`.

The app uses the GoIT NoteHub API by default. Set `NEXT_PUBLIC_API_URL` only if your API is hosted elsewhere. Never commit `.env.local` or a real API token.

## Validation

- `npm run typecheck`
- `npm run lint`
- `npm run build`
