# Rick and Morty Explorer (Next.js)

This app is a Next.js variant of the Vue implementation and targets the same user-facing behavior across characters, episodes, and locations.

## Feature map

- Global search across characters, episodes, and locations.
- Explorer pages with URL-synced filters and pagination.
- Entity detail pages with relationship navigation.
- Favorites persisted in `localStorage`.
- Compare workspace for side-by-side character and episode comparison.
- Theme preference toggle with persisted light/dark mode.

## Architecture snapshot

- `src/app` contains App Router pages for explorers, details, favorites, and compare.
- `src/components` contains feature and shared UI components.
- `src/lib` contains GraphQL client integration, queries, and filter helpers.
- `src/store` contains client state for favorites, compare, and preferences.
- `src/providers` wires client stores into the app shell.

## Local setup

```sh
pnpm install
```

## Development

```sh
pnpm dev
```

## Quality checks

```sh
pnpm lint
pnpm build
pnpm test:unit:run
pnpm test:e2e
```
