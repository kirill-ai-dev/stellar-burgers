import { selectIngredientsState, selectProfileOrders } from '@selectors';
import { PageMessage, Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { OrdersList } from '@components/orders-list';
import { ProfileMenu } from '@components/profile-menu';
import { getProfileOrders } from '@services/slices/profileOrdersSlice';
import { useDispatch, useSelector } from '@services/store';
import { ORDERS_REFRESH_INTERVAL } from '@utils/constants';

/** Загружает приватную историю заказов и периодически обновляет её. */
export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(selectProfileOrders);
  const {
    ingredients,
    isLoading: ingredientsLoading,
    error: ingredientsError,
  } = useSelector(selectIngredientsState);

  useEffect((): (() => void) => {
    let activeRequest: { abort: () => void } | null = null;
    /** Прерывает обработку предыдущего thunk перед следующим обновлением. */
    const loadOrders = (): void => {
      activeRequest?.abort();
      activeRequest = dispatch(getProfileOrders());
    };
    loadOrders();
    const intervalId = window.setInterval(loadOrders, ORDERS_REFRESH_INTERVAL);
    return () => {
      window.clearInterval(intervalId);
      activeRequest?.abort();
    };
  }, [dispatch]);

  let ordersList: React.ReactNode;
  if ((isLoading || ingredientsLoading) && (!orders.length || !ingredients.length)) {
    ordersList = <Preloader />;
  } else if (error && !orders.length) {
    ordersList = <PageMessage text={error} extraClass="mt-20" />;
  } else if (ingredientsError) {
    ordersList = <PageMessage text={ingredientsError} extraClass="mt-20" />;
  } else if (orders.length && !ingredients.length) {
    ordersList = (
      <PageMessage text="Нет данных об ингредиентах заказов" extraClass="mt-20" />
    );
  } else if (orders.length) {
    ordersList = (
      <>
        {error && <PageMessage text={error} extraClass="mb-5" />}
        <OrdersList orders={orders} />
      </>
    );
  } else {
    ordersList = <PageMessage text="История заказов пока пуста" extraClass="mt-20" />;
  }

  return <ProfileOrdersUI profileMenu={<ProfileMenu />} ordersList={ordersList} />;
};
