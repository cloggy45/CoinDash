describe("Select Crypto Currency Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should select from crypto currency select box", () => {
    cy.get(".Select-value").click();
    cy.get("#react-select-2--value > div.Select-input > input").type("404", { force: true }).type("{enter}");
    cy.get("#react-select-2--value-item").should("contain", "404");
  });
});

