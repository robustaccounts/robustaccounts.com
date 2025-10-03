import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/providers/providers';

import { config } from '@/lib/config';

import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(config.baseUrl),
    title: {
        default: 'Robust Accounts — Accounting Outsourcing Agency',
        template: '%s | Robust Accounts',
    },
    description:
        'Robust Accounts provides bookkeeping, payroll, and financial advisory services for growing businesses.',
    alternates: { canonical: '/' },
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans antialiased`}>
                <Providers>
                    {children}
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
