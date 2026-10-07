import type { TTabMode } from '@utils-types';
import type { ReactNode } from 'react';

/** Подготовленные категории, ссылки и действия каталога ингредиентов. */
export type BurgerIngredientsUIProps = {
  currentTab: TTabMode;
  children: ReactNode;
  onTabClick: (val: string) => void;
};
