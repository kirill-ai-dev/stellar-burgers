import { selectIngredients } from '@selectors';
import { OrderCardUI } from '@ui';
import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from '@services/store';
import { createOrderCardInfo } from '@utils/order';

import { OrderStatus } from '../order-status';

import type { OrderCardProps } from './type';

const maxIngredients = 6;

/** Дополняет заказ данными ингредиентов, стоимостью и параметрами фонового маршрута. */
export const OrderCard = memo(function OrderCard({
  order,
}: OrderCardProps): React.JSX.Element | null {
  const location = useLocation();

  const ingredients = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    return createOrderCardInfo(order, ingredients, maxIngredients);
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
      status={
        location.pathname.startsWith('/profile/orders') ? (
          <OrderStatus status={orderInfo.status} />
        ) : null
      }
    />
  );
});
