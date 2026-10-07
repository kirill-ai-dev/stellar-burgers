import { selectUserState } from '@selectors';
import { ProfileMenuUI } from '@ui';
import { useLocation } from 'react-router-dom';

import { logoutUser } from '@services/slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

/** Подключает действие выхода и текущий маршрут к меню личного кабинета. */
export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { logoutError, isLoading } = useSelector(selectUserState);

  /** Завершает пользовательскую сессию. */
  const handleLogout = (): void => {
    void dispatch(logoutUser());
  };

  return (
    <ProfileMenuUI
      handleLogout={handleLogout}
      pathname={pathname}
      logoutError={logoutError ?? undefined}
      isLoading={isLoading}
    />
  );
};
