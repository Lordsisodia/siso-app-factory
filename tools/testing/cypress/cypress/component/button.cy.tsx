import React from 'react';
import { Button } from '@/components/ui/button';

describe('<Button />', () => {
  it('renders with text', () => {
    cy.mount(<Button>Click me</Button>);
    cy.contains('Click me').should('exist');
  });
});
