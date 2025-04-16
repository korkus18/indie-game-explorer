// src/app/layout.tsx
import './globals.css'
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="cs" className="bg-zinc-900 text-white" suppressHydrationWarning>
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    )
}
export const metadata = {
    title: 'Indie Game Explorer',
    description: 'Objevuj ty nejlepší indie hry',
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
    },
}

