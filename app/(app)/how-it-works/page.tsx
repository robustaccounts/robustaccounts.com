import type { Metadata } from 'next';
import React from 'react';

import { BenefitsSection } from '@/components/how-it-works/benefits-section';
import { HeroSection } from '@/components/how-it-works/hero-section';
import { ProcessStepsSection } from '@/components/how-it-works/process-steps-section';
import { TimelineSection } from '@/components/how-it-works/timeline-section';

export const metadata: Metadata = {
    title: 'How Robust Accounts Works | Onboarding to Monthly Books',
    description:
        'See how Robust Accounts onboards your business — connect accounts, daily categorization, monthly close, and tax-ready financials. Get started in days, not weeks.',
    alternates: { canonical: '/how-it-works' },
    openGraph: {
        title: 'How Robust Accounts Works | Onboarding to Monthly Books',
        description:
            'How we onboard your business and run monthly bookkeeping — from connecting accounts to delivering tax-ready financial statements.',
        url: '/how-it-works',
        type: 'website',
    },
};

export default function HowItWorksPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <ProcessStepsSection />
            <TimelineSection />
            <BenefitsSection />
        </main>
    );
}
