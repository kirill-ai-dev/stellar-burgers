import { clsx } from 'clsx';

import type { ProfileOrdersUIProps } from './type';

import styles from './profile-orders.module.css';

/** Отображает меню профиля и историю заказов пользователя. */
export const ProfileOrdersUI = ({
  profileMenu,
  ordersList,
}: ProfileOrdersUIProps): React.JSX.Element => (
  <main className={styles.main}>
    <div className={clsx('mt-30 mr-15', styles.menu)}>{profileMenu}</div>
    <div className={clsx('mt-10', styles.orders)}>{ordersList}</div>
  </main>
);
