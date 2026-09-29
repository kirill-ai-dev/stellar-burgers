import { forgotPasswordApi, resetPasswordApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/** Состояние восстановления доступа к аккаунту. */
type TPasswordRecoveryState = {
  isLoading: boolean;
  error: string | null;
};

const initialState: TPasswordRecoveryState = {
  isLoading: false,
  error: null,
};

/** Запрашивает отправку кода восстановления пароля. */
export const requestPasswordReset = createAsyncThunk(
  'passwordRecovery/request',
  forgotPasswordApi
);

/** Устанавливает новый пароль по коду восстановления. */
export const resetPassword = createAsyncThunk(
  'passwordRecovery/reset',
  resetPasswordApi
);

/** Управляет двумя шагами восстановления пароля и их состоянием запроса. */
const passwordRecoverySlice = createSlice({
  name: 'passwordRecovery',
  initialState,
  reducers: {
    clearPasswordRecoveryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordReset.pending, setPending)
      .addCase(resetPassword.pending, setPending)
      .addCase(requestPasswordReset.fulfilled, setFulfilled)
      .addCase(resetPassword.fulfilled, setFulfilled)
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Не удалось отправить письмо для восстановления';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось установить новый пароль';
      });
  },
});

/** Переводит запрос восстановления пароля в состояние загрузки. */
const setPending = (state: TPasswordRecoveryState): void => {
  state.isLoading = true;
  state.error = null;
};

/** Завершает успешный запрос восстановления пароля. */
const setFulfilled = (state: TPasswordRecoveryState): void => {
  state.isLoading = false;
  state.error = null;
};

export const { clearPasswordRecoveryError } = passwordRecoverySlice.actions;
export default passwordRecoverySlice.reducer;
