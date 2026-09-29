/** Допустимые категории ингредиентов. */
export type TIngredientType = 'bun' | 'sauce' | 'main';

/** Допустимые серверные статусы заказа. */
export type TOrderStatus = 'created' | 'pending' | 'done' | 'canceled' | 'cancelled';

/** Ингредиент, полученный из каталога API. */
export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

/** Ингредиент конструктора с локальным идентификатором экземпляра. */
export type TConstructorIngredient = TIngredient & {
  id: string;
};

/** Заказ пользователя или публичной ленты. */
export type TOrder = {
  _id: string;
  status: TOrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

/** Публичные данные профиля пользователя. */
export type TUser = {
  email: string;
  name: string;
};

/** Допустимые категории вкладок каталога ингредиентов. */
export type TTabMode = TIngredientType;

/** Состояние собираемого бургера. */
export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

/** Состояние публичной ленты заказов. */
export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
  currentRequestId: string | null;
};
