import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@utils-types';

/** Состояние подробностей открытого заказа. */
type TOrderDetailsState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderDetailsState = {
  order: null,
  isLoading: false,
  error: null,
};

/** Загружает подробности заказа по его номеру. */
export const getOrderByNumber = createAsyncThunk(
  'orderDetails/getByNumber',
  getOrderByNumberApi
);

/** Управляет данными заказа, открытого на отдельной странице или в модальном окне. */
const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders[0] ?? null;
        if (!state.order) state.error = 'Заказ не найден';
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        if (!action.meta.aborted) {
          state.error = action.error.message ?? 'Не удалось загрузить заказ';
        }
      });
  },
});

/** Очищает данные заказа при закрытии страницы или модального окна. */
export const { clearOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
