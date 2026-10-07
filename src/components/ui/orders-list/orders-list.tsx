import type { OrdersListUIProps } from './type';

import styles from './orders-list.module.css';

/** Отображает последовательность карточек заказов. */
export const OrdersListUI = ({ children }: OrdersListUIProps): React.JSX.Element => (
  <div className={styles.content}>{children}</div>
);
