/// <reference types="cypress" />

context('Posts', () => {

  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[name="username"]').type('itsauser')
    cy.get('input[name="password"]').type('itsapass')
    cy.get('input[type="submit"]').click()
    // logged in
  });

  it('will not create a post if nothing added', () => {
    cy.get('#status > button').click()
    cy.get('.flashmessage').contains('you cannot make an empty post')
  });

  it('will create a post without title', () => {
    cy.get('textarea[name="content"]').type("it's some content without a title")
    cy.get('#status > button').click()

    cy.get('.posts > :nth-child(1)').contains("it's some content without a title")
  });

  it('will not create a post without content', () => {
    cy.get('input[name="title"]').type("it's only a title")
    cy.get('#status > button').click()

    cy.get('.flashmessage').contains('you cannot make a post without content')
  });

  it('will add a new post to the posts container with both title/content', () => {
    cy.get('input[name="title"]').type("it's a title")
    cy.get('textarea[name="content"]').type("it's some content without a title")
     cy.get('#status > button').click()
  });
  
});