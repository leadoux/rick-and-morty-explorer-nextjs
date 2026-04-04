import { describe, expect, it } from "vitest";
import { parseCharacterFilters, toCharacterQueryParams } from "@/lib/filters/characterFilters";

describe("character filters", () => {
  it("parses expected filter values", () => {
    const parsed = parseCharacterFilters({
      page: "3",
      name: "rick",
      status: "alive",
      species: "human",
      gender: "male",
    });

    expect(parsed).toEqual({
      page: 3,
      name: "rick",
      status: "alive",
      species: "human",
      gender: "male",
    });
  });

  it("falls back to page 1 for invalid page values", () => {
    const parsed = parseCharacterFilters({
      page: "not-a-number",
    });

    expect(parsed.page).toBe(1);
  });

  it("serializes only active values into query params", () => {
    const params = toCharacterQueryParams({
      page: 2,
      name: "rick",
      status: undefined,
      species: "human",
      gender: undefined,
    });

    expect(params.toString()).toBe("name=rick&species=human&page=2");
  });
});
