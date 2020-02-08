/// <reference types="cypress" />

context('Comments', () => {


  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="username"]').type('itsauser')
    cy.get('input[name="password"]').type('itsapass')
    cy.get('input[type="submit"]').click()
    // logged in
  });

  

});