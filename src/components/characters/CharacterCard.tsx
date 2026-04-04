import Link from "next/link";
import type { Character } from "@/types/entities";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="card__body">
        <h3>
          <Link href={`/character/${character.id}`}>{character.name}</Link>
        </h3>
        <p className="muted">
          {character.status} - {character.species}
        </p>
        <p className="muted">Gender: {character.gender}</p>
      </div>
    </article>
  );
}
