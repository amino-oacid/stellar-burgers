import { feedsReducer, fetchFeeds, initialState } from './feeds-slice';
import { TFeedsResponse } from '@api';

const mockFeeds: TFeedsResponse = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-09-02T13:46:25.234Z',
      updatedAt: '2024-09-02T13:46:25.914Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
      createdAt: '2024-09-02T07:36:55.648Z',
      updatedAt: '2024-09-02T07:36:56.126Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: '2024-09-02T07:34:44.831Z',
      updatedAt: '2024-09-02T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('Проверка асинхронных экшенов слайса ленты заказов', () => {
  const expectedResult = mockFeeds;

  it('Проверка получения заказов', async () => {
    const state = feedsReducer(
      initialState,
      fetchFeeds.fulfilled(expectedResult, 'fulfilled')
    );
    expect(state.loading).toBe(false);
    expect(state.feedsList).toEqual(expectedResult.orders);
    expect(state.total).toEqual(expectedResult.total);
    expect(state.totalToday).toEqual(expectedResult.totalToday);
  });

  it('Проверка сообщения ошибки при rejected', async () => {
    const state = feedsReducer(
      initialState,
      fetchFeeds.rejected(new Error('error'), 'rejected')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
  });

  it('Проверка загрузки при pending', async () => {
    const state = feedsReducer(initialState, fetchFeeds.pending('pending'));
    expect(state.loading).toBe(true);
  });
});
