import { selectPasswordRecovery } from '@selectors';
import { ForgotPasswordUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  clearPasswordRecoveryError,
  requestPasswordReset,
} from '@services/slices/passwordRecoverySlice';
import { useDispatch, useSelector } from '@services/store';

/** Обрабатывает первый шаг восстановления пароля по электронной почте. */
export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector(selectPasswordRecovery);

  useEffect(() => {
    dispatch(clearPasswordRecoveryError());
  }, [dispatch]);

  /** Отправляет email и открывает форму ввода нового пароля после успеха. */
  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    void dispatch(requestPasswordReset({ email }))
      .unwrap()
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        void navigate('/reset-password', { replace: true });
      })
      .catch(() => undefined);
  };

  return (
    <ForgotPasswordUI
      errorText={error ?? undefined}
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
