import { describe, expect, it } from "vitest";
import { parseEpisodeFilters, toEpisodeQueryParams } from "@/lib/filters/episodeFilters";

describe("episode filters", () => {
  it("parses season and name values", () => {
    const parsed = parseEpisodeFilters({
      page: "2",
      name: "pilot",
      season: "S01",
    });

    expect(parsed).toEqual({
      page: 2,
      name: "pilot",
      season: "S01",
    });
  });

  it("defaults to page 1 for missing page", () => {
    const parsed = parseEpisodeFilters({});
    expect(parsed.page).toBe(1);
  });

  it("serializes params correctly", () => {
    const params = toEpisodeQueryParams({
      page: 4,
      name: "morty",
      season: "S02",
    });

    expect(params.toString()).toBe("name=morty&season=S02&page=4");
  });
});
