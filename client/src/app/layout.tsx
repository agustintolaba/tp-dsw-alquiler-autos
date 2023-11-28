import './globals.css';
import NextThemeProvider from '@/components/layout/NextThemeProvider';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={'bg-slate-800 text-white max-h-screen'}>
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  );
}
