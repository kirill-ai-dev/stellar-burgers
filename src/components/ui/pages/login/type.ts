import type { PageUIProps, TAuthRedirectState } from '@ui-pages/common-type';
import type { Dispatch, SetStateAction } from 'react';

/** Свойства формы входа. */
export type LoginUIProps = PageUIProps & {
  password: string;
  redirectState: TAuthRedirectState;
  setPassword: Dispatch<SetStateAction<string>>;
};
