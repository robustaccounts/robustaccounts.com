import type { Metadata } from 'next';

import { faqPageSchema, serviceSchema } from '@/lib/seo/schema';

import { JsonLd } from '@/components/seo/json-ld';

const FAQS = [
    {
        question: 'Do I really need a CFO?',
        answer:
            "If you're making complex decisions based on gut feeling rather than data, fractional CFO services provide high ROI.",
    },
    {
        question: 'How often do we meet?',
        answer:
            'It depends on your needs. We offer monthly, quarterly, or bi-weekly sessions.',
    },
    {
        question: 'Is this different from bookkeeping?',
        answer:
            'Yes. Bookkeeping looks backward. Financial advisory looks forward at what will happen.',
    },
    {
        question: 'Can you help with investor pitch decks?',
        answer:
            'Yes, we help founders prepare robust financial models for investor meetings.',
    },
];

export const metadata: Metadata = {
    title: 'Financial Advisory & CFO Services | Robust Accounts',
    description:
        'Fractional CFO and financial-advisory services for growing businesses — cash-flow forecasting, KPI dashboards, board-ready reporting, and growth strategy.',
    alternates: { canonical: '/services/financial-advisory' },
    openGraph: {
        title: 'Financial Advisory & CFO Services | Robust Accounts',
        description:
            'Fractional CFO services for growing businesses — cash-flow forecasting, KPI dashboards, board-ready reporting.',
        url: '/services/financial-advisory',
        type: 'website',
    },
};

export default function FinancialAdvisoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={[
                    serviceSchema({
                        name: 'Financial Advisory & Fractional CFO Services',
                        description:
                            'Fractional CFO services for growing businesses — cash-flow forecasting, KPI dashboards, board-ready reporting, and growth strategy.',
                        url: '/services/financial-advisory',
                        serviceType: 'FinancialAdvisory',
                    }),
                    faqPageSchema(FAQS, '/services/financial-advisory'),
                ]}
            />
            {children}
        </>
    );
}
