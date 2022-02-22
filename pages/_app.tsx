import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { createTheme, Loading, NextUIProvider } from "@nextui-org/react"
import { SessionProvider, useSession } from "next-auth/react"
import '../styles/globals.css';

const lightTheme = createTheme({
    type: 'light',
    theme: {}
})

const darkTheme = createTheme({
    type: 'dark',
    theme: {}
})

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
    auth?: boolean
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <SessionProvider session={session}>
            {Component.auth ? (
                <Auth>
                    <NextUIProvider theme={darkTheme}>
                        {getLayout(<Component {...pageProps} />)}
                    </NextUIProvider>
                </Auth>
            ) : (
                <NextUIProvider theme={darkTheme}>
                    {getLayout(<Component {...pageProps} />)}
                </NextUIProvider>
            )}

        </SessionProvider>
    )
}

function Auth({ children }) {
    const { data: session, status } = useSession({ required: true })
    const isUser = !!session?.user

    if (isUser) {
        return children
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" ><Loading/></div>
}