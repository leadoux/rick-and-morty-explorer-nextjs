import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { EpisodeFilters } from "@/components/episodes/EpisodeFilters";
import { PaginationControls } from "@/components/listing/PaginationControls";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { getErrorMessage } from "@/lib/errors";
import { parseEpisodeFilters, toEpisodeQueryParams } from "@/lib/filters/episodeFilters";
import { graphqlRequest } from "@/lib/graphql/client";
import { EPISODES_QUERY } from "@/lib/queries";
import type { EpisodesQueryResult } from "@/types/graphql";

type EpisodesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function fetchEpisodes(searchParams: Record<string, string | string[] | undefined>) {
  const filters = parseEpisodeFilters(searchParams);
  const data = await graphqlRequest<EpisodesQueryResult>(EPISODES_QUERY, {
    page: filters.page,
    filter: {
      name: filters.name,
      episode: filters.season,
    },
  });

  return {
    filters,
    items: data.episodes?.results ?? [],
    info: data.episodes?.info ?? {
      count: 0,
      pages: 1,
      next: null,
      prev: null,
    },
  };
}

export default async function EpisodesPage({ searchParams }: EpisodesPageProps) {
  let pageData: Awaited<ReturnType<typeof fetchEpisodes>> | null = null;
  let error = "";

  try {
    pageData = await fetchEpisodes(await searchParams);
  } catch (unknownError) {
    error = getErrorMessage(unknownError);
  }

  if (error) {
    return (
      <section className="section">
        <h1>Episodes</h1>
        <ErrorState message={error} />
      </section>
    );
  }

  if (!pageData || pageData.items.length === 0) {
    return (
      <section className="section">
        <h1>Episodes</h1>
        <EmptyState message="No episodes matched your current filters." />
      </section>
    );
  }

  const { filters, items, info } = pageData;

  return (
    <section className="section">
      <h1>Episodes</h1>
      <EpisodeFilters
        key={`name:${filters.name ?? ""}|season:${filters.season ?? ""}`}
        name={filters.name ?? ""}
        season={filters.season ?? ""}
      />
      <p className="muted">Showing {items.length} of {info.count} episodes.</p>
      <div className="card-grid">
        {items.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
      <PaginationControls
        currentPage={filters.page}
        totalPages={info.pages || 1}
        buildHref={(page) => {
          const params = toEpisodeQueryParams({ ...filters, page });
          const query = params.toString();
          return query ? `/episodes?${query}` : "/episodes";
        }}
      />
    </section>
  );
}
