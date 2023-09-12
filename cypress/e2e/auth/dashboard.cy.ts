/// <reference types="cypress" />

import { login } from '../../test-utils/index.cy';

context('Dashboard', () => {
  describe('Dashboard no authtorized', () => {
    it('Should redirect to login if user not logged in', () => {
      cy.visit('http://localhost:3000/dashboard');
      cy.url().should('eq', 'http://localhost:3000/login');
      cy.wait(3000);
    });
  });
  describe('Dashboard authtorized', () => {
    it('Should enter dashboard since user is logged in', () => {
      cy.visit('http://localhost:3000/login');
      cy.intercept('GET', '**/session').as('sessions');
      login('admin@antoniomartinezperez.com', '123456789');
      cy.wait('@sessions');
      cy.get('[data-testid=user-dashboard]').should(
        'have.text',
        'Hi admin@antoniomartinezperez.com'
      );
    });
  });
});
