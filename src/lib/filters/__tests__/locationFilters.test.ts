import { describe, expect, it } from "vitest";
import { parseLocationFilters, toLocationQueryParams } from "@/lib/filters/locationFilters";

describe("location filters", () => {
  it("parses all filter values", () => {
    const parsed = parseLocationFilters({
      page: "5",
      name: "earth",
      type: "planet",
      dimension: "C-137",
    });

    expect(parsed).toEqual({
      page: 5,
      name: "earth",
      type: "planet",
      dimension: "C-137",
    });
  });

  it("drops empty values while serializing", () => {
    const params = toLocationQueryParams({
      page: 1,
      name: "earth",
      type: "",
      dimension: undefined,
    });

    expect(params.toString()).toBe("name=earth");
  });
});
