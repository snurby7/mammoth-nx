describe('components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=budgettilecomponent--primary'));

  it('should render the component', () => {
    cy.get('mammoth-budget-tile').should('exist');
  });
});
