import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { BurgerConstructorUIProps } from './type';

import styles from './burger-constructor.module.css';

/** Отображает собранный бургер, итоговую стоимость и состояние оформления заказа. */
export const BurgerConstructorUI = ({
  constructorItems,
  price,
  orderError,
  onOrderClick,
  ingredientElements,
  orderFeedback,
}: BurgerConstructorUIProps): React.JSX.Element => (
  <section className={styles.burger_constructor} data-testid="constructor">
    {constructorItems.bun ? (
      <div className={clsx(styles.element, 'mb-4 mr-4')} data-testid="constructor-bun-1">
        <ConstructorElement
          type="top"
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={clsx(
          styles.noBuns,
          styles.noBunsTop,
          'ml-8 mb-4 mr-5 text text_type_main-default'
        )}
      >
        Выберите булки
      </div>
    )}
    <ul className={styles.elements} data-testid="constructor-ingredients">
      {constructorItems.ingredients.length > 0 ? (
        ingredientElements
      ) : (
        <li
          className={clsx(styles.noBuns, 'ml-8 mb-4 mr-5 text text_type_main-default')}
        >
          Выберите начинку
        </li>
      )}
    </ul>
    {constructorItems.bun ? (
      <div className={clsx(styles.element, 'mt-4 mr-4')} data-testid="constructor-bun-2">
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={clsx(
          styles.noBuns,
          styles.noBunsBottom,
          'ml-8 mb-4 mr-5 text text_type_main-default'
        )}
      >
        Выберите булки
      </div>
    )}
    <div className={clsx(styles.total, 'mt-10 mr-4')} data-testid="order-summ">
      <div className={clsx(styles.cost, 'mr-10')}>
        <p className={clsx('text mr-2', styles.text)}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={onOrderClick}>
        Оформить заказ
      </Button>
    </div>
    {orderFeedback}
    {orderError && <p className="text text_type_main-default mt-5">{orderError}</p>}
  </section>
);
