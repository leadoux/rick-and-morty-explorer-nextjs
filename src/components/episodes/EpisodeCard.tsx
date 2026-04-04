import Link from "next/link";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { Episode } from "@/types/entities";

type EpisodeCardProps = {
  episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className="card">
      <div className="card__body">
        <h3>
          <Link href={`/episode/${episode.id}`}>{episode.name}</Link>
        </h3>
        <p className="muted">{episode.episode}</p>
        <p className="muted">Air date: {episode.air_date}</p>
        <FavoriteButton
          item={{
            id: episode.id,
            kind: "episode",
            name: episode.name,
            subtitle: `${episode.episode} - ${episode.air_date}`,
          }}
        />
      </div>
    </article>
  );
}
