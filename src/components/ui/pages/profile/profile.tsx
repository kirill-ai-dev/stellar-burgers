import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { ProfileUIProps } from './type';

import styles from './profile.module.css';

/** Отображает редактируемую форму профиля и контекстные кнопки действий. */
export const ProfileUI = ({
  formValue,
  isFormChanged,
  isLoading,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
  profileMenu,
}: ProfileUIProps): React.JSX.Element => (
  <main className={styles.container}>
    <div className={clsx('mt-30 mr-15', styles.menu)}>{profileMenu}</div>
    <form className={clsx('mt-30', styles.form)} onSubmit={handleSubmit}>
      <>
        <div className="pb-6">
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleInputChange}
            value={formValue.name}
            name={'name'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={isLoading}
          />
        </div>
        <div className="pb-6">
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleInputChange}
            value={formValue.email}
            name={'email'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={isLoading}
          />
        </div>
        <div className="pb-6">
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleInputChange}
            value={formValue.password}
            name={'password'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={isLoading}
          />
        </div>
        {isFormChanged && (
          <div>
            <Button
              type="secondary"
              htmlType="button"
              size="medium"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Отменить
            </Button>
            <Button type="primary" size="medium" htmlType="submit" disabled={isLoading}>
              {isLoading ? 'Сохраняем...' : 'Сохранить'}
            </Button>
          </div>
        )}
        {updateUserError && (
          <p className={clsx(styles.error, 'pt-5 text text_type_main-default')}>
            {updateUserError}
          </p>
        )}
      </>
    </form>
  </main>
);
