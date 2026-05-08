import type { Metadata } from 'next';

import { faqPageSchema, serviceSchema } from '@/lib/seo/schema';

import { JsonLd } from '@/components/seo/json-ld';

const FAQS = [
    {
        question: 'Do you work with my CPA?',
        answer:
            'Absolutely. We prepare your books so your CPA can focus on tax strategy and filing.',
    },
    {
        question: 'Which accounting software do you support?',
        answer:
            'We primarily work with QuickBooks Online and Xero, the industry standards.',
    },
    {
        question: 'How secure is my financial data?',
        answer:
            'We use bank-level 256-bit encryption. We never have authority to move your money.',
    },
    {
        question: 'What if I am behind on my books?',
        answer:
            'No problem! We offer catch-up services to bring messy data up to date.',
    },
];

export const metadata: Metadata = {
    title: 'Small-Business Bookkeeping Services | Robust Accounts',
    description:
        'Daily transaction categorization, monthly bank reconciliation, and tax-ready financial statements for small businesses. QuickBooks & Xero specialists.',
    alternates: { canonical: '/services/bookkeeping' },
    openGraph: {
        title: 'Small-Business Bookkeeping Services | Robust Accounts',
        description:
            'Daily categorization, monthly reconciliation, tax-ready financials. QuickBooks & Xero specialists.',
        url: '/services/bookkeeping',
        type: 'website',
    },
};

export default function BookkeepingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={[
                    serviceSchema({
                        name: 'Small-Business Bookkeeping Services',
                        description:
                            'Daily transaction categorization, monthly bank reconciliation, and tax-ready financial statements for small businesses.',
                        url: '/services/bookkeeping',
                        serviceType: 'Bookkeeping',
                        image: '/assets/images/bookkeeping-hero.png',
                    }),
                    faqPageSchema(FAQS, '/services/bookkeeping'),
                ]}
            />
            {children}
        </>
    );
}
