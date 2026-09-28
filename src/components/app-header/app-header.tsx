import { selectUser } from '@selectors';
import { AppHeaderUI } from '@ui';

import { useSelector } from '@services/store';

/** Подключает имя пользователя из Redux к визуальной шапке приложения. */
export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
