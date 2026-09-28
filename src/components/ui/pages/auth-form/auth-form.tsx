import { Button } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { AuthFormProps } from './type';

import styles from './auth-form.module.css';

/** Отображает общую оболочку форм входа, регистрации и восстановления доступа. */
export const AuthForm = ({
  title,
  formName,
  submitText,
  errorText,
  isLoading,
  children,
  footer,
  handleSubmit,
}: AuthFormProps): React.JSX.Element => (
  <main className={styles.container}>
    <div className={clsx('pt-6', styles.wrapCenter)}>
      <h3 className="pb-6 text text_type_main-medium">{title}</h3>
      <form
        className={clsx('pb-15', styles.form)}
        name={formName}
        onSubmit={handleSubmit}
      >
        {children}
        <div className={clsx('pb-6', styles.button)}>
          <Button type="primary" size="medium" htmlType="submit" disabled={isLoading}>
            {isLoading ? 'Подождите...' : submitText}
          </Button>
        </div>
        {errorText && (
          <p className={clsx(styles.error, 'text text_type_main-default pb-6')}>
            {errorText}
          </p>
        )}
      </form>
      {footer}
    </div>
  </main>
);
