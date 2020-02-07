/// <reference types="cypress" />

context('Signup', () => {
  beforeEach(() => {
    cy.visit('/')
    // at home
  })

  it('will nativate to /signup', () => {
    cy.contains('a', 'sign up').click()
  });

  it('will not work with bad credentials', () => {
    cy.contains('a', 'sign up').click()
    // cy.get('input[type="email"]').type('wrong@email.com');
    cy.get('input[name="username"]').type('itsauser')
    cy.get('input[name="email"]').type('fake@email.com')
    cy.get('input[name="password"]').type('itsapass')
    cy.get('select').select('ally')
    cy.get('input[type="submit"]').click()

    // cy.contains("Unable to signup")
    cy.url().should('contain', '/signup')
  })

});