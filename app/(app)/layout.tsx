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
            <Header />
            {children}
            <ContactUsBanner />
            <Footer />
        </>
    );
}
