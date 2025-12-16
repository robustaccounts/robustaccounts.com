import BotpressChat from '@/providers/botpress-chat';

import ContactUsBanner from '@/components/contact-us-banner';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <BotpressChat />
        </>
    );
}
