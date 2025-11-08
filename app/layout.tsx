import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';

import BotpressChat from '@/providers/botpress-chat';
import { Providers } from '@/providers/providers';

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
        <html lang="en" suppressHydrationWarning>
            <body className={'font-sans antialiased'} suppressHydrationWarning>
                <Providers>
                    {children}

                    <Analytics />
                    <BotpressChat />
                </Providers>
            </body>
        </html>
    );
}
