import ingredientsReducer, { getIngredients } from '../ingredientsSlice';

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

describe('ingredientsSlice reducer', () => {
  it('returns the initial state for an unknown action', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
    });
  });

  it('sets loading state when ingredients request starts', () => {
    expect(ingredientsReducer(undefined, getIngredients.pending('request-id'))).toEqual({
      ingredients: [],
      isLoading: true,
      error: null,
    });
  });

  it('stores ingredients after a successful request', () => {
    expect(
      ingredientsReducer(undefined, getIngredients.fulfilled(ingredients, 'request-id'))
    ).toEqual({
      ingredients,
      isLoading: false,
      error: null,
    });
  });

  it('stores the request error after a failed request', () => {
    expect(
      ingredientsReducer(
        undefined,
        getIngredients.rejected(
          new Error('Не удалось загрузить ингредиенты'),
          'request-id'
        )
      )
    ).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Не удалось загрузить ингредиенты',
    });
  });
});
