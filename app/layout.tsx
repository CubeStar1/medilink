import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/global/theme-provider"
// import { Header } from '@/components/global/header'
import { Toaster } from "@/components/ui/sonner"
import QueryProvider from '@/components/global/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MediLink',
  description: 'Connecting Surplus Medicine with Those in Need',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
      </body>
    </html>
  )
}
