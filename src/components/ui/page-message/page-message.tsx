import { clsx } from 'clsx';

import type { PageMessageProps } from './type';

/** Отображает единообразное сообщение об ошибке или пустом состоянии страницы. */
export const PageMessage = ({
  text,
  extraClass,
}: PageMessageProps): React.JSX.Element => (
  <p className={clsx('text text_type_main-medium', extraClass)}>{text}</p>
);
