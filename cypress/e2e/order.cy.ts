import { BURGER_BUN, BURGER_INGREDIENT } from './constans';

describe('Order', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json'
    }).as('order');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    cy.visit('/');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Создание заказа', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-container"]')
      .filter(`:contains(${BURGER_BUN})`)
      .find('button')
      .click();
    cy.get('[data-cy="burger-constructor-bun-top"]').contains(BURGER_BUN);

    cy.get('[data-cy="ingredient-container"]')
      .filter(`:contains(${BURGER_INGREDIENT})`)
      .find('button')
      .click();
    cy.get('[data-cy="burger-constructor-ingredient"]').contains(
      BURGER_INGREDIENT
    );

    cy.get('[data-cy="order-bottom"]').find('button').click();

    cy.wait('@getUser');
    cy.wait('@order');

    cy.get('[data-cy="modal"]').should('be.visible').should('contain', '61066');
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="burger-constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="burger-constructor-ingredient"]').should('not.exist');
  });
});

// // Проверяем, что модальное окно открыто
// cy.get('[data-cy="modal-order-number"]') // Замените на актуальный селектор для модального окна
// .should('exist');

// // Кликаем на оверлей для закрытия модального окна
// cy.get('[data-cy="modal-overlay"]').click(); // Замените на актуальный селектор для оверлея

// // Проверяем, что модальное окно закрыто
// cy.get('[data-cy="modal-order-number"]').should('not.exist');
