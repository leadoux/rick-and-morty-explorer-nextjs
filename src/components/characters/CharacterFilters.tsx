"use client";

import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useUrlSyncedFilters } from "@/hooks/useUrlSyncedFilters";

type CharacterFiltersProps = {
  name: string;
  status: string;
  species: string;
  gender: string;
};

export function CharacterFilters({ name, status, species, gender }: CharacterFiltersProps) {
  const [nameInput, setNameInput] = useState(name);
  const debouncedName = useDebouncedValue(nameInput, 350);
  const { updateFilter } = useUrlSyncedFilters({ debounceKeys: ["name"] });

  useEffect(() => {
    if (debouncedName === name) return;
    updateFilter("name", debouncedName);
  }, [debouncedName, name, updateFilter]);

  return (
    <div className="filter-grid">
      <label className="field">
        <span>Name</span>
        <input
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="Search by character name"
        />
      </label>

      <label className="field">
        <span>Status</span>
        <select value={status} onChange={(event) => updateFilter("status", event.target.value)}>
          <option value="">Any status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>

      <label className="field">
        <span>Species</span>
        <input
          type="text"
          value={species}
          onChange={(event) => updateFilter("species", event.target.value)}
          placeholder="Human, Alien..."
        />
      </label>

      <label className="field">
        <span>Gender</span>
        <select value={gender} onChange={(event) => updateFilter("gender", event.target.value)}>
          <option value="">Any gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>
    </div>
  );
}
