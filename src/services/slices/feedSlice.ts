import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TFeedState } from '@utils-types';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  currentRequestId: null,
};

/** Загружает публичную ленту заказов. */
export const getFeeds = createAsyncThunk('feed/getAll', getFeedsApi);

/** Управляет заказами публичной ленты и защищает данные от устаревших ответов. */
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.currentRequestId = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.isLoading = false;
        state.currentRequestId = null;
        if (!action.meta.aborted) {
          state.error = action.error.message ?? 'Не удалось загрузить ленту заказов';
        }
      });
  },
});

export default feedSlice.reducer;
