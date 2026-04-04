import { describe, expect, it } from "vitest";
import { toggleFavoritesList } from "@/store/favoritesStore";

describe("favorites store list behavior", () => {
  const favorite = {
    id: "1",
    kind: "character" as const,
    name: "Rick",
    subtitle: "Alive - Human",
    image: "x",
  };

  it("adds a new favorite to the front of the list", () => {
    const next = toggleFavoritesList([], favorite);
    expect(next).toEqual([favorite]);
  });

  it("removes an existing favorite when toggled again", () => {
    const next = toggleFavoritesList([favorite], favorite);
    expect(next).toEqual([]);
  });
});
