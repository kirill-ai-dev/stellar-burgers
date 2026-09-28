import { selectUser } from '@selectors';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';

import { useSelector } from '@services/store';

/** Подключает имя пользователя из Redux к визуальной шапке приложения. */
export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(selectUser);
  const { pathname } = useLocation();
  const activeSection = pathname.startsWith('/ingredients/')
    ? 'constructor'
    : pathname.startsWith('/feed')
      ? 'feed'
      : pathname.startsWith('/profile')
        ? 'profile'
        : pathname === '/'
          ? 'constructor'
          : undefined;

  return <AppHeaderUI userName={user?.name} activeSection={activeSection} />;
};
