import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from '@remix-run/react';
import { type Theme, PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";

import { LoaderData } from '~/root';
import Navbar from './Navbar';

export function Layout({ children }: { children: React.ReactNode }) {
  let data = useRouteLoaderData<LoaderData | { theme: Theme }>('root');

  if (typeof window !== 'undefined') {
    if (data) {
      localStorage.setItem('theme', data.theme as Theme);
    } else {
      data = { theme: localStorage.getItem('theme') as Theme };
    }
  }

  return (
    <ThemeProvider
      specifiedTheme={data?.theme as Theme}
      themeAction="/action/set-theme"
    >
      <InnerLayout ssrTheme={Boolean(data?.theme)}>{children}</InnerLayout>
    </ThemeProvider>
  );

}

function InnerLayout({
  ssrTheme,
  children,
}: {
  ssrTheme: boolean;
  children: React.ReactNode;
}) {
  const [themeX] = useTheme();

  return (
    <html lang="en" data-theme={themeX ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={ssrTheme} />
        <Links />
      </head>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white h-screen selection:bg-gray-50 dark:selection:bg-gray-800">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
