import styles from './modal-overlay.module.css';

/** Затемняет фон и передаёт клик контейнеру модального окна. */
export const ModalOverlayUI = ({
  onClick,
}: {
  onClick: () => void;
}): React.JSX.Element => (
  <div className={styles.overlay} onClick={onClick} data-testid="modal-overlay" />
);
