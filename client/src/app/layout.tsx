import { Drawer } from '@mui/material'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MenuAppBar from '@/components/MenuAppBar'
import NextThemeProvider from '@/components/NextThemeProvider'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className + " bg-slate-800 text-white max-h-screen"}>
        <NextThemeProvider>
          {children}
        </NextThemeProvider>
      </body>
    </html>
  )
}
