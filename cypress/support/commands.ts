// cypress/support/commands.ts
import { mount } from 'cypress/react';

// Add custom commands
Cypress.Commands.add('mount', mount);

// Custom command for API mocking
Cypress.Commands.add('mockFoodsAPI', (foods = [], statusCode = 200) => {
  cy.intercept('GET', '/api/foods', {
    statusCode,
    body: foods
  }).as('mockFoodsAPI');
});

// Custom command for waiting until loading is complete
Cypress.Commands.add('waitForLoading', () => {
  cy.get('[data-test-id="food-loading-spinner"]', { timeout: 10000 }).should('not.exist');
});

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mockFoodsAPI(foods?: any[], statusCode?: number): Chainable<void>;
      waitForLoading(): Chainable<void>;
    }
  }
}