describe("character filters", () => {
  it("updates URL query params", () => {
    cy.visit("/characters");
    cy.get('input[placeholder="Search by character name"]').clear().type("rick");
    cy.url().should("include", "name=rick");
    cy.get("select").first().select("alive");
    cy.url().should("include", "status=alive");
  });
});
