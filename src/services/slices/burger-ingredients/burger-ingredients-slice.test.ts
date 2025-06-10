import { TIngredient } from '@utils-types';
import {
  burgerIngredientsReducer,
  fetchIngredients,
  initialState
} from './burger-ingredients-slice';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0946',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
  }
];

describe('Проверка асинхронных экшенов слайса ингредиентов', () => {
  const expectedResult = mockIngredients;

  it('Проверка получения ингредиентов', async () => {
    const state = burgerIngredientsReducer(
      initialState,
      fetchIngredients.fulfilled(expectedResult, 'fulfilled')
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(expectedResult);
  });

  it('Проверка сообщения ошибки при rejected', async () => {
    const state = burgerIngredientsReducer(
      initialState,
      fetchIngredients.rejected(new Error('error'), 'rejected')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
  });

  it('Проверка загрузки при pending', async () => {
    const state = burgerIngredientsReducer(
      initialState,
      fetchIngredients.pending('pending')
    );
    expect(state.loading).toBe(true);
  });
});
