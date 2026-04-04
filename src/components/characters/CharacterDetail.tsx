import Link from "next/link";
import { CompareToggle } from "@/components/compare/CompareToggle";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { CharacterDetailQueryResult } from "@/types/graphql";

type CharacterDetailProps = {
  character: NonNullable<CharacterDetailQueryResult["character"]>;
};

export function CharacterDetail({ character }: CharacterDetailProps) {
  return (
    <article className="detail-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={character.image} alt={character.name} className="detail-image" />
      <div className="detail-card__body">
        <h1>{character.name}</h1>
        <p className="muted">
          {character.status} - {character.species}
        </p>
        <FavoriteButton
          item={{
            id: character.id,
            kind: "character",
            name: character.name,
            subtitle: `${character.status} - ${character.species}`,
            image: character.image,
          }}
        />
        <CompareToggle
          type="character"
          value={{
            id: character.id,
            name: character.name,
            image: character.image,
            status: character.status,
            species: character.species,
          }}
        />
        <p className="muted">Gender: {character.gender}</p>
        {character.type ? <p className="muted">Type: {character.type}</p> : null}

        <section>
          <h2>Origin</h2>
          {character.origin?.id ? (
            <Link href={`/location/${character.origin.id}`}>{character.origin.name}</Link>
          ) : (
            <p className="muted">{character.origin?.name ?? "Unknown"}</p>
          )}
        </section>

        <section>
          <h2>Current Location</h2>
          {character.location?.id ? (
            <Link href={`/location/${character.location.id}`}>{character.location.name}</Link>
          ) : (
            <p className="muted">{character.location?.name ?? "Unknown"}</p>
          )}
        </section>

        <section>
          <h2>Episodes</h2>
          <ul className="link-list">
            {character.episode.map((episode) => (
              <li key={episode.id}>
                <Link href={`/episode/${episode.id}`}>{episode.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
