export type EntityKind = "character" | "episode" | "location";

export type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  type: string;
  origin: { id: string | null; name: string };
  location: { id: string | null; name: string };
};

export type Episode = {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<{ id: string; name: string }>;
};

export type Location = {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<{ id: string; name: string }>;
};

export type PageInfo = {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
};
