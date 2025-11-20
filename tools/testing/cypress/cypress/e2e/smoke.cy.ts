describe('Smoke: Core Navigation', () => {
  it('loads the home page', () => {
    cy.visit('/');
    cy.contains('Get Started').should('exist');
  });

  it('allows logging in', () => {
    cy.resetDatabase();
    cy.visit('/login');
    cy.get('input[name="email"]').type('demo@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('Sign In').click();
    cy.contains('Dashboard').should('exist');
  });
});
