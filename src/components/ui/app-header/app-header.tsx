import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to='/'>
          {({ isActive }) => (
            <div
              className={clsx(
                styles.nav_link_wrapper,
                isActive ? styles.link_active : styles.link
              )}
            >
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </div>
          )}
        </NavLink>
        <NavLink to='/feed'>
          {({ isActive }) => (
            <div
              className={clsx(
                styles.nav_link_wrapper,
                isActive ? styles.link_active : styles.link
              )}
            >
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </div>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink to='/profile'>
          {({ isActive }) => (
            <div
              className={clsx(
                styles.nav_link_wrapper,
                isActive ? styles.link_active : styles.link
              )}
            >
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
