export type CharacterFilters = {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page: number;
};

function toTextValue(value: string | string[] | undefined) {
  if (!value) return "";
  return Array.isArray(value) ? value[0] ?? "" : value;
}

export function parseCharacterFilters(searchParams: Record<string, string | string[] | undefined>) {
  const page = Number.parseInt(toTextValue(searchParams.page), 10);

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    name: toTextValue(searchParams.name) || undefined,
    status: toTextValue(searchParams.status) || undefined,
    species: toTextValue(searchParams.species) || undefined,
    gender: toTextValue(searchParams.gender) || undefined,
  } satisfies CharacterFilters;
}

export function toCharacterQueryParams(filters: CharacterFilters) {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.status) params.set("status", filters.status);
  if (filters.species) params.set("species", filters.species);
  if (filters.gender) params.set("gender", filters.gender);
  if (filters.page > 1) params.set("page", String(filters.page));

  return params;
}
