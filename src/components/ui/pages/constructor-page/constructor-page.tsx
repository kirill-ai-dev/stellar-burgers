import { clsx } from 'clsx';

import type { ConstructorPageUIProps } from './type';

import styles from './constructor-page.module.css';

/** Отображает визуальный каркас главной страницы конструктора. */
export const ConstructorPageUI = ({
  burgerIngredients,
  burgerConstructor,
}: ConstructorPageUIProps): React.JSX.Element => (
  <main className={styles.containerMain}>
    <h1 className={clsx(styles.title, 'text text_type_main-large mt-10 mb-5 pl-5')}>
      Соберите бургер
    </h1>
    <div className={clsx(styles.main, 'pl-5 pr-5')}>
      {burgerIngredients}
      {burgerConstructor}
    </div>
  </main>
);
