class menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click()
    }

    efetuarLogout() {

        cy.get('a[href="/logout"]').click()
    }


}


export default new menu()