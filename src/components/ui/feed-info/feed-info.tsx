import { clsx } from 'clsx';
import { memo } from 'react';

import type { FeedInfoUIProps, HalfColumnProps, TColumnProps } from './type';

import styles from './feed-info.module.css';

/** Отображает статусы последних заказов и общую статистику ленты. */
export const FeedInfoUI = memo(function FeedInfoUI({
  readyOrders,
  pendingOrders,
  total,
  totalToday,
}: FeedInfoUIProps): React.JSX.Element {
  return (
    <section>
      <div className={styles.columns}>
        <HalfColumn orders={readyOrders} title={'Готовы'} textColor={'blue'} />
        <HalfColumn orders={pendingOrders} title={'В работе'} />
      </div>
      <Column title={'Выполнено за все время'} content={total} />
      <Column title={'Выполнено за сегодня'} content={totalToday} />
    </section>
  );
});

/** Отображает одну половину списка номеров заказов. */
const HalfColumn = ({
  orders,
  title,
  textColor,
}: HalfColumnProps): React.JSX.Element => (
  <div className={clsx('pr-6', styles.column)}>
    <h3 className={clsx('text text_type_main-medium', styles.title)}>{title}:</h3>
    <ul className={clsx('pt-6', styles.list)}>
      {orders.map((item, index) => (
        <li
          className={clsx('text text_type_digits-default', styles.list_item)}
          style={{ color: textColor === 'blue' ? '#00cccc' : '#F2F2F3' }}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/** Отображает числовой показатель ленты заказов. */
const Column = ({ title, content }: TColumnProps): React.JSX.Element => (
  <>
    <h3 className={clsx('pt-15 text text_type_main-medium', styles.title)}>{title}:</h3>
    <p className={clsx('text text_type_digits-large', styles.content)}>{content}</p>
  </>
);
