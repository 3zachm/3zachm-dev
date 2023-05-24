import { Be_Vietnam_Pro } from "next/font/google"

export const metadata = {
  title: 'Discord Cropper | 3zachm.dev',
  themeColor: '#b875d7',
  description: 'A tool to crop images for Discord',
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
      <body className={vietnam.variable} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
