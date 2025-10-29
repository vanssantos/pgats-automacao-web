/// <reference types="cypress" />

import userData from '../fixtures/example.json'
import {
    getRandomEmail,
    getTimeStamp
} from '../support/helpers'

// da para vincular com o faker do brasil -> import {faker, pt_BR } from '@faker-js/faker'
import { faker } from '@faker-js/faker'

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'


describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com');
        menu.navegarParaLogin()
    });

    it('testando fixtures, helpers e fakers', () => {

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

    it.only('Cadastrar um usuário', () => {

        //preencher o formulário de pré cadastro
        login.preencherFormularioDePreCadastro()

       //valida que está na tela de informações da conta
        expect(cy.get('b').contains('Enter Account Information')).to.exist

        // preencher formulário cadastro completo
        cadastro.preencherFormularioDeCadastroCompleto()

        // asserção para validar que foi realizado o cadastro com sucesso
        //cy.get('b').should('have.text', 'Account Created!')
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')

    });

});
