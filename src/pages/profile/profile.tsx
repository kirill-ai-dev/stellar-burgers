import { selectUserState } from '@selectors';
import { ProfileUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';

import { ProfileMenu } from '@components/profile-menu';
import { clearProfileError, updateUser } from '@services/slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

/** Управляет редактированием, сохранением и отменой изменений профиля. */
export const Profile = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { user, profileError, isLoading } = useSelector(selectUserState);

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  useEffect(() => {
    dispatch(clearProfileError());
  }, [dispatch]);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name ?? '',
      email: user?.email ?? '',
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  /** Отправляет только актуальные значения формы профиля. */
  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    const data = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password ? { password: formValue.password } : {}),
    };
    void dispatch(updateUser(data))
      .unwrap()
      .then(() => setFormValue((current) => ({ ...current, password: '' })))
      .catch(() => undefined);
  };

  /** Восстанавливает форму из сохранённых пользовательских данных. */
  const handleCancel = (e: SyntheticEvent): void => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
  };

  /** Синхронизирует изменённое поле с локальным состоянием формы. */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      isLoading={isLoading}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={profileError ?? undefined}
      profileMenu={<ProfileMenu />}
    />
  );
};
