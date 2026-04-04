import Link from "next/link";
import { EpisodeDetail } from "@/components/episodes/EpisodeDetail";
import { ErrorState } from "@/components/states/ErrorState";
import { getErrorMessage } from "@/lib/errors";
import { graphqlRequest } from "@/lib/graphql/client";
import { EPISODE_DETAIL_QUERY } from "@/lib/queries";
import type { EpisodeDetailQueryResult } from "@/types/graphql";

type EpisodeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EpisodeDetailPage({ params }: EpisodeDetailPageProps) {
  let error = "";
  let episode: EpisodeDetailQueryResult["episode"] = null;
  const { id } = await params;

  try {
    const data = await graphqlRequest<EpisodeDetailQueryResult>(EPISODE_DETAIL_QUERY, { id });
    episode = data.episode;
  } catch (unknownError) {
    error = getErrorMessage(unknownError);
  }

  return (
    <section className="section">
      <Link href="/episodes" className="muted">
        Back to episodes
      </Link>
      {error ? <ErrorState message={error} /> : null}
      {!error && !episode ? <p className="muted">Episode was not found.</p> : null}
      {!error && episode ? <EpisodeDetail episode={episode} /> : null}
    </section>
  );
}
