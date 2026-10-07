import type { TIngredient } from '@utils-types';

/** Свойства контейнера категории ингредиентов. */
export type TIngredientsCategoryProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
  ref?: React.Ref<HTMLUListElement>;
} & Omit<React.HTMLAttributes<HTMLUListElement>, 'title'>;
