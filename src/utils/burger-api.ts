import { setCookie, getCookie } from './cookie';

import type { TIngredient, TOrder, TUser } from './types';

const URL = process.env.BURGER_API_URL;

/**
 * Разбирает успешный ответ API или отклоняет промис ошибкой сервера.
 *
 * @param res - HTTP-ответ сервера.
 * @returns Десериализованное тело ответа.
 */
const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(toApiError(err)));

type TServerResponse<T = unknown> = {
  success: boolean;
} & T;

/**
 * Преобразует произвольный ответ API в объект `Error`.
 * Исходное тело сохраняется в `cause`, чтобы не терять данные для диагностики.
 *
 * @param payload - Тело ошибочного ответа.
 * @returns Нормализованная ошибка приложения.
 */
const toApiError = (payload: unknown): Error => {
  const message =
    typeof payload === 'object' &&
    payload !== null &&
    'message' in payload &&
    typeof (payload as { message: unknown }).message === 'string'
      ? (payload as { message: string }).message
      : 'Не удалось выполнить запрос к серверу';

  return new Error(message, { cause: payload });
};

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

/** Обновляет пару токенов и сохраняет её в браузере. */
export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(toApiError(refreshData));
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

/**
 * Выполняет авторизованный запрос и один раз повторяет его после обновления токена.
 *
 * @param url - Адрес ресурса API.
 * @param options - Параметры запроса, включая заголовок авторизации.
 * @returns Десериализованный ответ сервера.
 * @throws {Error} Если запрос или обновление токена завершились ошибкой.
 */
export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as Record<string, string>).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(toApiError(err));
    }
  }
};

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

/** Загружает полный каталог ингредиентов. */
export const getIngredientsApi = (): Promise<TIngredient[]> =>
  fetch(`${URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(toApiError(data));
    });

/** Загружает общую ленту заказов и агрегированную статистику. */
export const getFeedsApi = (): Promise<TFeedsResponse> =>
  fetch(`${URL}/orders/all`)
    .then((res) => checkResponse<TFeedsResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(toApiError(data));
    });

/** Загружает историю заказов текущего пользователя. */
export const getOrdersApi = (): Promise<TOrder[]> =>
  fetchWithRefresh<TFeedsResponse>(`${URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  }).then((data) => {
    if (data?.success) return data.orders;
    return Promise.reject(toApiError(data));
  });

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

/**
 * Создаёт заказ из выбранных ингредиентов.
 *
 * @param data - Идентификаторы ингредиентов в порядке сборки бургера.
 */
export const orderBurgerApi = (data: string[]): Promise<TNewOrderResponse> =>
  fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data,
    }),
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(toApiError(data));
  });

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

/**
 * Загружает заказ по публичному номеру.
 *
 * @param number - Номер заказа.
 */
export const getOrderByNumberApi = (number: number): Promise<TOrderResponse> =>
  fetch(`${URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse<TOrderResponse>(res));

/** Данные формы регистрации и обновления профиля. */
export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

/** Регистрирует пользователя и возвращает профиль с токенами. */
export const registerUserApi = (data: TRegisterData): Promise<TAuthResponse> =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(toApiError(data));
    });

/** Учётные данные формы входа. */
export type TLoginData = {
  email: string;
  password: string;
};

/** Авторизует пользователя по электронной почте и паролю. */
export const loginUserApi = (data: TLoginData): Promise<TAuthResponse> =>
  fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(toApiError(data));
    });

/** Запрашивает письмо с кодом восстановления пароля. */
export const forgotPasswordApi = (data: { email: string }): Promise<TServerResponse> =>
  fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(toApiError(data));
    });

/** Устанавливает новый пароль по коду подтверждения. */
export const resetPasswordApi = (data: {
  password: string;
  token: string;
}): Promise<TServerResponse> =>
  fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(toApiError(data));
    });

type TUserResponse = TServerResponse<{ user: TUser }>;

/** Возвращает профиль текущего авторизованного пользователя. */
export const getUserApi = (): Promise<TUserResponse> =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    headers: {
      authorization: getCookie('accessToken'),
    } as HeadersInit,
  });

/** Обновляет переданные поля профиля текущего пользователя. */
export const updateUserApi = (user: Partial<TRegisterData>): Promise<TUserResponse> =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(user),
  });

/** Завершает серверную сессию по refresh-токену. */
export const logoutApi = (): Promise<TServerResponse> =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then((res) => checkResponse<TServerResponse>(res));
