import type { TConstructorState } from './types';

/** Рассчитывает количество выбранных экземпляров каждого ингредиента. */
export const getIngredientCounters = (
  burgerConstructor: TConstructorState
): Record<string, number> => {
  const counters = burgerConstructor.ingredients.reduce<Record<string, number>>(
    (result, ingredient) => ({
      ...result,
      [ingredient._id]: (result[ingredient._id] ?? 0) + 1,
    }),
    {}
  );

  if (!burgerConstructor.bun) return counters;
  return { ...counters, [burgerConstructor.bun._id]: 2 };
};
