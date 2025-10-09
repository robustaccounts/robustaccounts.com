import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';

import { Providers } from '@/providers/providers';

import SkipToContent from '@/components/common/skip-to-content';

import './globals.css';

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
        <html lang="en">
            <body className={'font-sans antialiased'}>
                <SkipToContent />
                <Providers>
                    {children}

                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
