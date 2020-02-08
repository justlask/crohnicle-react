/// <reference types="cypress" />

context('Likes', () => {

  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="username"]').type('itsauser')
    cy.get('input[name="password"]').type('itsapass')
    cy.get('input[type="submit"]').click()
    // logged in
  });

  it('will allow people to like posts if they havent liked it before', () => {
    cy.get(':nth-child(1) > .contentbox > :nth-child(4) > .interactbtns > :nth-child(1)')
    if (cy.get(':nth-child(1) > .contentbox > :nth-child(4) > .interactbtns > :nth-child(1) > .svg-inline--fa').should('have.class', 'unliked')) {
      cy.get(':nth-child(1) > .contentbox > :nth-child(4) > .interactbtns > :nth-child(1)').click()
      cy.get(':nth-child(1) > .contentbox > :nth-child(4) > .interactbtns > :nth-child(1) > .svg-inline--fa').should('have.class', 'liked')
    }
  });

  it('will allow people to unlike posts they have liked before', () => {
      cy.get(':nth-child(1) > .contentbox > :nth-child(4) > .interactbtns > :nth-child(1)').click()
      cy.get(':nth-child(1) > .contentbox > :nth-child(4) > .interactbtns > :nth-child(1) > .svg-inline--fa').should('have.class', 'unliked')
  })
});