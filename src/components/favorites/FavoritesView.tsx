"use client";

import Link from "next/link";
import { useFavoritesStore } from "@/store/favoritesStore";

export function FavoritesView() {
  const { items } = useFavoritesStore();

  const characters = items.filter((item) => item.kind === "character");
  const episodes = items.filter((item) => item.kind === "episode");
  const locations = items.filter((item) => item.kind === "location");

  if (items.length === 0) {
    return <p className="muted">No favorites yet. Add favorites from explorer or detail pages.</p>;
  }

  return (
    <div className="favorites-grid">
      <FavoritesSection title="Characters" items={characters} hrefPrefix="/character" />
      <FavoritesSection title="Episodes" items={episodes} hrefPrefix="/episode" />
      <FavoritesSection title="Locations" items={locations} hrefPrefix="/location" />
    </div>
  );
}

type FavoritesSectionProps = {
  title: string;
  items: Array<{ id: string; name: string; subtitle: string }>;
  hrefPrefix: string;
};

function FavoritesSection({ title, items, hrefPrefix }: FavoritesSectionProps) {
  return (
    <section className="card">
      <div className="card__body">
        <h2>{title}</h2>
        {items.length === 0 ? (
          <p className="muted">None saved.</p>
        ) : (
          <ul className="link-list">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={`${hrefPrefix}/${item.id}`}>{item.name}</Link>
                <p className="muted">{item.subtitle}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
