import { Input } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import { AuthForm } from '../auth-form';

import type { PageUIProps } from '@ui-pages/common-type';

import styles from '../common.module.css';

/** Отображает форму запроса восстановления пароля. */
export const ForgotPasswordUI = ({
  errorText,
  isLoading,
  email,
  setEmail,
  handleSubmit,
}: PageUIProps): React.JSX.Element => (
  <AuthForm
    title="Восстановление пароля"
    formName="forgot-password"
    submitText="Восстановить"
    errorText={errorText}
    isLoading={isLoading}
    handleSubmit={handleSubmit}
    footer={
      <div className={clsx(styles.question, 'text text_type_main-default pb-6')}>
        Вспомнили пароль?
        <Link to={'/login'} className={clsx('pl-2', styles.link)}>
          Войти
        </Link>
      </div>
    }
  >
    <div className="pb-6">
      <Input
        type="email"
        placeholder="Укажите e-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        error={false}
        errorText=""
        size="default"
      />
    </div>
  </AuthForm>
);
