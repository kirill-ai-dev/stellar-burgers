import { RefreshButton } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { memo } from 'react';

import type { FeedUIProps } from './type';

import styles from './feed.module.css';

/** Отображает публичную ленту, кнопку обновления и статистику заказов. */
export const FeedUI = memo(function FeedUI({
  ordersList,
  feedInfo,
  handleGetFeeds,
}: FeedUIProps): React.JSX.Element {
  return (
    <main className={styles.containerMain}>
      <div className={clsx(styles.titleBox, 'mt-10 mb-5')}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <RefreshButton text="Обновить" onClick={handleGetFeeds} extraClass={'ml-30'} />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>{ordersList}</div>
        <div className={styles.columnInfo}>{feedInfo}</div>
      </div>
    </main>
  );
});
