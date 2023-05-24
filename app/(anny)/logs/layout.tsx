import { Be_Vietnam_Pro, Inter, Roboto } from 'next/font/google';
import "@/app/globals.scss";
import "./layout.colors.scss";
import { SessionProvider } from 'next-auth/react';
import NavBar from './NavBar';
import styles from './layout.module.scss';
import ContentWrap from './ContentWrap';
import { Providers } from '@/app/providers';

const vietnam = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vietnam'
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto'
})

export const metadata = {
  title: 'anny logs | 3zachm.dev',
  description: 'ttv/anny logs',
  themeColor: '#b875d7',
  viewport: {
    initialScale: 0.8,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={vietnam.variable + " " + inter.variable + " " + roboto.variable}>
        <Providers>
          <div className={styles['body__content']}>
            {/* avoids making layout a client component */}
            <ContentWrap>
              {children}
            </ContentWrap>
          </div>
        </Providers>
      </body>
    </html>
  )
}
