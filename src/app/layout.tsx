// src/app/layout.tsx
import './globals.css'
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="cs" suppressHydrationWarning>
        <body className="bg-white text-black transition-colors duration-300">
        <Providers>{children}</Providers>
        </body>
        </html>
    )
}
