import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

import { rootReducer } from './rootReducer';

/** Глобальное Redux-хранилище приложения. */
const store = configureStore({
  reducer: rootReducer,
});

/** Полный тип состояния Redux-хранилища. */
export type RootState = ReturnType<typeof rootReducer>;

/** Тип функции `dispatch` с поддержкой thunk-действий приложения. */
export type AppDispatch = typeof store.dispatch;

/** Типизированный хук отправки Redux-действий. */
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
/** Типизированный хук чтения данных из Redux-хранилища. */
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
