import Image from 'next/image'
import styles from './page.module.scss'
import homeStyles from '@/app/home/page.module.scss'
import Link from 'next/link'
import { DiscordIcon, GitHubIcon, SupportIcon, ToSIcon } from '@/lib/Icons'

export default function page() {
  return (
    <div className={styles['page__container']}>
      <main className={styles['page__main'] + ' ' + styles['page__main']}>
        <div className={styles['main__left']}>
          <div className={styles['main__left__content'] + ' ' + styles['main__left__content']}>
            <div className={styles['main__left__content__picture']}>
              {/* <Image src="/img/asayake.webp" alt="asayake" fill /> */}
            </div>
            <div className={styles['main__left__content__title'] + ' ' + styles['title--colors']}>
              <h1>Asayake</h1>
            </div>
            <div className={styles['main__left__content__subtitle']}>
              <h2>per-user color bot for discord</h2>
            </div>
          </div>
        </div>
        <div className={styles['main__right']}>
          <div className={styles['main__right__list']}>
            <Link href="https://discord.com/oauth2/authorize?client_id=907538185976946720&permissions=268438528&scope=applications.commands%20bot">
              <div className={styles['main__right__list__item']}>
                <DiscordIcon />
                <h2>Invite</h2>
              </div>
            </Link>
            <Link href="https://github.com/3zachm/colors-js">
              <div className={styles['main__right__list__item']}>
                <GitHubIcon />
                <h2>Github</h2>
              </div>
            </Link>
            <Link href="https://discord.gg/MmDuNAr">
              <div className={styles['main__right__list__item']}>
                <SupportIcon />
                <h2>Support</h2>
              </div>
            </Link>
            <Link href="/asayake/legal">
              <div className={styles['main__right__list__item']}>
                <ToSIcon />
                <h2>Terms of Service</h2>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
