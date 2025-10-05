import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/tax-optimization/hero-section';

export default function TaxOptimizationPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Tax Optimization Services | Legal Tax Reduction Strategies',
    description:
        'Pay less tax legally, with no surprise bills. Strategic tax planning and optimization services that maximize deductions and minimize your tax burden.',
    alternates: { canonical: '/solutions/tax-optimization' },
};
