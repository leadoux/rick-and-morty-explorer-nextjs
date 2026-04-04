import { describe, expect, it } from "vitest";
import { toggleComparisonList } from "@/store/compareStore";

describe("compare store list behavior", () => {
  it("adds items until it reaches two", () => {
    const a = { id: "1", name: "A" };
    const b = { id: "2", name: "B" };
    const next = toggleComparisonList([a], b);

    expect(next).toEqual([a, b]);
  });

  it("evicts oldest item when adding third", () => {
    const a = { id: "1", name: "A" };
    const b = { id: "2", name: "B" };
    const c = { id: "3", name: "C" };
    const next = toggleComparisonList([a, b], c);

    expect(next).toEqual([b, c]);
  });

  it("removes an existing item on toggle", () => {
    const a = { id: "1", name: "A" };
    const b = { id: "2", name: "B" };
    const next = toggleComparisonList([a, b], a);

    expect(next).toEqual([b]);
  });
});
