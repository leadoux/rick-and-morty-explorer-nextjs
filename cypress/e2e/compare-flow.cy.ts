describe("compare workflow", () => {
  it("compares selected characters", () => {
    cy.visit("/characters");
    cy.contains("Compare").eq(0).click();
    cy.contains("Compare").eq(1).click();
    cy.get('a[href="/compare"]').first().click();
    cy.contains("Character Comparison").should("be.visible");
    cy.contains("Select 2 characters from cards or detail pages.").should("not.exist");
  });
});
