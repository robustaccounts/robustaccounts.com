import type { Metadata } from 'next';
import React from 'react';

import AdditionalServicesSection from '@/components/pricing/additional-services-section';
import ComparisonTableSection from '@/components/pricing/comparison-table-section';
import FaqSection from '@/components/pricing/faq-section';
import HeroSection from '@/components/pricing/hero-section';
import PricingTiersSection from '@/components/pricing/pricing-tiers-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';

export default function PricingPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <PricingTiersSection />
            <AdditionalServicesSection />
            <ComparisonTableSection />
            <TestimonialsSection />
            <FaqSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Pricing',
    description:
        'Transparent, scalable pricing for bookkeeping, payroll, and advisory services. Find the right plan for your business.',
    alternates: { canonical: '/pricing' },
};
