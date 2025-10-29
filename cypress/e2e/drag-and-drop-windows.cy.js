///<reference types="cypress"/>


describe('Drag and Drop and Windows', () => {

    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/')
    });

    it('Multiple Windows', () => {
        cy.contains('Multiple Windows').click()
        cy.get('a[href="/windows/new"]')
            .invoke('removeAttr', 'target')
            .click()

        //abriu a tela que seria em outra aba, dentro da mesma aba
        cy.get('h3').should('have.text', 'New Window')

        // professor explicu como voltar para a tela que estava antes de abrir a aba na mesma tela
        //pode utilizar o back para voltar ou forward para ir para frente
        cy.go('back')

        cy.get('a[href="/windows/new"]').should('have.text', 'Click Here')
    });

    it.only('Drap and Dop', () => {
        cy.get('a[href="/drag_and_drop"]').click()

        const dataTransfer = new DataTransfer()

        cy.contains('A').trigger('dragstart', {dataTransfer})
        cy.contains('B').trigger('drop', {dataTransfer})
    });

});


