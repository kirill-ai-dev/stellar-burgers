import { selectUserState } from '@selectors';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '@services/store';

import type { ReactNode } from 'react';
import type { Location } from 'react-router-dom';

type TProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

/**
 * Ограничивает доступ к приватным страницам и страницам только для гостей.
 */
export const ProtectedRoute = ({
  children,
  onlyUnAuth = false,
}: TProtectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector(selectUserState);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const destination = (location.state as { from?: Location })?.from?.pathname ?? '/';
    return <Navigate to={destination} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
