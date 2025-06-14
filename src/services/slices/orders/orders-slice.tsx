import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { TOrder } from '@utils-types';

type InitialStateType = {
  orderRequest: boolean;
  orderModalData: TNewOrderResponse | null;
  ordersList: Array<TOrder>;
  orderDetailsData: TOrder | null;
  loading: boolean;
  error: string | null;
};

export const initialState: InitialStateType = {
  orderRequest: false,
  orderModalData: null,
  ordersList: [],
  orderDetailsData: null,
  loading: false,
  error: null
};

export const makeOrderRequest = createAsyncThunk(
  'orders/makeOrderRequest',
  async (data: string[], thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    dispatch(startOrderRequest());
    const response = await orderBurgerApi(data);
    dispatch(endOrderRequest(response));
    return response;
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await getOrdersApi();
    dispatch(saveOrders(response));
    return response;
  }
);

export const getOrderRequest = createAsyncThunk(
  'orders/getOrderRequest',
  async (data: number, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await getOrderByNumberApi(data);
    dispatch(saveOrderDetailsData(response.orders[0]));
    return response;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    startOrderRequest(state) {
      state.orderRequest = true;
    },
    endOrderRequest(state, action: PayloadAction<TNewOrderResponse>) {
      state.orderRequest = false;
      state.orderModalData = action.payload;
    },
    clearOrderModalData(state) {
      state.orderModalData = null;
      state.orderRequest = false;
    },
    saveOrders(state, action: PayloadAction<Array<TOrder>>) {
      state.ordersList = action.payload;
    },
    clearOrders(state) {
      state.ordersList = [];
    },
    saveOrderDetailsData(state, action: PayloadAction<TOrder>) {
      state.orderDetailsData = action.payload;
    }
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    ordersListSelector: (state) => state.ordersList,
    orderDetailsDataSelector: (state) => state.orderDetailsData
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderRequest.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getOrderRequest.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
    });
    builder.addCase(getOrderRequest.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.orderDetailsData = action.payload.orders[0];
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.ordersList = action.payload;
    });
  }
});

export const {
  startOrderRequest,
  endOrderRequest,
  clearOrderModalData,
  saveOrders,
  clearOrders,
  saveOrderDetailsData
} = ordersSlice.actions;
export const {
  orderRequestSelector,
  orderModalDataSelector,
  ordersListSelector,
  orderDetailsDataSelector
} = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
