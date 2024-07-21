import '@/app/globals.scss'
import './layout.colors.scss'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Providers } from '../providers'
import NavBar from './NavBar'
import styles from './layout.module.scss'
import Knowledge from './Knowledge'
import { Viewport } from 'next'

export const metadata = {
  title: '3zachm.dev',
  description: 'hi!',
}

export const viewport: Viewport = {
  themeColor: '#b875d7',
  initialScale: 0.8,
}

const vietnam = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vietnam'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={vietnam.variable + ' ' + styles['page__body']}>
        {/* TODO: Once layout rendering issue is fixed (#49279), put framer transitions */}
        <div className={styles['page__cover']} />
        <div className={styles['navbar__container']}>
          <NavBar />
        </div>
        <main className={styles['main__content']}>
          {children}
        </main>
        {/* <Knowledge /> */}
      </body>
    </html>
  )
}
