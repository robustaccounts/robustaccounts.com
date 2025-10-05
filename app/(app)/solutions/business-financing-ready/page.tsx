import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/business-financing-ready/hero-section';

export default function BusinessFinancingReadyPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Business Financing Ready | Clean Books for Faster Loans',
    description:
        'Clean books = faster loans and easier growth. Professional bookkeeping that prepares your business for bank loans, investors, and rapid expansion.',
    alternates: { canonical: '/solutions/business-financing-ready' },
};
