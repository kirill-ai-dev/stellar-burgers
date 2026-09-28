import { BurgerIngredientUI } from '@ui';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { addIngredient } from '@services/slices/constructorSlice';
import { useDispatch } from '@services/store';

import type { TBurgerIngredientProps } from './type';

/** Связывает карточку ингредиента с добавлением в Redux-конструктор. */
export const BurgerIngredient = memo(function BurgerIngredient({
  ingredient,
  count,
}: TBurgerIngredientProps): React.JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch();

  /** Добавляет выбранный ингредиент в конструктор. */
  const handleAdd = (): void => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      locationState={{ background: location }}
      handleAdd={handleAdd}
    />
  );
});
