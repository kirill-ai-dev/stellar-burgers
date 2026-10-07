import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import { AuthForm } from '../auth-form';

import type { LoginUIProps } from './type';

import styles from '../common.module.css';

/** Отображает форму входа и ссылки на регистрацию и восстановление пароля. */
export const LoginUI = ({
  email,
  setEmail,
  errorText,
  isLoading,
  handleSubmit,
  password,
  redirectState,
  setPassword,
}: LoginUIProps): React.JSX.Element => (
  <AuthForm
    title="Вход"
    formName="login"
    submitText="Войти"
    errorText={errorText}
    isLoading={isLoading}
    handleSubmit={handleSubmit}
    footer={
      <>
        <div className={clsx('pb-4 text text_type_main-default', styles.question)}>
          Вы - новый пользователь?
          <Link
            to="/register"
            state={redirectState}
            className={clsx('pl-2', styles.link)}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={clsx(styles.question, 'text text_type_main-default pb-6')}>
          Забыли пароль?
          <Link to={'/forgot-password'} className={clsx('pl-2', styles.link)}>
            Восстановить пароль
          </Link>
        </div>
      </>
    }
  >
    <div className="pb-6">
      <Input
        type="email"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        error={false}
        errorText=""
        size="default"
      />
    </div>
    <div className="pb-6">
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
      />
    </div>
  </AuthForm>
);
