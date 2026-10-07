import type { ReactNode } from 'react';

/** Свойства страницы публичной ленты. */
export type FeedUIProps = {
  ordersList: ReactNode;
  feedInfo: ReactNode;
  handleGetFeeds: () => void;
};
