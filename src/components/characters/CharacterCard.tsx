import Link from "next/link";
import { CompareToggle } from "@/components/compare/CompareToggle";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { Character } from "@/types/entities";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="card">
      <Link href={`/character/${character.id}`} aria-label={`Open ${character.name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={character.image} alt={character.name} className="character-image" />
      </Link>
      <div className="card__body">
        <h3>
          <Link href={`/character/${character.id}`}>{character.name}</Link>
        </h3>
        <p className="muted">
          {character.status} - {character.species}
        </p>
        <p className="muted">Gender: {character.gender}</p>
        <div className="card-actions">
          <Link href={`/character/${character.id}`} className="button button--primary">
            Open
          </Link>
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
        </div>
      </div>
    </article>
  );
}
