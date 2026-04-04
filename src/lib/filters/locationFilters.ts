export type LocationFilters = {
  name?: string;
  type?: string;
  dimension?: string;
  page: number;
};

function toTextValue(value: string | string[] | undefined) {
  if (!value) return "";
  return Array.isArray(value) ? value[0] ?? "" : value;
}

export function parseLocationFilters(searchParams: Record<string, string | string[] | undefined>) {
  const page = Number.parseInt(toTextValue(searchParams.page), 10);

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    name: toTextValue(searchParams.name) || undefined,
    type: toTextValue(searchParams.type) || undefined,
    dimension: toTextValue(searchParams.dimension) || undefined,
  } satisfies LocationFilters;
}

export function toLocationQueryParams(filters: LocationFilters) {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.type) params.set("type", filters.type);
  if (filters.dimension) params.set("dimension", filters.dimension);
  if (filters.page > 1) params.set("page", String(filters.page));

  return params;
}
