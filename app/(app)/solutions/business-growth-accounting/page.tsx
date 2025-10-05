import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/business-growth-accounting/hero-section';

export default function BusinessGrowthAccountingPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Business Growth Accounting | Grow While We Handle Compliance',
    description:
        "Grow your business, we'll keep the IRS happy. Scalable accounting solutions that support your growth while ensuring full tax compliance.",
    alternates: { canonical: '/solutions/business-growth-accounting' },
};
