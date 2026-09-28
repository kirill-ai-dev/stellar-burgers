import { selectUserState } from '@selectors';
import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { clearAuthError, loginUser } from '@services/slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

/** Авторизует пользователя и возвращает его на ранее запрошенный маршрут. */
export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authError, isLoading } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  /** Отправляет форму входа и выполняет перенаправление после успеха. */
  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        const destination =
          (location.state as { from?: Location } | null)?.from?.pathname ?? '/';
        void navigate(destination, { replace: true });
      })
      .catch(() => undefined);
  };

  return (
    <LoginUI
      errorText={authError ?? undefined}
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
