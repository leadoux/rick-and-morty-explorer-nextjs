describe("favorites", () => {
  it("persists favorites through reload", () => {
    cy.visit("/characters");
    cy.contains("Add Favorite").first().click();
    cy.contains("Favorites").click();
    cy.get(".favorites-grid a").its("length").should("be.greaterThan", 0);
    cy.reload();
    cy.get(".favorites-grid a").its("length").should("be.greaterThan", 0);
  });
});
