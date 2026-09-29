import type { ChangeEvent, ReactNode, SyntheticEvent } from 'react';

/** Значения и обработчики формы редактирования профиля. */
export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  isLoading: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
  profileMenu: ReactNode;
};
