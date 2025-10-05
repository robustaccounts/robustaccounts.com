import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/financial-clarity/hero-section';

export default function FinancialClarityPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Financial Clarity | Understand Your Numbers Without Jargon',
    description:
        'Finally understand your numbers without accounting jargon. Clear, simple financial reporting and analysis that empowers better business decisions.',
    alternates: { canonical: '/solutions/financial-clarity' },
};
