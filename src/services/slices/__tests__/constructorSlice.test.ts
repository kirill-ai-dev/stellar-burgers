import constructorReducer, {
  addIngredient,
  clearConstructor,
  moveIngredient,
  removeIngredient,
} from '../constructorSlice';

import type { TIngredient } from '@utils-types';

const bun: TIngredient = {
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
};

const sauce: TIngredient = {
  _id: 'sauce-id',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 100,
  price: 90,
  image: '/sauce.png',
  image_large: '/sauce-large.png',
  image_mobile: '/sauce-mobile.png',
};

const main: TIngredient = {
  _id: 'main-id',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 50,
  fat: 30,
  carbohydrates: 10,
  calories: 300,
  price: 1337,
  image: '/main.png',
  image_large: '/main-large.png',
  image_mobile: '/main-mobile.png',
};

describe('constructorSlice reducer', () => {
  it('returns the initial state for an unknown action', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN' })).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('adds a bun and creates an instance id', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toMatchObject(bun);
    expect(state.bun?.id).toEqual(expect.any(String));
    expect(state.ingredients).toEqual([]);
  });

  it('replaces the selected bun', () => {
    const firstState = constructorReducer(undefined, addIngredient(bun));
    const state = constructorReducer(
      firstState,
      addIngredient({ ...bun, _id: 'new-bun-id' })
    );

    expect(state.bun?._id).toBe('new-bun-id');
    expect(state.ingredients).toEqual([]);
  });

  it('adds non-bun ingredients in insertion order', () => {
    const firstState = constructorReducer(undefined, addIngredient(sauce));
    const state = constructorReducer(firstState, addIngredient(main));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients.map((ingredient) => ingredient._id)).toEqual([
      'sauce-id',
      'main-id',
    ]);
    expect(state.ingredients.every((ingredient) => ingredient.id)).toBe(true);
  });

  it('removes an ingredient by its instance id', () => {
    const addedState = constructorReducer(undefined, addIngredient(sauce));
    const ingredientId = addedState.ingredients[0].id;

    expect(constructorReducer(addedState, removeIngredient(ingredientId))).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('moves an ingredient to another position', () => {
    let state = constructorReducer(undefined, addIngredient(sauce));
    state = constructorReducer(state, addIngredient(main));
    state = constructorReducer(state, addIngredient({ ...main, _id: 'second-main-id' }));

    const movedState = constructorReducer(state, moveIngredient({ from: 0, to: 2 }));

    expect(movedState.ingredients.map((ingredient) => ingredient._id)).toEqual([
      'main-id',
      'second-main-id',
      'sauce-id',
    ]);
  });

  it('ignores invalid move positions', () => {
    const state = constructorReducer(undefined, addIngredient(sauce));

    expect(constructorReducer(state, moveIngredient({ from: 0, to: 5 }))).toEqual(state);
  });

  it('clears the complete constructor', () => {
    let state = constructorReducer(undefined, addIngredient(bun));
    state = constructorReducer(state, addIngredient(sauce));

    expect(constructorReducer(state, clearConstructor())).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
