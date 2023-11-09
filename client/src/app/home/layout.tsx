import { Drawer } from '@mui/material'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MenuAppBar from '@/components/MenuAppBar'
import NextThemeProvider from '@/components/NextThemeProvider'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function HomeLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <>
            <MenuAppBar isAdmin={false} />
            {children}
        </>
    )
}
