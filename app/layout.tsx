import { Analytics } from '@vercel/analytics/next';
import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import { Providers } from '@/providers/providers';

import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Accounting Outsourcing Agency',
    description: 'Accounting Outsourcing Agency',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body className={`${inter.className} antialiased`} suppressHydrationWarning>
                <Providers>
                    {children}

                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
