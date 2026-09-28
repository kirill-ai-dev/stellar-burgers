import { selectFeed, selectIngredientsState } from '@selectors';
import { PageMessage, Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { FeedInfo } from '@components/feed-info';
import { OrdersList } from '@components/orders-list';
import { getFeeds } from '@services/slices/feedSlice';
import { useDispatch, useSelector } from '@services/store';
import { ORDERS_REFRESH_INTERVAL } from '@utils/constants';

/** Загружает публичную ленту и поддерживает её актуальность периодическим опросом. */
export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const feed = useSelector(selectFeed);
  const { orders, isLoading, error } = feed;
  const {
    ingredients,
    isLoading: ingredientsLoading,
    error: ingredientsError,
  } = useSelector(selectIngredientsState);

  /** Повторно запрашивает публичную ленту заказов. */
  const handleGetFeeds = (): void => {
    void dispatch(getFeeds());
  };

  useEffect((): (() => void) => {
    handleGetFeeds();
    const intervalId = window.setInterval(handleGetFeeds, ORDERS_REFRESH_INTERVAL);
    return () => window.clearInterval(intervalId);
  }, [dispatch]);

  if ((isLoading || ingredientsLoading) && (!orders.length || !ingredients.length)) {
    return <Preloader />;
  }
  if (error && !orders.length) {
    return <PageMessage text={error} extraClass="mt-30" />;
  }
  if (ingredientsError) {
    return <PageMessage text={ingredientsError} extraClass="mt-30" />;
  }
  if (orders.length && !ingredients.length) {
    return <PageMessage text="Нет данных об ингредиентах заказов" extraClass="mt-30" />;
  }

  const ordersList = orders.length ? (
    <>
      {error && <PageMessage text={error} extraClass="mb-5" />}
      <OrdersList orders={orders} />
    </>
  ) : (
    <PageMessage text="Заказов пока нет" extraClass="mt-10" />
  );

  return (
    <FeedUI
      ordersList={ordersList}
      feedInfo={
        <FeedInfo orders={orders} total={feed.total} totalToday={feed.totalToday} />
      }
      handleGetFeeds={handleGetFeeds}
    />
  );
};
