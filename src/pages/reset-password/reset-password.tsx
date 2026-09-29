import { selectPasswordRecovery } from '@selectors';
import { ResetPasswordUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  clearPasswordRecoveryError,
  resetPassword,
} from '@services/slices/passwordRecoverySlice';
import { useDispatch, useSelector } from '@services/store';

/** Завершает восстановление пароля по новому паролю и коду подтверждения. */
export const ResetPassword = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const { error, isLoading } = useSelector(selectPasswordRecovery);

  /** Устанавливает новый пароль и возвращает пользователя на страницу входа. */
  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    void dispatch(resetPassword({ password, token }))
      .unwrap()
      .then(() => {
        localStorage.removeItem('resetPassword');
        void navigate('/login');
      })
      .catch(() => undefined);
  };

  useEffect(() => {
    dispatch(clearPasswordRecoveryError());
    if (!localStorage.getItem('resetPassword')) {
      void navigate('/forgot-password', { replace: true });
    }
  }, [dispatch, navigate]);

  return (
    <ResetPasswordUI
      errorText={error ?? undefined}
      isLoading={isLoading}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
