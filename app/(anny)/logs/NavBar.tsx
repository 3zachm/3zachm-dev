import Link from 'next/link';
import styles from './NavBar.module.scss';
import { signOut } from 'next-auth/react';
import { useContext } from 'react';
import { SiteThemeContext } from '@/app/providers';
import { usePathname } from 'next/navigation';
import { AliasIcon, DarkModeIcon, LightModeIcon, LogsIcon, SignOutIcon } from '@/lib/Icons';

export default function NavBar() {
  const { currentTheme, setCurrentTheme } = useContext(SiteThemeContext);
  const pathname = usePathname();
  return (
    <div className={styles['container']}>
      <div className={styles['nav__upper'] + " " + styles['nav__section']}>
        <div className={styles['nav__item'] + " " + (pathname === "/logs" ? styles['nav__item--active'] : "")}>
          <div className={styles['nav__item__tooltip']}>
            <div>logs</div>
          </div>
          <Link href="/logs">
            <LogsIcon />
          </Link>
        </div>
        <div className={styles['nav__item'] + " " + (pathname === "/logs/alias" ? styles['nav__item--active'] : "")}>
          <div className={styles['nav__item__tooltip']}>
            <div>alias</div>
          </div>
          <Link href="/logs/alias">
            <AliasIcon />
          </Link>
        </div>
      </div>
      <div className={styles['nav__lower'] + " " + styles['nav__section']}>
        <div
          className={styles['nav__item']}
          onClick={() => {
            // switch between light and dark mode
            if (typeof localStorage !== 'undefined') {
              const currentTheme = localStorage.getItem('next-theme') ?? 'dark';
              const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
              localStorage.setItem('next-theme', newTheme);
              setCurrentTheme(newTheme);
            }
          }}
        >
          <div className={styles['nav__item__tooltip']}>
            <div>theme</div>
          </div>
          {
            currentTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />
          }
        </div>
        <div className={styles['nav__item']} onClick={() => signOut()}>
          <div className={styles['nav__item__tooltip']}>
            <div>sign out</div>
          </div>
          <SignOutIcon />
        </div>
      </div>
    </div>
  );
}
