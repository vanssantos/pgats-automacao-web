/// <reference types="cypress" />
import login from '../modules/login';
import menu from '../modules/menu'
import userData from '../fixtures/example.json'



describe('Testes da página https://automationexercise.com/test_cases', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com');
        menu.navegarParaLogin()
    });


    it('Login de Usuário com e-mail e senha corretos', () => {

        login.preencherFormularioDeLogin(userData.user, userData.pass)

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')

    });

    it('Login de Usuário com e-mail e senha incorretos', () => {
       
        login.preencherFormularioDeLogin(userData.user, '44555')

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')

    });

    it.only('Logout de Usuário', () => {        

        login.preencherFormularioDeLogin(userData.user, userData.pass)
       
        menu.efetuarLogout()

        cy.get('a[href="/login"]').should('have.text', ' Signup / Login')
        cy.url().should('contain', 'login')

    });

    it('Tentar logar e-mail já existente', () => {

        cy.get('input[data-qa="signup-name"]').type('Vans')
        cy.get('input[data-qa="signup-email"]').type('user-test-1760096534311@test.com')

        cy.get('button[data-qa="signup-button"]').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });
});
