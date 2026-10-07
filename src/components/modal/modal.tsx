import { ModalUI } from '@ui';
import { memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import type { TModalProps } from './type';

const modalRoot = document.getElementById('modals');

/** Управляет закрытием модального окна и портирует его в отдельный DOM-контейнер. */
export const Modal = memo(function Modal({
  title,
  onClose,
  children,
  canClose = true,
}: TModalProps): React.JSX.Element {
  useEffect(() => {
    /** Закрывает доступное для закрытия окно по клавише Escape. */
    const handleEsc = (e: KeyboardEvent): void => {
      if (canClose && e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return (): void => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [canClose, onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose} canClose={canClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
