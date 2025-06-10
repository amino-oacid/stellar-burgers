import { TOrderResponse } from '@api';
import { TOrder } from '@utils-types';
import {
  fetchOrders,
  getOrderRequest,
  initialState,
  ordersReducer
} from './orders-slice';

const mockOrder: TOrder = {
  _id: '12345',
  status: 'done',
  name: 'Test Order',
  createdAt: '2024-09-12T00:00:00Z',
  updatedAt: '2024-09-12T00:00:00Z',
  number: 1,
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943']
};

const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: [mockOrder]
};

describe('Проверка асинхронных экшенов слайса заказа', () => {
  it('Проверка получения заказа (pending, fulfilled, rejected)', async () => {
    let state = ordersReducer(
      initialState,
      getOrderRequest.pending('pending', 1)
    );
    expect(state.loading).toBe(true);

    state = ordersReducer(
      initialState,
      getOrderRequest.rejected(new Error('error'), 'rejected', 1)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');

    state = ordersReducer(
      initialState,
      getOrderRequest.fulfilled(mockOrderResponse, 'fulfilled', 1)
    );
    expect(state.loading).toBe(false);
    expect(state.orderDetailsData).toEqual(mockOrder);
  });

  it('Проверка получения заказов пользователя (pending, fulfilled, rejected)', () => {
    let state = ordersReducer(initialState, fetchOrders.pending('requestId'));
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);

    state = ordersReducer(
      state,
      fetchOrders.fulfilled(mockOrderResponse.orders, 'requestId')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ordersList).toEqual(mockOrderResponse.orders);

    state = ordersReducer(
      state,
      fetchOrders.rejected(new Error('error'), 'requestId')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
  });
});
