import './commands';

beforeEach(() => {
  cy.log('🚀 Starting E2E test');
});

afterEach(function () {
  if (this.currentTest?.state === 'failed') {
    cy.screenshot(`failed-${this.currentTest.title}`);
  }
});
