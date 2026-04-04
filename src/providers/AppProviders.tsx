"use client";

import { FavoritesProvider } from "@/store/favoritesStore";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
