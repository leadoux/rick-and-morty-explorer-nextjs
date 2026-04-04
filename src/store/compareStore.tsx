"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CompareCharacter = {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
};

export type CompareEpisode = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
};

type CompareContextValue = {
  characters: CompareCharacter[];
  episodes: CompareEpisode[];
  toggleCharacter: (value: CompareCharacter) => void;
  toggleEpisode: (value: CompareEpisode) => void;
  hasCharacter: (id: string) => boolean;
  hasEpisode: (id: string) => boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);

type CompareProviderProps = {
  children: React.ReactNode;
};

export function toggleComparisonList<T extends { id: string }>(current: T[], value: T) {
  const index = current.findIndex((item) => item.id === value.id);
  if (index > -1) {
    const next = [...current];
    next.splice(index, 1);
    return next;
  }

  if (current.length === 2) {
    return [current[1], value];
  }

  return [...current, value];
}

export function CompareProvider({ children }: CompareProviderProps) {
  const [characters, setCharacters] = useState<CompareCharacter[]>([]);
  const [episodes, setEpisodes] = useState<CompareEpisode[]>([]);

  const value = useMemo<CompareContextValue>(
    () => ({
      characters,
      episodes,
      toggleCharacter: (value) => {
        setCharacters((current) => toggleComparisonList(current, value));
      },
      toggleEpisode: (value) => {
        setEpisodes((current) => toggleComparisonList(current, value));
      },
      hasCharacter: (id) => characters.some((item) => item.id === id),
      hasEpisode: (id) => episodes.some((item) => item.id === id),
    }),
    [characters, episodes],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompareStore() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompareStore must be used inside CompareProvider");
  }

  return context;
}
