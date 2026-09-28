import { selectUserState } from '@selectors';
import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearAuthError, registerUser } from '@services/slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

/** Регистрирует нового пользователя по данным формы. */
export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, isLoading } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  /** Отправляет форму регистрации в API. */
  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .then(() => void navigate('/', { replace: true }))
      .catch(() => undefined);
  };

  return (
    <RegisterUI
      errorText={authError ?? undefined}
      isLoading={isLoading}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
