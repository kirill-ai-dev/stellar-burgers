import type { OrderStatusUIProps } from './type';

/** Отображает текстовый статус заказа заданным цветом. */
export const OrderStatusUI = ({
  textStyle,
  text,
}: OrderStatusUIProps): React.JSX.Element => (
  <span className="text text_type_main-default pt-2" style={{ color: textStyle }}>
    {text}
  </span>
);
