import { OrderStatusUI } from '@ui';

import { getOrderStatusMeta } from '@utils/order';

import type { OrderStatusProps } from './type';

/** Преобразует серверный код статуса заказа в подпись и цвет интерфейса. */
export const OrderStatus = ({ status }: OrderStatusProps): React.JSX.Element => {
  const { color, text } = getOrderStatusMeta(status);
  return <OrderStatusUI textStyle={color} text={text} />;
};
