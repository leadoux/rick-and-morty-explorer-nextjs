"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { FavoriteItem } from "@/types/favorites";

const FAVORITES_STORAGE_KEY = "rm-favorites";

type FavoritesContextValue = {
  items: FavoriteItem[];
  isFavorite: (id: string, kind: FavoriteItem["kind"]) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

type FavoritesProviderProps = {
  children: React.ReactNode;
};

function keyFor(id: string, kind: FavoriteItem["kind"]) {
  return `${kind}:${id}`;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [items, setItems] = useState<FavoriteItem[]>(() => {
    if (typeof window === "undefined") return [];

    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];

    try {
      return JSON.parse(raw) as FavoriteItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      items,
      isFavorite: (id, kind) => items.some((item) => keyFor(item.id, item.kind) === keyFor(id, kind)),
      toggleFavorite: (item) => {
        setItems((currentItems) => {
          const index = currentItems.findIndex(
            (existing) => keyFor(existing.id, existing.kind) === keyFor(item.id, item.kind),
          );
          if (index > -1) {
            const nextItems = [...currentItems];
            nextItems.splice(index, 1);
            return nextItems;
          }

          return [item, ...currentItems];
        });
      },
    }),
    [items],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavoritesStore() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavoritesStore must be used inside FavoritesProvider");
  }

  return context;
}
