import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/cash-flow-management/hero-section';

export default function CashFlowManagementPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Cash Flow Management | Real-Time Financial Visibility',
    description:
        'Know your cash flow in minutes, not days. Get instant visibility into your business finances with real-time reporting and expert analysis.',
    alternates: { canonical: '/solutions/cash-flow-management' },
};
