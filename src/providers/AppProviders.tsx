"use client";

import { FavoritesProvider } from "@/store/favoritesStore";
import { CompareProvider } from "@/store/compareStore";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <FavoritesProvider>
      <CompareProvider>{children}</CompareProvider>
    </FavoritesProvider>
  );
}
