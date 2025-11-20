import { faker } from '@faker-js/faker';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
      resetDatabase(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email = 'demo@example.com', password = 'password123') => {
  cy.session([email, password], () => {
    cy.request('POST', '/api/auth/login', { email, password }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});

Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', '/api/testing/reset', {
    seedUser: {
      email: 'demo@example.com',
      password: 'password123',
      name: faker.person.fullName(),
    },
  }).then(response => {
    expect(response.status).to.eq(200);
  });
});
