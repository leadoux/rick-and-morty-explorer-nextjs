import { LocationCard } from "@/components/locations/LocationCard";
import { LocationFilters } from "@/components/locations/LocationFilters";
import { PaginationControls } from "@/components/listing/PaginationControls";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { getErrorMessage } from "@/lib/errors";
import { parseLocationFilters, toLocationQueryParams } from "@/lib/filters/locationFilters";
import { graphqlRequest } from "@/lib/graphql/client";
import { LOCATIONS_QUERY } from "@/lib/queries";
import type { LocationsQueryResult } from "@/types/graphql";

type LocationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function fetchLocations(searchParams: Record<string, string | string[] | undefined>) {
  const filters = parseLocationFilters(searchParams);
  const data = await graphqlRequest<LocationsQueryResult>(LOCATIONS_QUERY, {
    page: filters.page,
    filter: {
      name: filters.name,
      type: filters.type,
      dimension: filters.dimension,
    },
  });

  return {
    filters,
    items: data.locations?.results ?? [],
    info: data.locations?.info ?? {
      count: 0,
      pages: 1,
      next: null,
      prev: null,
    },
  };
}

export default async function LocationsPage({ searchParams }: LocationsPageProps) {
  let pageData: Awaited<ReturnType<typeof fetchLocations>> | null = null;
  let error = "";

  try {
    pageData = await fetchLocations(await searchParams);
  } catch (unknownError) {
    error = getErrorMessage(unknownError);
  }

  if (error) {
    return (
      <section className="section">
        <h1 data-page-heading tabIndex={-1}>
          Locations
        </h1>
        <ErrorState message={error} />
      </section>
    );
  }

  if (!pageData || pageData.items.length === 0) {
    return (
      <section className="section">
        <h1 data-page-heading tabIndex={-1}>
          Locations
        </h1>
        <EmptyState message="No locations matched your current filters." />
      </section>
    );
  }

  const { filters, items, info } = pageData;

  return (
    <section className="section">
      <h1 data-page-heading tabIndex={-1}>
        Locations
      </h1>
      <LocationFilters
        key={`name:${filters.name ?? ""}|type:${filters.type ?? ""}|dimension:${filters.dimension ?? ""}`}
        name={filters.name ?? ""}
        type={filters.type ?? ""}
        dimension={filters.dimension ?? ""}
      />
      <p className="muted">Showing {items.length} of {info.count} locations.</p>
      <div className="card-grid">
        {items.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
      <PaginationControls
        currentPage={filters.page}
        totalPages={info.pages || 1}
        buildHref={(page) => {
          const params = toLocationQueryParams({ ...filters, page });
          const query = params.toString();
          return query ? `/locations?${query}` : "/locations";
        }}
      />
    </section>
  );
}
