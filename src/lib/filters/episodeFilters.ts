export type EpisodeFilters = {
  name?: string;
  season?: string;
  page: number;
};

function toTextValue(value: string | string[] | undefined) {
  if (!value) return "";
  return Array.isArray(value) ? value[0] ?? "" : value;
}

export function parseEpisodeFilters(searchParams: Record<string, string | string[] | undefined>) {
  const page = Number.parseInt(toTextValue(searchParams.page), 10);

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    name: toTextValue(searchParams.name) || undefined,
    season: toTextValue(searchParams.season) || undefined,
  } satisfies EpisodeFilters;
}

export function toEpisodeQueryParams(filters: EpisodeFilters) {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.season) params.set("season", filters.season);
  if (filters.page > 1) params.set("page", String(filters.page));

  return params;
}
