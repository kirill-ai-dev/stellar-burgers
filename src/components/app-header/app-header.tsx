import { selectUser } from '@selectors';
import { AppHeaderUI } from '@ui';
import { useMatch } from 'react-router-dom';

import { useSelector } from '@services/store';

/** Подключает имя пользователя из Redux к визуальной шапке приложения. */
export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(selectUser);
  const isIngredientRoute = Boolean(useMatch('/ingredients/:id'));

  return <AppHeaderUI userName={user?.name} isConstructorActive={isIngredientRoute} />;
};
