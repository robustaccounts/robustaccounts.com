import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/plain-english-accounting/hero-section';

export default function PlainEnglishAccountingPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Plain English Accounting | Financial Reports You Can Actually Understand',
    description:
        'Financial clarity in plain English, not accountant-speak. Easy-to-understand financial reports and insights that help you make informed business decisions.',
    alternates: { canonical: '/solutions/plain-english-accounting' },
};
