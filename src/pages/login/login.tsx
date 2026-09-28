import { selectUserState } from '@selectors';
import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { clearAuthError, loginUser } from '@services/slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

import type { TAuthRedirectState } from '@ui-pages/common-type';

/** Авторизует пользователя по данным формы. */
export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const redirectState = location.state as TAuthRedirectState;
  const { authError, isLoading } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  /** Отправляет форму входа в API. */
  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={authError ?? undefined}
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      redirectState={redirectState}
      handleSubmit={handleSubmit}
    />
  );
};
