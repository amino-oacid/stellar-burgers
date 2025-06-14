import { getFeedsApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { TOrder } from '@utils-types';

type InitialStateType = {
  feedsList: Array<TOrder>;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

export const initialState: InitialStateType = {
  feedsList: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async (_, thunkObject) => {
    const dispatch = thunkObject.dispatch as AppDispatch;
    const response = await getFeedsApi();
    dispatch(saveFeeds(response));
    return response;
  }
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    saveFeeds(state, action: PayloadAction<TFeedsResponse>) {
      state.feedsList = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  selectors: {
    feedsListSelector: (state) => state.feedsList,
    feedsTotalSelector: (state) => state.total,
    feedsTotalTodaySelector: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFeeds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.feedsList = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { saveFeeds } = feedsSlice.actions;
export const {
  feedsListSelector,
  feedsTotalSelector,
  feedsTotalTodaySelector
} = feedsSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
