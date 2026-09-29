import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

import { AuthForm } from '../auth-form';

import type { RegisterUIProps } from './type';

import styles from '../common.module.css';

/** Отображает форму регистрации нового пользователя. */
export const RegisterUI = ({
  errorText,
  isLoading,
  email,
  setEmail,
  handleSubmit,
  password,
  redirectState,
  setPassword,
  userName,
  setUserName,
}: RegisterUIProps): React.JSX.Element => (
  <AuthForm
    title="Регистрация"
    formName="register"
    submitText="Зарегистрироваться"
    errorText={errorText}
    isLoading={isLoading}
    handleSubmit={handleSubmit}
    footer={
      <div className={clsx(styles.question, 'text text_type_main-default pb-6')}>
        Уже зарегистрированы?
        <Link to="/login" state={redirectState} className={clsx('pl-2', styles.link)}>
          Войти
        </Link>
      </div>
    }
  >
    <div className="pb-6">
      <Input
        type="text"
        placeholder="Имя"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        name="name"
        error={false}
        errorText=""
        size="default"
      />
    </div>
    <div className="pb-6">
      <Input
        type="email"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={'email'}
        error={false}
        errorText=""
        size={'default'}
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
