import { FavoritesView } from "@/components/favorites/FavoritesView";

export default function FavoritesPage() {
  return (
    <section className="section">
      <h1 data-page-heading tabIndex={-1}>
        Favorites
      </h1>
      <FavoritesView />
    </section>
  );
}
