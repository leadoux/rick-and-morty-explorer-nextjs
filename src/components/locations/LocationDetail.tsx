import Link from "next/link";
import type { LocationDetailQueryResult } from "@/types/graphql";

type LocationDetailProps = {
  location: NonNullable<LocationDetailQueryResult["location"]>;
};

export function LocationDetail({ location }: LocationDetailProps) {
  return (
    <article className="detail-card">
      <div className="detail-card__body">
        <h1>{location.name}</h1>
        <p className="muted">Type: {location.type || "Unknown"}</p>
        <p className="muted">Dimension: {location.dimension || "Unknown"}</p>
        <section>
          <h2>Residents</h2>
          <ul className="link-list">
            {location.residents.map((resident) => (
              <li key={resident.id}>
                <Link href={`/character/${resident.id}`}>{resident.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
