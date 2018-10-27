context('Main Application Actions', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should select from search box', () => {
        const selectBox = /^Select/;
        cy.getByText(selectBox).click();
        cy.getByText(selectBox).getByText('Litecoin').click();
    });


});