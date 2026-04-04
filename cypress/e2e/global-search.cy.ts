describe("global search", () => {
  it("returns grouped results", () => {
    cy.intercept("POST", "https://rickandmortyapi.com/graphql", (request) => {
      if (String(request.body?.query).includes("query GlobalSearch")) {
        request.reply({
          statusCode: 200,
          body: {
            data: {
              characters: { results: [{ id: "1", name: "Rick Sanchez" }] },
              episodes: { results: [{ id: "1", name: "Pilot" }] },
              locations: { results: [{ id: "1", name: "Earth (C-137)" }] },
            },
          },
        });
      }
    });

    cy.visit("/characters");
    cy.get('input[placeholder="Search characters, episodes, locations"]').type("rick");
    cy.contains("Characters").should("be.visible");
    cy.contains("Episodes").should("be.visible");
    cy.contains("Locations").should("be.visible");
  });
});
