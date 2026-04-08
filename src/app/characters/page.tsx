import { getErrorMessage } from "@/lib/errors";
import { parseCharacterFilters, toCharacterQueryParams } from "@/lib/filters/characterFilters";
import { graphqlRequest } from "@/lib/graphql/client";
import { CHARACTERS_QUERY } from "@/lib/queries";
import type { CharactersQueryResult } from "@/types/graphql";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { CharacterFilters } from "@/components/characters/CharacterFilters";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { PaginationControls } from "@/components/listing/PaginationControls";

type CharactersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function fetchCharacters(searchParams: Record<string, string | string[] | undefined>) {
  const filters = parseCharacterFilters(searchParams);
  const data = await graphqlRequest<CharactersQueryResult>(CHARACTERS_QUERY, {
    page: filters.page,
    filter: {
      name: filters.name,
      status: filters.status,
      species: filters.species,
      gender: filters.gender,
    },
  });

  return {
    filters,
    items: data.characters?.results ?? [],
    info: data.characters?.info ?? {
      count: 0,
      pages: 1,
      next: null,
      prev: null,
    },
  };
}

export default async function CharactersPage({ searchParams }: CharactersPageProps) {
  let pageData: Awaited<ReturnType<typeof fetchCharacters>> | null = null;
  let error = "";

  try {
    pageData = await fetchCharacters(await searchParams);
  } catch (unknownError) {
    error = getErrorMessage(unknownError);
  }

  if (error) {
    return (
      <section className="section">
        <h1 data-page-heading tabIndex={-1}>
          Characters
        </h1>
        <ErrorState message={error} />
      </section>
    );
  }

  if (!pageData || pageData.items.length === 0) {
    return (
      <section className="section">
        <h1 data-page-heading tabIndex={-1}>
          Characters
        </h1>
        <EmptyState message="No characters matched your current filters." />
      </section>
    );
  }

  const { filters, items, info } = pageData;

  return (
    <section className="section">
      <h1 data-page-heading tabIndex={-1}>
        Characters
      </h1>
      <CharacterFilters
        key={`name:${filters.name ?? ""}|status:${filters.status ?? ""}|species:${filters.species ?? ""}|gender:${filters.gender ?? ""}`}
        name={filters.name ?? ""}
        status={filters.status ?? ""}
        species={filters.species ?? ""}
        gender={filters.gender ?? ""}
      />
      <h2 className="section-heading">Character results ({info.count})</h2>
      <div className="card-grid">
        {items.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <PaginationControls
        currentPage={filters.page}
        totalPages={info.pages || 1}
        buildHref={(page) => {
          const params = toCharacterQueryParams({ ...filters, page });
          const query = params.toString();
          return query ? `/characters?${query}` : "/characters";
        }}
      />
    </section>
  );
}
