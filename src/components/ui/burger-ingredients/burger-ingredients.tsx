import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import type { BurgerIngredientsUIProps } from './type';

import styles from './burger-ingredients.module.css';

/** Отображает вкладки и прокручиваемые категории каталога ингредиентов. */
export const BurgerIngredientsUI = memo(function BurgerIngredientsUI({
  currentTab,
  children,
  onTabClick,
}: BurgerIngredientsUIProps): React.JSX.Element {
  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
              Булки
            </Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
              Начинки
            </Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
              Соусы
            </Tab>
          </ul>
        </nav>
        <div className={styles.content} data-testid="ingredients-content">
          {children}
        </div>
      </section>
    </>
  );
});
