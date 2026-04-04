"use client";

import { FavoritesProvider } from "@/store/favoritesStore";
import { CompareProvider } from "@/store/compareStore";
import { PreferencesProvider } from "@/store/preferencesStore";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <PreferencesProvider>
      <FavoritesProvider>
        <CompareProvider>{children}</CompareProvider>
      </FavoritesProvider>
    </PreferencesProvider>
  );
}
