"use client";

import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useUrlSyncedFilters } from "@/hooks/useUrlSyncedFilters";

type EpisodeFiltersProps = {
  name: string;
  season: string;
};

export function EpisodeFilters({ name, season }: EpisodeFiltersProps) {
  const [nameInput, setNameInput] = useState(name);
  const [seasonInput, setSeasonInput] = useState(season);
  const debouncedName = useDebouncedValue(nameInput, 350);
  const debouncedSeason = useDebouncedValue(seasonInput, 350);
  const { updateFilter } = useUrlSyncedFilters({ debounceKeys: ["name", "season"] });

  useEffect(() => {
    if (debouncedName === name) return;
    updateFilter("name", debouncedName);
  }, [debouncedName, name, updateFilter]);

  useEffect(() => {
    if (debouncedSeason === season) return;
    updateFilter("season", debouncedSeason.toUpperCase());
  }, [debouncedSeason, season, updateFilter]);

  return (
    <div className="filter-grid filter-grid--2">
      <label className="field">
        <span>Name</span>
        <input
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="Search by episode name"
        />
      </label>
      <label className="field">
        <span>Season</span>
        <input
          type="text"
          value={seasonInput}
          onChange={(event) => setSeasonInput(event.target.value)}
          placeholder="S01, S02..."
        />
      </label>
    </div>
  );
}
