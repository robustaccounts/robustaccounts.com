import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';
import { config } from '@/lib/config';

import { Providers } from '@/providers/providers';
import { Inter } from 'next/font/google';

import ContactUsBanner from '@/components/contact-us-banner';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import NewsletterSubscription from '@/components/newsletter-subscription';

// import StickyCtaMobile from '@/components/ui/sticky-cta-mobile';

import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(config.baseUrl),
    title: {
        default: 'Robust Accounts — Accounting Outsourcing Agency',
        template: '%s | Robust Accounts',
    },
    description: 'Robust Accounts provides bookkeeping, payroll, and financial advisory services for growing businesses.',
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
                    <Header />
                    {children}
                    <ContactUsBanner />
                    {/* <StickyCtaMobile /> */}
                    {/* <NewsletterSubscription /> */}

                    <Footer />
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
