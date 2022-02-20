import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import '../styles/globals.css'

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
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        // <NextThemesProvider
        //     defaultTheme="system"
        //     attribute="class"
        //     value={{
        //         light: lightTheme.className,
        //         dark: darkTheme.className
        //     }}
        // >
            <NextUIProvider theme={darkTheme}>
                {getLayout(<Component {...pageProps} />)}
            </NextUIProvider>
        // </NextThemesProvider>
    )
}