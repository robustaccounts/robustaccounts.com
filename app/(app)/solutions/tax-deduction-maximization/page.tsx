import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/tax-deduction-maximization/hero-section';

export default function TaxDeductionMaximizationPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Tax Deduction Maximization | Never Miss Another Tax Deduction',
    description:
        'No more missed deductions — keep more of your money. Expert tax planning that identifies every eligible deduction to maximize your savings.',
    alternates: { canonical: '/solutions/tax-deduction-maximization' },
};
