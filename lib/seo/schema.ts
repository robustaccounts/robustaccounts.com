import { config } from '@/lib/config';
import siteConfig from '@/siteconfig';

const baseUrl = config.baseUrl;

export type FaqItem = { question: string; answer: string };

export function faqPageSchema(faqs: FaqItem[], pageUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${baseUrl}${pageUrl}#faq`,
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
            },
        })),
    };
}

export function serviceSchema(args: {
    name: string;
    description: string;
    url: string;
    serviceType?: string;
    image?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${baseUrl}${args.url}#service`,
        name: args.name,
        description: args.description,
        url: `${baseUrl}${args.url}`,
        serviceType: args.serviceType ?? 'Accounting',
        image: args.image
            ? `${baseUrl}${args.image}`
            : `${baseUrl}/assets/logo.png`,
        provider: { '@id': `${baseUrl}#organization` },
        areaServed: [
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Country', name: 'Canada' },
        ],
    };
}

export function blogPostingSchema(args: {
    slug: string;
    title: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    image?: string;
}) {
    const url = `${baseUrl}/blog/${args.slug}`;
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: args.title,
        description: args.description,
        datePublished: args.datePublished,
        dateModified: args.dateModified ?? args.datePublished,
        author: { '@type': 'Person', name: args.author },
        publisher: { '@id': `${baseUrl}#organization` },
        image: args.image
            ? `${baseUrl}${args.image}`
            : `${baseUrl}/assets/logo.png`,
        url,
        inLanguage: 'en-US',
    };
}

export function breadcrumbSchema(
    crumbs: Array<{ name: string; url: string }>,
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: `${baseUrl}${c.url}`,
        })),
    };
}

export const ORGANIZATION_REF = { '@id': `${baseUrl}#organization` };
export const SITE_NAME = siteConfig.firm.name;
