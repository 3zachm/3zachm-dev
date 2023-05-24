'use client';
import Link from 'next/link';
import styles from './NavBar.module.scss';
import { useEffect, useState } from 'react';
import Knowledge from './Knowledge';

export default function NavBar() {
  const [enablePatchy, setEnablePatchy] = useState(false)
  const [enablePatchyDropdown, setEnablePatchyDropdown] = useState(false)

  useEffect(() => {
    if (!enablePatchy) {
      const patchy = document.getElementById('patchy-main')
      if (patchy) {
        patchy.remove()
      }
    }
  }, [enablePatchy])

  return (
    <>
      <div className={styles['navbar__container']}>
        <div className={styles['navbar__header']}>
          <div className={styles['navbar__logo']}>
            <Link href="/">3zachm.dev</Link>
          </div>
        </div>
        <div className={styles['navbar__content']}>
          <div className={styles['home__link']}>
            <Link href="/">
              <div className={styles['navbar__item'] + ' ' + styles['navbar__item--anchor']}>
                Home
              </div>
            </Link>
          </div>
          <Link href="#about">
            <div className={styles['navbar__item'] + ' ' + styles['navbar__item--anchor']}>
              About
            </div>
          </Link>
          <Link href="#projects">
            <div className={styles['navbar__item'] + ' ' + styles['navbar__item--anchor']}>
              Projects
            </div>
          </Link>
          <div className={styles['navbar__item']}>
            <div className={styles['navbar__item__dropdown']} onMouseEnter={() => setEnablePatchyDropdown(true)} onMouseLeave={() => setEnablePatchyDropdown(false)}>
              <div className={styles['navbar__item__dropdown__button']}>
                <span>Patchouli</span>
              </div>
              <div className={styles['navbar__item__dropdown__content'] + ' ' + (!enablePatchyDropdown ? styles['navbar__item__dropdown__content--hidden'] : '')}>
                <div className={styles['dropdown__item']} onClick={() => setEnablePatchy(!enablePatchy)}>
                  <div>
                    {
                      enablePatchy ? (
                        <>
                          <span>Disable</span>
                          <p>Spawn with &apos;p&apos;</p>
                        </>

                      ) : (
                        <span>Enable</span>
                      )

                    }

                  </div>
                </div>
                <Link href="/patchy">
                  <div className={styles['dropdown__item']}>
                    <div>
                      <span>The Arena</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        enablePatchy && <Knowledge />
      }
    </>
  );
}