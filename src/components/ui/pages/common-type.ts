import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import type { Location } from 'react-router-dom';

/** Маршрут, с которого пользователь был перенаправлен на авторизацию. */
export type TAuthRedirectState = { from?: Location } | null;

/** Общие свойства форм авторизации и восстановления доступа. */
export type PageUIProps = {
  errorText: string | undefined;
  isLoading: boolean;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};
