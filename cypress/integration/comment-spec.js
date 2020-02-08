/// <reference types="cypress" />

context('Comments', () => {


  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="username"]').type('itsauser')
    cy.get('input[name="password"]').type('itsapass')
    cy.get('input[type="submit"]').click()
    // logged in
  });

  it('will allow people to add a comment', () => {
    cy.get(':nth-child(1) > .contentbox > :nth-child(4) > .interactbtns > :nth-child(2)')
    cy.get(':nth-child(1) > .contentbox > :nth-child(4) > .interactbtns > :nth-child(2)').click()
    cy.get('.addcomment > input[type="text"]').type('hello world123')
    cy.get('.addcomment input[type="submit"]').click()

    cy.contains('hello world123')
  });

});