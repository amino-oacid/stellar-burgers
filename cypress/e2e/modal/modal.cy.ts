import { bun } from '../burger-constructor/burger-constructor.cy';
export const modal = '[data-cy="modal"]';
export const modalClose = '[data-cy="modalClose"]';
const modalCloseOverlay = '[data-cy="modalCloseOverlay"]';

describe('Проверка модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('/');
    cy.viewport(1680, 1024);
  });

  it('Проверка открытия модального окна', () => {
    cy.get(bun).click();
    cy.get(modal).should('be.visible');
  });

  it('Проверка закрытия модального окна по клику на крестик', () => {
    cy.get(bun).click();
    cy.get(modal).should('be.visible');
    cy.get(modalClose).click();
    cy.get(modal).should('not.exist');
  });

  it('Проверка закрытия модального окна по клику на оверлей', () => {
    cy.get(bun).click();
    cy.get(modal).should('be.visible');
    cy.get(modalCloseOverlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });
});
