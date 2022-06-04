import { ReactNode } from 'react';

import logo from '../../assets/Logo.svg';

import styles from './Header.module.css'

interface HeaderProps {
  children?: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logomarca" />
      {children ?? children}
    </header>
  );
}

export default Header;
