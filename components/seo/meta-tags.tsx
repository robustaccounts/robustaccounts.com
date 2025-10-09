import { Metadata } from 'next';

interface GenerateMetadataProps {
    title: string;
    description: string;
    path: string;
    image?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    keywords?: string[];
}

/**
 * Generate comprehensive metadata including Open Graph and Twitter Cards
 *
 * @example
 * export const metadata = generateMetadata({
 *   title: 'Bookkeeping Services',
 *   description: 'Expert bookkeeping for your business',
 *   path: '/services/bookkeeping',
 *   keywords: ['bookkeeping', 'accounting', 'financial services']
 * });
 */
export function generateMetadata({
    title,
    description,
    path,
    image = 'https://robustaccounts.com/og-image.jpg',
    type = 'website',
    publishedTime,
    modifiedTime,
    keywords = [],
}: GenerateMetadataProps): Metadata {
    const siteName = 'Robust Accounts';
    const url = `https://robustaccounts.com${path}`;
    const fullTitle = title.includes(siteName)
        ? title
        : `${title} | ${siteName}`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: siteName }],
        creator: siteName,
        publisher: siteName,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type,
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
            creator: '@robustaccounts',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}
