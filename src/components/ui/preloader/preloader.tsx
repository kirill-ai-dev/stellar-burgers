import styles from './preloader.module.css';

/** Отображает индикатор выполнения асинхронной операции. */
export const Preloader = (): React.JSX.Element => (
  <div className={styles.preloader}>
    <div className={styles.preloader_circle} />
  </div>
);
