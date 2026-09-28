import { selectConstructor, selectIngredients } from '@selectors';
import { BurgerIngredientsUI } from '@ui';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSelector } from '@services/store';
import { getIngredientCounters } from '@utils/constructor';

import { IngredientsCategory } from '../ingredients-category';

import type { TIngredient, TTabMode } from '@utils-types';

/** Группирует ингредиенты по категориям и синхронизирует активную вкладку со скроллом. */
export const BurgerIngredients = (): React.JSX.Element => {
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);
  const ingredients = useSelector(selectIngredients);
  const burgerConstructor = useSelector(selectConstructor);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  /** Прокручивает список к категории, выбранной пользователем. */
  const onTabClick = (tab: string): void => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun') titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main') titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce') titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const buns = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === 'bun'),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === 'main'),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === 'sauce'),
    [ingredients]
  );

  const ingredientsCounters = useMemo(
    () => getIngredientCounters(burgerConstructor),
    [burgerConstructor]
  );

  return (
    <BurgerIngredientsUI currentTab={currentTab} onTabClick={onTabClick}>
      <IngredientsCategory
        title="Булки"
        titleRef={titleBunRef}
        ingredients={buns}
        ingredientsCounters={ingredientsCounters}
        ref={bunsRef}
        data-testid="bun-ingredients"
      />
      <IngredientsCategory
        title="Начинки"
        titleRef={titleMainRef}
        ingredients={mains}
        ingredientsCounters={ingredientsCounters}
        ref={mainsRef}
        data-testid="mains-ingredients"
      />
      <IngredientsCategory
        title="Соусы"
        titleRef={titleSaucesRef}
        ingredients={sauces}
        ingredientsCounters={ingredientsCounters}
        ref={saucesRef}
        data-testid="sauces-ingredients"
      />
    </BurgerIngredientsUI>
  );
};
