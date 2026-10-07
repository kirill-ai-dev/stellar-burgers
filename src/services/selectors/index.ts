import type { RootState } from '@services/store';

/** Возвращает каталог ингредиентов вместе с состоянием запроса. */
export const selectIngredientsState = (state: RootState): RootState['ingredients'] =>
  state.ingredients;
/** Возвращает массив загруженных ингредиентов. */
export const selectIngredients = (
  state: RootState
): RootState['ingredients']['ingredients'] => state.ingredients.ingredients;
/** Возвращает выбранную булку и начинки конструктора. */
export const selectConstructor = (state: RootState): RootState['burgerConstructor'] =>
  state.burgerConstructor;
/** Возвращает состояние оформления заказа. */
export const selectOrderState = (state: RootState): RootState['order'] => state.order;
/** Возвращает публичную ленту и статистику заказов. */
export const selectFeed = (state: RootState): RootState['feed'] => state.feed;
/** Возвращает приватную историю заказов. */
export const selectProfileOrders = (state: RootState): RootState['profileOrders'] =>
  state.profileOrders;
/** Возвращает подробности открытого заказа. */
export const selectOrderDetails = (state: RootState): RootState['orderDetails'] =>
  state.orderDetails;
/** Возвращает профиль и состояние авторизации. */
export const selectUserState = (state: RootState): RootState['user'] => state.user;
/** Возвращает профиль текущего пользователя или `null`. */
export const selectUser = (state: RootState): RootState['user']['user'] =>
  state.user.user;
/** Возвращает состояние восстановления пароля. */
export const selectPasswordRecovery = (
  state: RootState
): RootState['passwordRecovery'] => state.passwordRecovery;
