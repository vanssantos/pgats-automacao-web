/// <reference types="cypress" />

import userData from '../fixtures/example.json'
import {
    getRandomEmail,
    getTimeStamp
} from '../support/helpers'

// da para vincular com o faker do brasil -> import {faker, pt_BR } from '@faker-js/faker'
import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href="/login"]').click()
    });

    it.only('testando fixtures, helpers e fakers', () => {
        
        //fixture
        cy.log(userData.email)
        cy.log(userData.name)

        //helpers
        cy.log(`getRandomNumber: ${getTimeStamp()}`)
        cy.log(`getRandomEmail: ${getRandomEmail()}`)

        //faker
        cy.log(`raça gato: ${faker.animal.cat()}`)

        // pode usar variavel para receber o valor do faker e depois usar nos testes
        const nome = faker.person.firstName()
        cy.log(`nome uitlizado no teste como faker e variavel:  ${nome}`)
    })

    it('Cadastrar um usuário', () => {

        //está pegando o time para incluir no email para usar várias vezes
        //  e não ocorrer o problema de duplicidade
        const timestamp = new Date().getTime()

        //cy.get('[data-qa="signup-name"]').type('User Teste')
        // cy.get('[data-qa="signup-email"]').type(`user-test-${timestamp}@test.com`)

        cy.get('[data-qa="signup-name"]').type(faker.person.fullName())
        //professor falou que não é bom utilizar o email direito, é bom utilizar um complemento
        //cy.get('[data-qa="signup-email"]').type(faker.internet.email())
        cy.get('[data-qa="signup-email"]').type(faker.internet.email({firstName: 'qa-teste'}))

        cy.contains('button', 'Signup').click()

        // OU   //cy.get('[data-qa="signup-button"]').click()
        expect(cy.get('b').contains('Enter Account Information')).to.exist

        // radio ou checkbox  ->  check
        cy.get('input[type=radio]').check('Mrs')
        // OU  //cy.get('input[value="Mrs"]').check()
        //cy.get('#id_gender1').check()

        cy.get('#password').type('12345', { log: false }) //log: false, esconde a senha, não exibe nos passos de execução do cypress

        // para combobox ou selects
        cy.get('[data-qa=days]').select('20')
        cy.get('[data-qa=months]').select('September')
        cy.get('[data-qa=years]').select('1983')

        // radio ou checkbox  ->  check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        /* dados antigo utilizado em aula
        cy.get('input#first_name').type('User')
        cy.get('input#last_name').type('de teste')
        cy.get('input#company').type('QA company')
        cy.get('input#address1').type('R: dos qas tops, 2004')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los angeles')
        cy.get('input#zipcode').type('90001')
        cy.get('input#mobile_number').type('111 222 333')
        */


        // usando dados do faker para preenhcer o formulário

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.streetAddress())
         cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('input#zipcode').type(faker.location.zipCode())
        cy.get('input#mobile_number').type('111 222 333')

        cy.get('[data-qa="create-account"]').click()

        // asserção para validar que foi realizado o cadastro com sucesso
        //cy.get('b').should('have.text', 'Account Created!')
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')

    });

});
