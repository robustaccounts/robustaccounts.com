import type { Metadata } from 'next';
import Script from 'next/script';
import GoogleTag from '@/components/analytics/google-tag';

import { Providers } from '@/providers/providers';

import ContactUsBanner from '@/components/contact-us-banner';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import NewsletterSubscription from '@/components/newsletter-subscription';

// import StickyCtaMobile from '@/components/ui/sticky-cta-mobile';

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
                <Script
                    src="//code.tidio.co/9itfrqnmmdew7a6oktqq4yb0mm6cqddb.js"
                    strategy="beforeInteractive"
                />
                {/* Google Analytics/Ads via next/script (recommended) */}
                <GoogleTag />
                <Providers>
                    <Header />
                    {children}
                    <ContactUsBanner />
                    {/* <StickyCtaMobile /> */}
                    {/* <NewsletterSubscription /> */}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
