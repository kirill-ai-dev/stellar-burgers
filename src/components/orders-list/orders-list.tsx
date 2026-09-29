import { OrdersListUI } from '@ui';
import { memo } from 'react';

import { OrderCard } from '../order-card';

import type { OrdersListProps } from './type';

/** Сортирует заказы от новых к старым перед отображением списка. */
export const OrdersList = memo(function OrdersList({
  orders,
}: OrdersListProps): React.JSX.Element {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <OrdersListUI>
      {orderByDate.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </OrdersListUI>
  );
});
