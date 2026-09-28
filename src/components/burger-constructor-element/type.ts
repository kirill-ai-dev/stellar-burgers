import type { TConstructorIngredient } from '@utils-types';

/** Свойства экземпляра начинки в конструкторе. */
export type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
};
