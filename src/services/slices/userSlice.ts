import {
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  updateUserApi,
  type TLoginData,
  type TRegisterData,
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteCookie, getCookie, setCookie } from '@utils/cookie';

import type { TUser } from '@utils-types';

/** Состояние пользователя, авторизации и редактирования профиля. */
type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  authError: string | null;
  profileError: string | null;
  logoutError: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  authError: null,
  profileError: null,
  logoutError: null,
};

/** Сохраняет токены сессии в предназначенных для них браузерных хранилищах. */
const saveTokens = (accessToken: string, refreshToken: string): void => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

/** Регистрирует пользователя и сохраняет полученные токены. */
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    saveTokens(response.accessToken, response.refreshToken);
    return response.user;
  }
);

/** Авторизует пользователя и сохраняет полученные токены. */
export const loginUser = createAsyncThunk('user/login', async (data: TLoginData) => {
  const response = await loginUserApi(data);
  saveTokens(response.accessToken, response.refreshToken);
  return response.user;
});

/** Проверяет локальную сессию и при наличии токена загружает профиль. */
export const checkUserAuth = createAsyncThunk('user/checkAuth', async () => {
  const accessToken = getCookie('accessToken');
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if (!accessToken && !storedRefreshToken) {
    throw new Error('Пользователь не авторизован');
  }

  if (!accessToken) {
    await refreshToken();
  }

  const response = await getUserApi();
  return response.user;
});

/** Обновляет персональные данные текущего пользователя. */
export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

/** Завершает сессию и удаляет локальные токены после успешного ответа сервера. */
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

/** Управляет профилем, состоянием авторизации и ошибками пользовательских запросов. */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.authError = null;
    },
    clearProfileError: (state) => {
      state.profileError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, setAuthPending)
      .addCase(loginUser.pending, setAuthPending)
      .addCase(updateUser.pending, setProfilePending)
      .addCase(logoutUser.pending, setLogoutPending)
      .addCase(registerUser.fulfilled, setAuthUser)
      .addCase(loginUser.fulfilled, setAuthUser)
      .addCase(updateUser.fulfilled, setProfileUser)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.authError = null;
        state.profileError = null;
        state.logoutError = null;
      })
      .addCase(registerUser.rejected, setAuthRejected)
      .addCase(loginUser.rejected, setAuthRejected)
      .addCase(updateUser.rejected, setProfileRejected)
      .addCase(logoutUser.rejected, setLogoutRejected);
  },
});

/** Переводит пользовательский запрос в состояние загрузки. */
const setAuthPending = (state: TUserState): void => {
  state.isLoading = true;
  state.authError = null;
};

/** Переводит запрос профиля в состояние загрузки. */
const setProfilePending = (state: TUserState): void => {
  state.isLoading = true;
  state.profileError = null;
};

/** Переводит выход из аккаунта в состояние загрузки. */
const setLogoutPending = (state: TUserState): void => {
  state.isLoading = true;
  state.logoutError = null;
};

/** Сохраняет профиль и завершает пользовательский запрос. */
const setUser = (state: TUserState, user: TUser): void => {
  state.user = user;
  state.isAuthChecked = true;
  state.isLoading = false;
};

/** Сохраняет профиль после успешной регистрации или авторизации. */
const setAuthUser = (state: TUserState, action: { payload: TUser }): void => {
  setUser(state, action.payload);
  state.authError = null;
};

/** Сохраняет профиль после успешного обновления персональных данных. */
const setProfileUser = (state: TUserState, action: { payload: TUser }): void => {
  setUser(state, action.payload);
  state.profileError = null;
};

/** Сохраняет ошибку регистрации или входа. */
const setAuthRejected = (
  state: TUserState,
  action: { error: { message?: string } }
): void => {
  state.isLoading = false;
  state.authError = action.error.message ?? 'Не удалось выполнить запрос';
};

/** Сохраняет ошибку обновления профиля. */
const setProfileRejected = (
  state: TUserState,
  action: { error: { message?: string } }
): void => {
  state.isLoading = false;
  state.profileError = action.error.message ?? 'Не удалось обновить профиль';
};

/** Сохраняет ошибку выхода из аккаунта. */
const setLogoutRejected = (
  state: TUserState,
  action: { error: { message?: string } }
): void => {
  state.isLoading = false;
  state.logoutError = action.error.message ?? 'Не удалось выйти из аккаунта';
};

/** Очищает ошибки отдельных пользовательских сценариев. */
export const { clearAuthError, clearProfileError } = userSlice.actions;
export default userSlice.reducer;
