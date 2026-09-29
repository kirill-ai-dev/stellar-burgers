import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@utils-types';

/** Состояние процесса оформления заказа. */
type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null,
};

/** Отправляет состав бургера и создаёт новый заказ. */
export const createOrder = createAsyncThunk('order/create', orderBurgerApi);

/** Управляет процессом оформления заказа и данными результата. */
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        if (!action.meta.aborted) {
          state.error = action.error.message ?? 'Не удалось оформить заказ';
        }
      });
  },
});

/** Очищает данные и ошибки последнего оформленного заказа. */
export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
