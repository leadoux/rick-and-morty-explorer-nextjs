"use client";

import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useUrlSyncedFilters } from "@/hooks/useUrlSyncedFilters";

type LocationFiltersProps = {
  name: string;
  type: string;
  dimension: string;
};

export function LocationFilters({ name, type, dimension }: LocationFiltersProps) {
  const [nameInput, setNameInput] = useState(name);
  const [typeInput, setTypeInput] = useState(type);
  const [dimensionInput, setDimensionInput] = useState(dimension);
  const debouncedName = useDebouncedValue(nameInput, 350);
  const debouncedType = useDebouncedValue(typeInput, 350);
  const debouncedDimension = useDebouncedValue(dimensionInput, 350);
  const { updateFilter } = useUrlSyncedFilters({
    debounceKeys: ["name", "type", "dimension"],
  });

  useEffect(() => {
    if (debouncedName === name) return;
    updateFilter("name", debouncedName);
  }, [debouncedName, name, updateFilter]);

  useEffect(() => {
    if (debouncedType === type) return;
    updateFilter("type", debouncedType);
  }, [debouncedType, type, updateFilter]);

  useEffect(() => {
    if (debouncedDimension === dimension) return;
    updateFilter("dimension", debouncedDimension);
  }, [debouncedDimension, dimension, updateFilter]);

  return (
    <fieldset className="filter-fieldset">
      <legend className="sr-only">Location filters</legend>
      <div className="filter-grid filter-grid--3">
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            placeholder="Search by location name"
            aria-describedby="location-name-hint"
          />
        </label>
        <p id="location-name-hint" className="sr-only">
          Name filter uses short debounce while typing.
        </p>
        <label className="field">
          <span>Type</span>
          <input
            type="text"
            value={typeInput}
            onChange={(event) => setTypeInput(event.target.value)}
            placeholder="Planet, Space station..."
            aria-describedby="location-type-hint"
          />
        </label>
        <p id="location-type-hint" className="sr-only">
          Type filter uses short debounce while typing.
        </p>
        <label className="field">
          <span>Dimension</span>
          <input
            type="text"
            value={dimensionInput}
            onChange={(event) => setDimensionInput(event.target.value)}
            placeholder="C-137..."
            aria-describedby="location-dimension-hint"
          />
        </label>
        <p id="location-dimension-hint" className="sr-only">
          Dimension filter uses short debounce while typing.
        </p>
      </div>
    </fieldset>
  );
}
