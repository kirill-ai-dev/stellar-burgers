import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { logoutUser } from './userSlice';

import type { TOrder } from '@utils-types';

/** Состояние приватной истории заказов. */
type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  currentRequestId: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null,
  currentRequestId: null,
};

/** Загружает историю заказов авторизованного пользователя. */
export const getProfileOrders = createAsyncThunk('profileOrders/getAll', getOrdersApi);

/** Управляет историей заказов и игнорирует результаты прерванных thunk-действий. */
const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.isLoading = false;
        state.orders = action.payload;
        state.currentRequestId = null;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.isLoading = false;
        state.currentRequestId = null;
        if (!action.meta.aborted) {
          state.error = action.error.message ?? 'Не удалось загрузить историю заказов';
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.orders = [];
        state.isLoading = false;
        state.error = null;
        state.currentRequestId = null;
      });
  },
});

export default profileOrdersSlice.reducer;
