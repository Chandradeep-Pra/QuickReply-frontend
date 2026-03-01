import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ThemeRegistry from '@/components/theme-registry'
import AppShell from '@/components/app-shell'
import { PaperProvider } from '@/lib/paper-context'
import './globals.css'
import SideNavLayout from '@/components/SideNav'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PaperTrail - Research Paper Manager',
  description: 'Track, manage, and analyze your research papers across all stages of development.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ThemeRegistry>
          <PaperProvider>
            {/* <AppShell> */}
            <SideNavLayout>
              {children}
              </SideNavLayout>
            {/* </AppShell> */}
          </PaperProvider>
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  )
}
