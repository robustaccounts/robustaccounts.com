import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/tax-season-ready/hero-section';

export default function TaxSeasonReadyPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Tax Season Ready | Year-Round Tax Preparation Services',
    description:
        'Never scramble at tax season again. Stay organized year-round with professional bookkeeping and tax preparation that eliminates last-minute stress.',
    alternates: { canonical: '/solutions/tax-season-ready' },
};
