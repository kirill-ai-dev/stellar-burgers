import { selectIngredientsState, selectOrderDetails } from '@selectors';
import { OrderInfoUI, PageMessage, Preloader } from '@ui';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { clearOrderDetails, getOrderByNumber } from '@services/slices/orderDetailsSlice';
import { useDispatch, useSelector } from '@services/store';
import { createOrderDetailsInfo } from '@utils/order';

import { OrderStatus } from '../order-status';

/** Загружает заказ из URL и подготавливает состав, количества и итоговую стоимость. */
export const OrderInfo = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const {
    ingredients,
    isLoading: ingredientsLoading,
    error: ingredientsError,
  } = useSelector(selectIngredientsState);
  const { order: orderData, error } = useSelector(selectOrderDetails);
  const orderNumber = Number(number);

  useEffect((): (() => void) => {
    if (Number.isFinite(orderNumber)) {
      const request = dispatch(getOrderByNumber(orderNumber));
      return () => {
        request.abort();
        dispatch(clearOrderDetails());
      };
    }
    return () => {
      dispatch(clearOrderDetails());
    };
  }, [dispatch, orderNumber]);

  // Один проход группирует повторяющиеся ингредиенты, второй рассчитывает стоимость.
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    return createOrderDetailsInfo(orderData, ingredients);
  }, [orderData, ingredients]);

  if (!Number.isFinite(orderNumber)) {
    return <PageMessage text="Некорректный номер заказа" />;
  }
  if (error) {
    return <PageMessage text={error} />;
  }
  if (ingredientsError) {
    return <PageMessage text={ingredientsError} />;
  }
  if (!orderData || ingredientsLoading) {
    return <Preloader />;
  }
  if (!ingredients.length) {
    return <PageMessage text="Нет данных об ингредиентах заказа" />;
  }
  if (!orderInfo) {
    return <PageMessage text="Не удалось подготовить данные заказа" />;
  }

  return (
    <OrderInfoUI
      orderInfo={orderInfo}
      status={<OrderStatus status={orderInfo.status} />}
    />
  );
};
