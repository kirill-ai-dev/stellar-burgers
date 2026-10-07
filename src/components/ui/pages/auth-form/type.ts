import type { ReactNode, SyntheticEvent } from 'react';

/** Свойства общей визуальной оболочки формы авторизации. */
export type AuthFormProps = {
  title: string;
  formName: string;
  submitText: string;
  errorText?: string;
  isLoading: boolean;
  children: ReactNode;
  footer: ReactNode;
  handleSubmit: (event: SyntheticEvent) => void;
};
