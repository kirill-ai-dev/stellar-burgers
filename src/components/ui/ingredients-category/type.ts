import type { ReactNode } from 'react';

/** Данные визуальной категории ингредиентов и её счётчиков. */
export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  children: ReactNode;
  ref?: React.Ref<HTMLUListElement>;
} & Omit<React.HTMLAttributes<HTMLUListElement>, 'title'>;
