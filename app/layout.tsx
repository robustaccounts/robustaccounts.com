import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';

import { Providers } from '@/providers/providers';

import GoogleTag from '@/components/analytics/google-tag';

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
                <GoogleTag />
                <Providers>
                    {children}

                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
