import type { TIngredient } from '@utils-types';
import type { Location } from 'react-router-dom';

/** Данные визуальной карточки ингредиента. */
export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
