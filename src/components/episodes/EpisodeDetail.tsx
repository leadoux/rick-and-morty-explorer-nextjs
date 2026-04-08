import Link from "next/link";
import { CompareToggle } from "@/components/compare/CompareToggle";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { EpisodeDetailQueryResult } from "@/types/graphql";

type EpisodeDetailProps = {
  episode: NonNullable<EpisodeDetailQueryResult["episode"]>;
};

export function EpisodeDetail({ episode }: EpisodeDetailProps) {
  return (
    <article className="detail-card">
      <div className="detail-card__body">
        <h1 data-page-heading tabIndex={-1}>
          {episode.name}
        </h1>
        <p className="muted">{episode.episode}</p>
        <FavoriteButton
          item={{
            id: episode.id,
            kind: "episode",
            name: episode.name,
            subtitle: `${episode.episode} - ${episode.air_date}`,
          }}
        />
        <CompareToggle
          type="episode"
          value={{
            id: episode.id,
            name: episode.name,
            episode: episode.episode,
            air_date: episode.air_date,
          }}
        />
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
