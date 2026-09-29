import { IngredientsCategoryUI } from '@ui';

import { BurgerIngredient } from '../burger-ingredient';

import type { TIngredientsCategoryProps } from './type';

/** Связывает карточки ингредиентов одной категории с подготовленными счётчиками. */
export const IngredientsCategory = ({
  title,
  titleRef,
  ingredients,
  ingredientsCounters,
  ref,
  ...rest
}: TIngredientsCategoryProps): React.JSX.Element => {
  return (
    <IngredientsCategoryUI title={title} titleRef={titleRef} ref={ref} {...rest}>
      {ingredients.map((ingredient) => (
        <BurgerIngredient
          ingredient={ingredient}
          key={ingredient._id}
          count={ingredientsCounters[ingredient._id]}
        />
      ))}
    </IngredientsCategoryUI>
  );
};
