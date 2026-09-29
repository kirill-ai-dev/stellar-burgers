import { BurgerConstructorElementUI } from '@ui';
import { memo } from 'react';

import { moveIngredient, removeIngredient } from '@services/slices/constructorSlice';
import { useDispatch } from '@services/store';

import type { BurgerConstructorElementProps } from './type';

/** Управляет перемещением и удалением одной начинки в конструкторе. */
export const BurgerConstructorElement = memo(function BurgerConstructorElement({
  ingredient,
  index,
  totalItems,
}: BurgerConstructorElementProps): React.JSX.Element {
  const dispatch = useDispatch();
  /** Перемещает начинку на одну позицию вниз. */
  const handleMoveDown = (): void => {
    dispatch(moveIngredient({ from: index, to: index + 1 }));
  };

  /** Перемещает начинку на одну позицию вверх. */
  const handleMoveUp = (): void => {
    dispatch(moveIngredient({ from: index, to: index - 1 }));
  };

  /** Удаляет конкретный экземпляр начинки из конструктора. */
  const handleClose = (): void => {
    dispatch(removeIngredient(ingredient.id));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleClose}
    />
  );
});
