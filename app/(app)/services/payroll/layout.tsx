import type { Metadata } from 'next';

import { faqPageSchema, serviceSchema } from '@/lib/seo/schema';

import { JsonLd } from '@/components/seo/json-ld';

const FAQS = [
    {
        question: 'Do you handle filings for all 50 states?',
        answer:
            'Yes, we handle federal, state, and local payroll tax filings for employees in all 50 states.',
    },
    {
        question: 'Can I pay contractors (1099s) through this service?',
        answer:
            'Absolutely. We can handle payments and year-end 1099 filings for all your independent contractors.',
    },
    {
        question: 'How long does direct deposit take?',
        answer:
            'Standard processing is 2-4 business days. Next-day and same-day options are available.',
    },
    {
        question: 'Who handles onboarding new employees?',
        answer:
            'We provide self-service onboarding flows where new hires enter their info securely.',
    },
];

export const metadata: Metadata = {
    title: 'Payroll Processing & Tax Filing | Robust Accounts',
    description:
        'Full-service payroll for small businesses — direct deposit, W-2 / 1099 filing, multi-state tax compliance, and benefits integration. Mistake-free payroll runs.',
    alternates: { canonical: '/services/payroll' },
    openGraph: {
        title: 'Payroll Processing & Tax Filing | Robust Accounts',
        description:
            'Full-service payroll — direct deposit, W-2/1099, multi-state tax compliance, benefits integration.',
        url: '/services/payroll',
        type: 'website',
    },
};

export default function PayrollLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={[
                    serviceSchema({
                        name: 'Payroll Processing & Tax Filing',
                        description:
                            'Full-service payroll — direct deposit, W-2/1099 filing, multi-state tax compliance, and benefits integration.',
                        url: '/services/payroll',
                        serviceType: 'PayrollService',
                    }),
                    faqPageSchema(FAQS, '/services/payroll'),
                ]}
            />
            {children}
        </>
    );
}
