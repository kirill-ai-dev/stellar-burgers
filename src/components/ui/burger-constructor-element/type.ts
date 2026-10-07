import type { TConstructorIngredient } from '@utils-types';

/** Свойства визуального элемента начинки в конструкторе. */
export type BurgerConstructorElementUIProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: () => void;
};
