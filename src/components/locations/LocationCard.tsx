import Link from "next/link";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { Location } from "@/types/entities";

type LocationCardProps = {
  location: Location;
};

export function LocationCard({ location }: LocationCardProps) {
  return (
    <article className="card">
      <div className="card__body">
        <h3>
          <Link href={`/location/${location.id}`}>{location.name}</Link>
        </h3>
        <p className="muted">Type: {location.type || "Unknown"}</p>
        <p className="muted">Dimension: {location.dimension || "Unknown"}</p>
        <FavoriteButton
          item={{
            id: location.id,
            kind: "location",
            name: location.name,
            subtitle: `${location.type || "Unknown"} - ${location.dimension || "Unknown"}`,
          }}
        />
      </div>
    </article>
  );
}
