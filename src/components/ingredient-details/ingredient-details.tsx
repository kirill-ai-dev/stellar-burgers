import { selectIngredientsState } from '@selectors';
import { IngredientDetailsUI, PageMessage, Preloader } from '@ui';
import { useParams } from 'react-router-dom';

import { useSelector } from '@services/store';

/** Находит ингредиент из URL в каталоге и отображает его пищевую ценность. */
export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams();
  const { ingredients, isLoading, error } = useSelector(selectIngredientsState);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <PageMessage text={error} />;
  }

  if (!ingredientData) {
    return <PageMessage text="Ингредиент не найден" />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
