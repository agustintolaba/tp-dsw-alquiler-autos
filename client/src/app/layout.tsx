import { Drawer } from '@mui/material'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MenuAppBar from '@/components/MenuAppBar'
import NextThemeProvider from '@/components/NextThemeProvider'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rueda libre',
  description: 'Rental car company',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className + " bg-zinc-950 text-white"}>
        <NextThemeProvider>
          <MenuAppBar isAdmin={false}/>
          {children}
        </NextThemeProvider>
        </body>
    </html>
  )
}
