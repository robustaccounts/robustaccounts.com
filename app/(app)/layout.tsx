import Script from 'next/script';

import ContactUsBanner from '@/components/contact-us-banner';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Script
                src="//code.tidio.co/9itfrqnmmdew7a6oktqq4yb0mm6cqddb.js"
                strategy="beforeInteractive"
            />
            <Header />
            <main id="main-content" role="main">
                {children}
            </main>
            <ContactUsBanner />
            <Footer />
        </>
    );
}
