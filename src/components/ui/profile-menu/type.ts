/** Свойства навигации личного кабинета. */
export type ProfileMenuUIProps = {
  pathname: string;
  handleLogout: () => void;
  logoutError?: string;
  isLoading?: boolean;
};
