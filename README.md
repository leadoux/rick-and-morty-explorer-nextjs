# Rick and Morty Explorer

[![Live](https://img.shields.io/website?url=https%3A%2F%2Frm-nextjs.leadoux.dev&label=live%20site)](https://rm-nextjs.leadoux.dev)

A Next.js (App Router) + TypeScript project that demonstrates:

- Next.js fundamentals (App Router, server/client component boundaries, URL-driven routing)
- GraphQL API integration against the [Rick and Morty API](https://rickandmortyapi.com/graphql)
- UX polish (responsive layouts, loading/error/empty states, dark mode)
- Testing quality with unit coverage and Cypress smoke scenarios

> Project status: this repository is approximately **60% complete**.

Live app: [https://rm-nextjs.leadoux.dev](https://rm-nextjs.leadoux.dev)

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Data layer:** GraphQL over `fetch` with centralized query documents
- **Client caching:** IndexedDB via `idb` with TTL and stale fallback behavior
- **State management:** Lightweight client stores with React context/providers
- **Testing:** Vitest (unit) and Cypress (smoke e2e)
- **Package manager:** pnpm
- **Hosting/deployment:** Netlify (production from `main`, preview deploys for PRs)

## Feature Map

- **Global search** across characters, episodes, and locations.
- **Explorer pages** with URL-synced filters and pagination:
  - Characters (`status`, `species`, `gender`, `name`)
  - Episodes (`name`, `season`)
  - Locations (`name`, `type`, `dimension`)
- **Detail pages** for each entity with relationship navigation.
- **Favorites** persisted in `localStorage`.
- **Compare workspace** for side-by-side character/episode comparison.
- **Dark mode** with persisted preference.
- **Client cache** for GraphQL responses using IndexedDB TTL with stale fallback on API rate limits.

## Architecture Snapshot

- `src/app` contains route-based application flow with Next.js App Router pages.
- `src/store` contains client stores for favorites, compare state, and theme preferences.
- `src/lib/queries.ts` centralizes GraphQL operations.
- `src/lib/graphqlCache.ts` adds IndexedDB response caching with TTL and stale fallback on API rate limits.
- `src/components` contains reusable UI elements (header, global search, cards, pagination, state UI).
- `src/providers` composes cross-page client providers into the root app shell.

The app keeps list/detail data fetching close to route-level pages while centralized client stores manage cross-page state (theme, favorites, compare).

## Local Setup

```sh
pnpm install
```

## Development

```sh
pnpm dev
```

For local development, GraphQL requests go directly to the public API endpoint by default.
You can optionally set `RICK_AND_MORTY_GRAPHQL_URL` (server) and `NEXT_PUBLIC_GRAPHQL_URL` (client) to route through your own backend/proxy endpoint.

## Quality Checks

```sh
pnpm lint
pnpm build
pnpm test:unit:run
pnpm test:e2e
```

## Cypress Smoke Coverage

- Global search returns grouped results.
- Character filter updates URL query params.
- Favorites persist through page reload.
- Compare flow works with selected characters.
- Theme preference persists after reload.

## Deployment

This project is configured for Netlify via `netlify.toml`.

- Production deploys from `main`
- Deploy previews for pull requests
- Next.js routes are handled by Netlify's Next.js runtime integration

Deploy with:

```sh
pnpm build
```
