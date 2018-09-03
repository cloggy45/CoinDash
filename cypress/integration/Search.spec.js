context('Search Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Should recognize text input', () => {
        cy.get('.Select-value').click();
        cy.get('#react-select-2--value > div.Select-input > input').type('Litecoin', {force: true}).type('{enter}');
        cy.get('#react-select-2--value-item').should('have.text', 'Litecoin');
    });

    it('Should show list of options', () => {
        cy.get('.Select-value').click()
        cy.get('.Select-option').should('contain','Litecoin');
    });
});