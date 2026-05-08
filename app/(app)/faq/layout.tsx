import type { Metadata } from 'next';

import { FAQ_PAGE_FAQS } from '@/lib/seo/faq-page-faqs';
import { faqPageSchema } from '@/lib/seo/schema';

import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
    title: 'Accounting & Bookkeeping FAQ | Robust Accounts',
    description:
        'Answers to the most-asked questions about Robust Accounts — onboarding, pricing, software support, security, and how we work with your CPA.',
    alternates: { canonical: '/faq' },
    openGraph: {
        title: 'Accounting & Bookkeeping FAQ | Robust Accounts',
        description:
            'The most-asked questions about how Robust Accounts works — onboarding, pricing, software, security.',
        url: '/faq',
        type: 'website',
    },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={faqPageSchema(FAQ_PAGE_FAQS, '/faq')} />
            {children}
        </>
    );
}
