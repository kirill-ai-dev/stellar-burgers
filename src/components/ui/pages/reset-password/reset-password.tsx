import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import { AuthForm } from '../auth-form';

import type { ResetPasswordUIProps } from './type';

import styles from '../common.module.css';

/** Отображает форму нового пароля и кода подтверждения. */
export const ResetPasswordUI = ({
  errorText,
  isLoading,
  password,
  setPassword,
  handleSubmit,
  token,
  setToken,
}: ResetPasswordUIProps): React.JSX.Element => (
  <AuthForm
    title="Восстановление пароля"
    formName="reset-password"
    submitText="Сохранить"
    errorText={errorText}
    isLoading={isLoading}
    handleSubmit={handleSubmit}
    footer={
      <div className={clsx(styles.question, 'text text_type_main-default pb-6')}>
        Вспомнили пароль?
        <Link to="/login" className={clsx('pl-2', styles.link)}>
          Войти
        </Link>
      </div>
    }
  >
    <div className="pb-6">
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
      />
    </div>
    <div className="pb-6">
      <Input
        type="text"
        placeholder="Введите код из письма"
        onChange={(e) => setToken(e.target.value)}
        value={token}
        name="token"
        error={false}
        errorText=""
        size="default"
      />
    </div>
  </AuthForm>
);
