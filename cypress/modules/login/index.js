import { faker } from '@faker-js/faker'
import { getRandomEmail } from '../../support/helpers'

class login {
    preencherFormularioDePreCadastro() {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())

        cy.contains('button', 'Signup').click()
        // OU   //cy.get('[data-qa="signup-button"]').click()
    }
    preencherFormularioDeLogin(usuario, senha) {
        cy.get('input[data-qa="login-email"]').type(usuario)
        cy.get('input[data-qa="login-password"]').type(senha)

        cy.get('button[data-qa="login-button"]').click()
    }



}

export default new login()