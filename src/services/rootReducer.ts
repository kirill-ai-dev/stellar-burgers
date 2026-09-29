import { combineReducers } from '@reduxjs/toolkit';

import burgerConstructor from './slices/constructorSlice';
import feed from './slices/feedSlice';
import ingredients from './slices/ingredientsSlice';
import orderDetails from './slices/orderDetailsSlice';
import order from './slices/orderSlice';
import passwordRecovery from './slices/passwordRecoverySlice';
import profileOrders from './slices/profileOrdersSlice';
import user from './slices/userSlice';

/** Объединяет независимые области состояния приложения в корневой редьюсер. */
export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  order,
  feed,
  profileOrders,
  orderDetails,
  passwordRecovery,
  user,
});
