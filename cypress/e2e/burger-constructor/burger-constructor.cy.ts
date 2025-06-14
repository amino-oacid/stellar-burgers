export const burgerConstructor = '[data-cy=burger_constructor]';
export const bun = '[data-cy="1"]';
export const main = '[data-cy="2"]';
export const sauce = '[data-cy="4"]';

describe('Проверка страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('/');
    cy.viewport(1680, 1024);
  });

  it('Проверка добавления ингредиентов (булки и начинок) в конструктор', function () {
    cy.get(burgerConstructor).contains('Булка').should('not.exist');
    cy.get(burgerConstructor).contains('Котлета_1').should('not.exist');
    cy.get(burgerConstructor).contains('Соус_1').should('not.exist');

    cy.get(bun).contains('Добавить').click();
    cy.get(main).contains('Добавить').click();
    cy.get(sauce).contains('Добавить').click();

    cy.get(burgerConstructor).contains('Булка').should('exist');
    cy.get(burgerConstructor).contains('Котлета_1').should('exist');
    cy.get(burgerConstructor).contains('Соус_1').should('exist');
  });
});
