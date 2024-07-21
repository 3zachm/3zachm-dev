import { Be_Vietnam_Pro } from 'next/font/google'
import "@/app/globals.scss"
import '@/app/(anny)/logs/layout.colors.scss';
import { Providers } from '@/app/providers'
import { Viewport } from 'next';

const vietnam = Be_Vietnam_Pro({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata = {
  title: 'sign in | 3zachm.dev',
  description: 'sign in page!',
}

export const viewport: Viewport = {
  themeColor: '#b875d7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={vietnam.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
