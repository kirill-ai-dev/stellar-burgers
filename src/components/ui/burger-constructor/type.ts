import type { TConstructorState } from '@utils-types';
import type { ReactNode } from 'react';

/** Данные и действия визуального конструктора бургера. */
export type BurgerConstructorUIProps = {
  constructorItems: TConstructorState;
  price: number;
  orderError: string | null;
  onOrderClick: () => void;
  ingredientElements: ReactNode;
  orderFeedback: ReactNode;
};
