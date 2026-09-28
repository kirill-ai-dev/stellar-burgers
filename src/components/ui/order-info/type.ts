import type { TOrderDetailsInfo } from '@utils/order';
import type { ReactNode } from 'react';

/** Свойства полного представления заказа. */
export type OrderInfoUIProps = {
  orderInfo: TOrderDetailsInfo;
  status?: ReactNode;
};
