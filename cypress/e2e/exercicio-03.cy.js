/// <reference types="cypress" />

import formDados from "../fixtures/exercicio-03.json"


describe('Envio de um formulário - contact us', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')

    });

    it('Acessar formulário contact ud', () => {
        //carregando arquivo do fixture para fazer upload no campo de upload abaixo
        cy.fixture("133850691724312572.jpg").as('imagem')


        cy.get('a[href="/contact_us"]').click()
        cy.get('input[data-qa="name"]').type(formDados.name)
        cy.get('input[data-qa="email"]').type(formDados.email)
        cy.get('input[data-qa="subject"]').type(formDados.subject)        
        cy.get('textarea[data-qa="message"]').type(formDados.message)
        //anexando arquivo
        cy.get('input[name="upload_file"]').selectFile('@imagem')



        cy.get('input[data-qa="submit-button"]').click()
        // cy.select('OK')
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text','Success! Your details have been submitted successfully.')

    })


});
