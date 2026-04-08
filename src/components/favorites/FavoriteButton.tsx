"use client";

import { useFavoritesStore } from "@/store/favoritesStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import type { FavoriteItem } from "@/types/favorites";

type FavoriteButtonProps = {
  item: FavoriteItem;
};

export function FavoriteButton({ item }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const hydrated = useIsHydrated();
  const active = hydrated ? isFavorite(item.id, item.kind) : false;

  return (
    <button
      type="button"
      className={`button ${active ? "button--accent" : ""}`}
      onClick={() => toggleFavorite(item)}
    >
      {hydrated ? (active ? "Favorited" : "Favorite") : "Favorite"}
    </button>
  );
}
