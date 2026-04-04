"use client";

import { useFavoritesStore } from "@/store/favoritesStore";
import type { FavoriteItem } from "@/types/favorites";

type FavoriteButtonProps = {
  item: FavoriteItem;
};

export function FavoriteButton({ item }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const active = isFavorite(item.id, item.kind);

  return (
    <button
      type="button"
      className={`button ${active ? "button--accent" : ""}`}
      onClick={() => toggleFavorite(item)}
    >
      {active ? "Favorited" : "Add Favorite"}
    </button>
  );
}
