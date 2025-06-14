import {
  bun,
  burgerConstructor,
  main,
  sauce
} from '../burger-constructor/burger-constructor.cy';
import { modal, modalClose } from '../modal/modal.cy';

const submitOrderButton = '[data-cy="orderButton"]';
const orderNumber = '[data-cy="orderNumber"]';

describe('Проверка создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test refreshToken')
    );
    cy.setCookie('accessToken', 'test accessToken');

    cy.visit('/');
    cy.viewport(1680, 1024);
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Проверка добавления ингредиентов в конструктор, оформление заказа и очистки конструктора', () => {
    cy.get(bun).contains('Добавить').click();
    cy.get(main).contains('Добавить').click();
    cy.get(sauce).contains('Добавить').click();
    cy.get(burgerConstructor).contains('Булка').should('exist');
    cy.get(burgerConstructor).contains('Котлета_1').should('exist');
    cy.get(burgerConstructor).contains('Соус_1').should('exist');
    cy.get(burgerConstructor).contains('Булка').should('exist');

    cy.get(submitOrderButton).click();
    cy.get(modal).should('be.visible');
    cy.get(orderNumber).contains('81043');
    cy.get(modalClose).click();
    cy.get(modal).should('not.exist');

    cy.get(burgerConstructor).contains('Булка').should('not.exist');
    cy.get(burgerConstructor).contains('Котлета_1').should('not.exist');
    cy.get(burgerConstructor).contains('Соус_1').should('not.exist');
  });
});
