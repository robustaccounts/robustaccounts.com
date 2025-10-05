import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/bookkeeping-service/hero-section';

export default function BookkeepingServicePage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Professional Bookkeeping Service | Stop Wasting Weekends on Books',
    description:
        "Stop wasting Sundays on spreadsheets — we'll do it for you. Expert bookkeeping services that free up your time to focus on growing your business.",
    alternates: { canonical: '/solutions/bookkeeping-service' },
};
