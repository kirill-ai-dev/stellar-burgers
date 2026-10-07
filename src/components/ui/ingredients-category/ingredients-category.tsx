import type { TIngredientsCategoryUIProps } from './type';

import styles from './ingredients-category.module.css';

/** Отображает заголовок и карточки одной категории ингредиентов. */
export const IngredientsCategoryUI = ({
  title,
  titleRef,
  children,
  ref,
  ...rest
}: TIngredientsCategoryUIProps): React.JSX.Element => (
  <>
    <h3 className="text text_type_main-medium mt-10 mb-6" ref={titleRef}>
      {title}
    </h3>
    <ul className={styles.items} ref={ref} {...rest}>
      {children}
    </ul>
  </>
);
