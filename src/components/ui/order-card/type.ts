import type { TOrderCardInfo } from '@utils/order';
import type { ReactNode } from 'react';
import type { Location } from 'react-router-dom';

/** Данные, необходимые визуальной карточке заказа. */
export type OrderCardUIProps = {
  orderInfo: TOrderCardInfo;
  maxIngredients: number;
  locationState: { background: Location };
  status?: ReactNode;
};
