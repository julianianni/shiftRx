import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/domain/auth/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/infrastructure/queryClient'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/domain/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auction app',
  description: 'place your bids!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <body className={inter.className}>
            <Toaster
              position={'bottom-right'}
              toastOptions={{
                duration: 6000,
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
            <Navbar />

            {children}
          </body>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  )
}
