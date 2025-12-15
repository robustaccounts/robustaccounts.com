import { Analytics } from '@vercel/analytics/next';
import { Manrope } from 'next/font/google';

import type { Metadata } from 'next';

import { Providers } from '@/providers/providers';
import SiteShell from '@/components/layout/site-shell';

import './globals.css';

const manrope = Manrope({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-manrope',
    weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
    title: 'Robust Accounts | Professional Accounting Services',
    description: 'Professional accounting and bookkeeping services designed to help your business grow. We handle the numbers so you can focus on what matters.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={manrope.variable} suppressHydrationWarning>
            <body className={`${manrope.className} antialiased`} suppressHydrationWarning>
                <Providers>
                    <SiteShell>
                        {children}
                    </SiteShell>
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
