import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';

import type { TAppHeaderUIProps } from './type';

import styles from './app-header.module.css';

/** Отображает шапку приложения и подсвечивает активный раздел. */
export const AppHeaderUI = ({ userName }: TAppHeaderUIProps): React.JSX.Element => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <nav className={clsx(styles.menu, 'p-4')}>
        <div className={styles.menu_part_left}>
          <HeaderLink
            to="/"
            end
            icon={BurgerIcon}
            text="Конструктор"
            extraClass="mr-10"
            isActiveOverride={pathname.startsWith('/ingredients/')}
          />
          <HeaderLink to="/feed" icon={ListIcon} text="Лента заказов" />
        </div>
        <div className={styles.logo}>
          <NavLink to="/" aria-label="Stellar Burgers">
            <Logo className="" />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          <HeaderLink
            to="/profile"
            icon={ProfileIcon}
            text={userName ?? 'Личный кабинет'}
          />
        </div>
      </nav>
    </header>
  );
};

type THeaderLinkProps = {
  to: string;
  text: string;
  icon: typeof BurgerIcon;
  end?: boolean;
  extraClass?: string;
  isActiveOverride?: boolean;
};

/** Отображает одну ссылку шапки с согласованным состоянием иконки и текста. */
const HeaderLink = ({
  to,
  text,
  icon: Icon,
  end = false,
  extraClass = '',
  isActiveOverride = false,
}: THeaderLinkProps): React.JSX.Element => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      clsx(styles.link, extraClass, {
        [styles.link_active]: isActive || isActiveOverride,
      })
    }
  >
    {({ isActive }) => (
      <>
        <Icon type={isActive || isActiveOverride ? 'primary' : 'secondary'} />
        <p className="text text_type_main-default ml-2">{text}</p>
      </>
    )}
  </NavLink>
);
