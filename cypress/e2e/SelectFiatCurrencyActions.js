describe('Select Fiat Currency Component', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it('should select different fiat currency', () => {
    cy.getByText('USD').click();
    cy.getByText('CAD').wait(3000).click();
    cy.should('contain', 'CAD');
  })
});