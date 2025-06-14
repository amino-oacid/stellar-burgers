import { TConstructorIngredient } from '@utils-types';
import {
  addIngredient,
  burgerConstructorSlice,
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp
} from './burger-constructor-slice';

describe('Проверка слайса конструктора бургера', () => {
  const ingredient1: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const ingredient2: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const bun: TConstructorIngredient = {
    id: '3',
    _id: '3',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  it('Проверка добавления ингредиента в конструктор', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient1
    });
  });

  it('Проверка добавления булки в конструктор', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(newState.bun).toEqual({
      ...bun
    });
  });

  it('Проверка удаления ингредиента из конструктора', () => {
    const initialState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      deleteIngredient(0)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient2
    });
  });

  it('Проверка перемещения ингредиента вверх', () => {
    const initialState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveIngredientUp(1)
    );

    expect(newState.ingredients[0]).toEqual({
      ...ingredient2
    });

    expect(newState.ingredients[1]).toEqual({
      ...ingredient1
    });
  });

  it('Проверка перемещения ингредиента вниз', () => {
    const initialState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveIngredientDown(0)
    );

    expect(newState.ingredients[1]).toEqual({
      ...ingredient1
    });
    expect(newState.ingredients[0]).toEqual({
      ...ingredient2
    });
  });
});
