import type { ReactNode } from 'react';

/** Свойства визуальной оболочки модального окна. */
export type TModalUIProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  canClose?: boolean;
};
