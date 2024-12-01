import { BURGER_BUN } from './constans';

describe('Ingredient modal', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
  });

  it('Открытие модального окна с деталями ингредиента', () => {
    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-container"]')
      .filter(`:contains(${BURGER_BUN})`)
      .click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains(BURGER_BUN);

    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
