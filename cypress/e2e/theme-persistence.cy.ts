describe("theme preference", () => {
  it("persists after reload", () => {
    cy.visit("/characters");
    cy.contains("Light mode").click();
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.reload();
    cy.get("html").should("have.attr", "data-theme", "light");
  });
});
