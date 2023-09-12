/// <reference types="cypress" />

import { login } from '../../test-utils/index.cy';

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.intercept('GET', '**/session').as('sessions');
  });

  describe('Login errors', () => {
    it('No user found', () => {
      login('as@gmail.com', '123s456789');

      cy.wait('@sessions');
      cy.get('.MuiAlert-message').should('have.text', 'No user found');
    });

    it('Incorrect password', () => {
      login('admin@antoniomartinezperez.com', 'reteetheth');

      cy.wait('@sessions');
      cy.get('.MuiAlert-message').should('have.text', 'Incorrect password');
    });

    it('Not active', () => {
      login('hardbasstony@gmail.com', '123456789');

      cy.wait('@sessions');
      cy.get('.MuiAlert-message').should('have.text', 'User is not active');
    });
  });

  describe('Login success', () => {
    it('Logged in', () => {
      login('admin@antoniomartinezperez.com', '123456789');

      cy.wait('@sessions');
      cy.get('[data-testid=user-dashboard]').should(
        'have.text',
        'Hi admin@antoniomartinezperez.com'
      );
    });
  });
});
