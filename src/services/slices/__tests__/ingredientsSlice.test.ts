import ingredientsReducer, { getIngredients, initialState } from '../ingredientsSlice';

import type { TIngredient } from '@utils-types';

const ingredients: TIngredient[] = [
  {
    _id: 'bun-id',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: '/bun.png',
    image_large: '/bun-large.png',
    image_mobile: '/bun-mobile.png',
  },
];

describe('редьюсер ingredientsSlice', () => {
  it('возвращает начальное состояние для неизвестного экшена', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('включает загрузку при начале запроса ингредиентов', () => {
    expect(
      ingredientsReducer(initialState, getIngredients.pending('request-id'))
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('сохраняет ингредиенты после успешного запроса', () => {
    expect(
      ingredientsReducer(
        initialState,
        getIngredients.fulfilled(ingredients, 'request-id')
      )
    ).toEqual({
      ...initialState,
      ingredients,
    });
  });

  it('сохраняет ошибку после неудачного запроса', () => {
    expect(
      ingredientsReducer(
        initialState,
        getIngredients.rejected(
          new Error('Не удалось загрузить ингредиенты'),
          'request-id'
        )
      )
    ).toEqual({
      ...initialState,
      error: 'Не удалось загрузить ингредиенты',
    });
  });
});
