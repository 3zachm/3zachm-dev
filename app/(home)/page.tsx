'use client';
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import ScrollBanner from './ScrollBanner';
import { BrowserIcon, GitHubIcon } from '@/lib/Icons';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [disableIntro, setDisableIntro] = useState<boolean>(false);


  useEffect(() => {
    // add event listener to slide box to set loop class
    let slideElement: HTMLElement | null;
    slideElement = document.querySelector(`.${styles['slide__box']}`) as HTMLElement;
    if (slideElement !== null) {
      slideElement.addEventListener('animationend', () => {
        slideElement?.classList.add(styles['slide__box--loop']);
        setDisableIntro(true);
      });
    }
  }, []);

  // update scroll progress when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollPosition / windowHeight);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles['page__container']}>
        <main className={styles['page__main']}>
          <div className={styles['main__left']}>
            <div className={styles['main__left__content']}>
              <div className={styles['main__left__content__title']}>
                <h1>hello!</h1>
              </div>
              <div className={styles['main__left__content__subtitle']}>
                <h2>Im zach, I do things with computers</h2>
              </div>
              {/* <div className={styles['main__left__content__body']}>
                <p></p>
              </div> */}
              <div className={styles['main__left__content__links']}>
                <div className={styles['main__button']}>
                  <Link href="#about">
                    <div className={styles['main__button__content']}>
                      <p>read about me</p>
                    </div>
                  </Link>
                </div>
                <p>or just scroll!</p>
              </div>
            </div>
            <div id="about" className={styles['page__about']}>
              <div className={styles['about__content']}>
                <div className={styles['about__content__title']}>
                  <h1>me</h1>
                </div>
                <div className={styles['about__content__body']}>
                  <p>I lived in LA for most of my life, but recently settled down in downtown Seattle!</p>
                  <p>As of now, I&apos;m a computer science student though I like to mess around with frontend and servers whenever I have the chance.</p>
                  <h3>Interests</h3>
                  <p>My mind flashes between rhythm games, retro game collecting, learning kanji, and wishing I could sell my kidneys for vintage computers so I could also keep the lights on.</p>
                  <p>...rent is more important though and I don&apos;t think my partner would want my kidneys gone anyway</p>
                  <h3>Coding</h3>
                  <p>I like TypeScript, C++, React/Next.js, and databases!</p>
                </div>
              </div>
            </div>
            <div className={styles['page__about']}>
              <div className={styles['about__content']}>
                <div className={styles['about__content__title']}>
                  <h1>Public transit</h1>
                </div>
                <div className={styles['about__content__body']}>
                  <p>I have an unreasonable fascination for public transit... <br />The day <Link href="https://www.soundtransit.org/system-expansion/east-link-extension" target='_blank'>East Link</Link> is finished I will be happy</p>
                </div>
              </div>
            </div>
            <div id="projects" className={styles['page__about']}>
              <div className={styles['about__content']}>
                <div className={styles['about__content__title']}>
                  <h1>Projects!</h1>
                </div>
                <div className={styles['about__content__body']}>
                  <p>Keep scrolling to see some of what I&apos;ve worked on so far... including this site right now!</p>
                  <div className={styles['project__links']}>
                    <div className={styles['project__link']}>
                      <BrowserIcon />
                      <Link href="/"> Site </Link>
                    </div>
                    <div className={styles['project__link']}>
                      <GitHubIcon />
                      <Link href="https://github.com/3zachm/3zachm-dev"> Source </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['page__about']}>
              <div className={styles['about__content']}>
                <div className={styles['about__content__title']}>
                  <h1>Asayake</h1>
                </div>
                <div className={styles['about__content__body']}>
                  <p>A simple yet effective JavaScript powered bot created for Discord. It&apos;s in over 350+ server, though I mostly only keep it running at this point. Solves the need for per-user color choices without granting permission nodes.</p>
                  <div className={styles['project__links']}>
                    <div className={styles['project__link']}>
                      <BrowserIcon />
                      <Link href="/asayake"> Site </Link>
                    </div>
                    <div className={styles['project__link']}>
                      <GitHubIcon />
                      <Link href="https://github.com/3zachm/colors-js"> Source </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['page__about']}>
              <div className={styles['about__content']}>
                <div className={styles['about__content__title']}>
                  <h1>Chat database</h1>
                </div>
                <div className={styles['about__content__body']}>
                  <p>A private project for a client in which a front end allows for searchable user logs, holding millions of messages and statistics about users for the purpose of moderation.</p>
                  <div className={styles['project__links']}>
                    <div className={styles['project__link'] + ' ' + styles['project__link--disabled']}>
                      <BrowserIcon />
                      <p>Site</p>
                      <div className={styles['project__link__tooltip']}>
                        <p>Not available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['main__right']}>
            <div className={styles['slide__box'] + ' ' + (scrollProgress > 0.05 ? styles['slide__box--top'] : '') + ' ' + (disableIntro ? styles['slide__box--loop'] : '')}>
              <ScrollBanner />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

