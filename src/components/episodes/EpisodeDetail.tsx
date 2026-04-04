import Link from "next/link";
import type { EpisodeDetailQueryResult } from "@/types/graphql";

type EpisodeDetailProps = {
  episode: NonNullable<EpisodeDetailQueryResult["episode"]>;
};

export function EpisodeDetail({ episode }: EpisodeDetailProps) {
  return (
    <article className="detail-card">
      <div className="detail-card__body">
        <h1>{episode.name}</h1>
        <p className="muted">{episode.episode}</p>
        <p className="muted">Air date: {episode.air_date}</p>
        <section>
          <h2>Characters</h2>
          <ul className="link-list">
            {episode.characters.map((character) => (
              <li key={character.id}>
                <Link href={`/character/${character.id}`}>{character.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
