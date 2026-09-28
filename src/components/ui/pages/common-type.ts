import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

/** Общие свойства форм авторизации и восстановления доступа. */
export type PageUIProps = {
  errorText: string | undefined;
  isLoading: boolean;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};
