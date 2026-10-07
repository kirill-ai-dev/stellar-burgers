import { selectConstructor, selectOrderState, selectUser } from '@selectors';
import { BurgerConstructorUI, OrderDetailsUI, Preloader } from '@ui';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { clearConstructor } from '@services/slices/constructorSlice';
import { clearOrder, createOrder } from '@services/slices/orderSlice';
import { useDispatch, useSelector } from '@services/store';

import { BurgerConstructorElement } from '../burger-constructor-element';
import { Modal } from '../modal';

import type { TConstructorIngredient } from '@utils-types';

/** Управляет составом, стоимостью и оформлением собираемого бургера. */
export const BurgerConstructor = (): React.JSX.Element | null => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const constructorItems = useSelector(selectConstructor);
  const { orderRequest, orderModalData, error } = useSelector(selectOrderState);
  const user = useSelector(selectUser);

  /** Проверяет авторизацию и отправляет выбранные ингредиенты для создания заказа. */
  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      void navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id,
    ];
    const request = dispatch(createOrder(ingredientIds));
    void request
      .unwrap()
      .then(() => dispatch(clearConstructor()))
      .catch(() => undefined);
  };

  /** Закрывает окно оформленного заказа и очищает его данные. */
  const closeOrderModal = (): void => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      constructorItems={constructorItems}
      orderError={error}
      onOrderClick={onOrderClick}
      ingredientElements={constructorItems.ingredients.map((item, index) => (
        <BurgerConstructorElement
          ingredient={item}
          index={index}
          totalItems={constructorItems.ingredients.length}
          key={item.id}
        />
      ))}
      orderFeedback={
        <>
          {orderRequest && (
            <Modal onClose={closeOrderModal} title="Оформляем заказ..." canClose={false}>
              <Preloader />
            </Modal>
          )}
          {orderModalData && (
            <Modal onClose={closeOrderModal} title="">
              <OrderDetailsUI orderNumber={orderModalData.number} />
            </Modal>
          )}
        </>
      }
    />
  );
};
