import type { Character, Episode, Location, PageInfo } from "@/types/entities";

type GraphqlConnection<T> = {
  info: PageInfo;
  results: T[];
};

export type CharactersQueryResult = {
  characters: GraphqlConnection<Character> | null;
};

export type EpisodesQueryResult = {
  episodes: GraphqlConnection<Episode> | null;
};

export type LocationsQueryResult = {
  locations: GraphqlConnection<Location> | null;
};
