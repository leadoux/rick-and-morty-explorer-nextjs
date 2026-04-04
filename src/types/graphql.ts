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

export type CharacterDetailQueryResult = {
  character: (Character & {
    episode: Array<{ id: string; name: string }>;
  }) | null;
};

export type EpisodeDetailQueryResult = {
  episode: (Episode & {
    characters: Array<{
      id: string;
      name: string;
      image: string;
      species: string;
      status: string;
    }>;
  }) | null;
};

export type LocationDetailQueryResult = {
  location: (Location & {
    residents: Array<{
      id: string;
      name: string;
      image: string;
      species: string;
      status: string;
    }>;
  }) | null;
};
