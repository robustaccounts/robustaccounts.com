import { Analytics } from '@vercel/analytics/next';
import { Manrope } from 'next/font/google';

import type { Metadata } from 'next';

import { config } from '@/lib/config';
import { Providers } from '@/providers/providers';
import SiteShell from '@/components/layout/site-shell';
import { SiteSchema } from '@/components/seo/site-schema';

import './globals.css';

const manrope = Manrope({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-manrope',
    weight: ['300', '400', '500', '600', '700', '800'],
});

const SITE_NAME = 'Robust Accounts';
const DEFAULT_TITLE =
    'Robust Accounts | Bookkeeping, Payroll & Financial Advisory';
const DEFAULT_DESCRIPTION =
    'Professional accounting, bookkeeping, payroll, and tax-ready financials for small businesses. Free 30-min consultation with Robust Accounts.';

export const metadata: Metadata = {
    metadataBase: new URL(config.baseUrl),
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        siteName: SITE_NAME,
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        url: '/',
        locale: 'en_US',
        images: [
            {
                url: '/assets/logo.png',
                width: 1200,
                height: 630,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        images: ['/assets/logo.png'],
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/assets/logo.png',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={manrope.variable} suppressHydrationWarning>
            <body className={`${manrope.className} antialiased`} suppressHydrationWarning>
                <SiteSchema />
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
