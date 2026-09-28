import { BurgerIngredients, BurgerConstructor } from '@components';
import { selectIngredientsState } from '@selectors';
import { PageMessage, Preloader } from '@ui';
import { ConstructorPageUI } from '@ui-pages';

import { useSelector } from '@services/store';

/** Отображает каталог ингредиентов и конструктор после загрузки данных. */
export const ConstructorPage = (): React.JSX.Element => {
  const { ingredients, isLoading, error } = useSelector(selectIngredientsState);

  if (isLoading) return <Preloader />;
  if (error) return <PageMessage text={error} extraClass="mt-30" />;
  if (!ingredients.length) {
    return <PageMessage text="Нет ингредиентов" extraClass="mt-30" />;
  }

  return (
    <ConstructorPageUI
      burgerIngredients={<BurgerIngredients />}
      burgerConstructor={<BurgerConstructor />}
    />
  );
};
