import { FeedInfoUI } from '@ui';

import type { TFeedState, TOrder } from '@utils-types';

type TFeedInfoProps = Pick<TFeedState, 'orders' | 'total' | 'totalToday'>;

/** Возвращает номера первых заказов с указанным статусом для колонки статистики. */
const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

/** Подготавливает агрегированные данные публичной ленты для отображения. */
export const FeedInfo = ({
  orders,
  total,
  totalToday,
}: TFeedInfoProps): React.JSX.Element => {
  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      total={total}
      totalToday={totalToday}
    />
  );
};
