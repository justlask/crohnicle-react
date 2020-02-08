/// <reference types="cypress" />

context('Login', () => { 
  beforeEach(() => {
    cy.visit('/')
    // at home
  });

  it('will nativate to /login', () => {
    cy.contains('a', 'log in').click()
  });

  it('will not log in without username/password', () => {
    cy.contains('a', 'log in').click()

    cy.get('input[type="submit"]').click()
    cy.contains('Provide username/password');
    cy.url().should('contain', '/login')
  });

  it('will not log in with incorrect credentials', () => {
    cy.contains('a', 'log in').click()
    cy.get('input[name="username"]').type('itsauser')
    cy.get('input[name="password"]').type('itsnotapass')
    cy.get('input[type="submit"]').click()

    cy.contains('username/password incorrect')
    cy.url().should('contain', '/login')
  });

  it('will log in with correct credentials', () => {
    cy.contains('a', 'log in').click()
    cy.get('input[name="username"]').type('itsauser')
    cy.get('input[name="password"]').type('itsapass')
    cy.get('input[type="submit"]').click()

    cy.contains('a', 'logout')
    cy.url().should('contain', '/dashboard')
  });


});