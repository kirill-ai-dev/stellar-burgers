import type { TIngredient, TOrder } from './types';

/** Заказ, дополненный данными для краткой карточки. */
export type TOrderCardInfo = TOrder & {
  ingredientsInfo: TIngredient[];
  ingredientsToShow: TIngredient[];
  remains: number;
  total: number;
  date: Date;
};

/** Ингредиент заказа с количеством повторений. */
export type TOrderIngredient = TIngredient & { count: number };

/** Заказ, дополненный данными для экрана подробностей. */
export type TOrderDetailsInfo = TOrder & {
  ingredientsInfo: Record<string, TOrderIngredient>;
  total: number;
  date: Date;
};

const UNKNOWN_STATUS = {
  color: '#F2F2F3',
  text: 'Неизвестен',
};

const ORDER_STATUS_META: Record<string, { color: string; text: string }> = {
  pending: { color: '#E52B1A', text: 'Готовится' },
  done: { color: '#00CCCC', text: 'Выполнен' },
  created: { color: '#F2F2F3', text: 'Создан' },
  canceled: { color: '#E52B1A', text: 'Отменён' },
  cancelled: { color: '#E52B1A', text: 'Отменён' },
};

/** Возвращает подпись и цвет для серверного статуса заказа. */
export const getOrderStatusMeta = (status: string): { color: string; text: string } =>
  ORDER_STATUS_META[status] ?? UNKNOWN_STATUS;

/** Создаёт индекс ингредиентов для быстрых повторных обращений по идентификатору. */
const createIngredientIndex = (
  ingredients: TIngredient[]
): Record<string, TIngredient> =>
  Object.fromEntries(ingredients.map((ingredient) => [ingredient._id, ingredient]));

/** Преобразует идентификаторы состава заказа в существующие ингредиенты каталога. */
const resolveOrderIngredients = (
  ingredientIds: string[],
  ingredientIndex: Record<string, TIngredient>
): TIngredient[] =>
  ingredientIds.flatMap((ingredientId) => {
    const ingredient = ingredientIndex[ingredientId];
    return ingredient ? [ingredient] : [];
  });

/** Рассчитывает стоимость последовательности ингредиентов. */
const calculateIngredientsTotal = (ingredients: TIngredient[]): number =>
  ingredients.reduce((total, ingredient) => total + ingredient.price, 0);

/** Формирует данные заказа для карточки в ленте или истории. */
export const createOrderCardInfo = (
  order: TOrder,
  ingredients: TIngredient[],
  maxIngredients: number
): TOrderCardInfo => {
  const ingredientsInfo = resolveOrderIngredients(
    order.ingredients,
    createIngredientIndex(ingredients)
  );

  return {
    ...order,
    ingredientsInfo,
    ingredientsToShow: ingredientsInfo.slice(0, maxIngredients),
    remains: Math.max(ingredientsInfo.length - maxIngredients, 0),
    total: calculateIngredientsTotal(ingredientsInfo),
    date: new Date(order.createdAt),
  };
};

/** Формирует сгруппированный состав и итоговую стоимость подробностей заказа. */
export const createOrderDetailsInfo = (
  order: TOrder,
  ingredients: TIngredient[]
): TOrderDetailsInfo => {
  const ingredientIndex = createIngredientIndex(ingredients);
  const ingredientsInfo = order.ingredients.reduce<Record<string, TOrderIngredient>>(
    (groupedIngredients, ingredientId) => {
      const existingIngredient = groupedIngredients[ingredientId];
      if (existingIngredient) {
        return {
          ...groupedIngredients,
          [ingredientId]: {
            ...existingIngredient,
            count: existingIngredient.count + 1,
          },
        };
      }

      const ingredient = ingredientIndex[ingredientId];
      return ingredient
        ? {
            ...groupedIngredients,
            [ingredientId]: { ...ingredient, count: 1 },
          }
        : groupedIngredients;
    },
    {}
  );

  const total = Object.values(ingredientsInfo).reduce(
    (sum, ingredient) => sum + ingredient.price * ingredient.count,
    0
  );

  return {
    ...order,
    ingredientsInfo,
    total,
    date: new Date(order.createdAt),
  };
};
