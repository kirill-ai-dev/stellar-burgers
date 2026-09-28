/** Подготовленные данные статистики публичной ленты. */
export type FeedInfoUIProps = {
  readyOrders: number[];
  pendingOrders: number[];
  total: number;
  totalToday: number;
};

/** Свойства колонки с номерами заказов одного статуса. */
export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

/** Свойства числового показателя статистики. */
export type TColumnProps = {
  title: string;
  content: number;
};
