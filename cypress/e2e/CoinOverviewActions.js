describe("Coin Overview Component", () => {
  beforeEach(() => {
    cy.visit("/").wait(5000);
  });

  it("Should load social media when button clicked", () => {
    cy.get('[data-cy=Reddit]').click();
  });
});