export function login(email: string, password: string) {
  cy.get('button').contains('Login with Email').click();
  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').type(password);
  cy.wait(3000);
  cy.get('button[type=submit]').click();
}
