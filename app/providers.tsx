'use client'
import { ThemeProvider } from 'next-themes';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useEffect, useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const SiteThemeContext = createContext({
  currentTheme: 'dark',
  setCurrentTheme: (theme: string) => { }
});

export function Providers({ children } : { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      if (!localStorage.getItem('next-theme')) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        localStorage.setItem('next-theme', systemTheme);
      }
      setCurrentTheme(localStorage.getItem('next-theme') ?? 'dark');
    }
  }, []);

  return (
    <SiteThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider storageKey='next-theme' forcedTheme={currentTheme}>
          <MuiThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
            {children}
          </MuiThemeProvider>
      </ThemeProvider>
    </SiteThemeContext.Provider>
  )
}
