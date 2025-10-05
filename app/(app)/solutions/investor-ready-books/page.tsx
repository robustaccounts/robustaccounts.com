import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/investor-ready-books/hero-section';

export default function InvestorReadyBooksPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Investor-Ready Books | Financial Statements That Impress Investors',
    description:
        "Your books are always investor-ready, even if you're not. Professional bookkeeping services that prepare your financials for fundraising and due diligence.",
    alternates: { canonical: '/solutions/investor-ready-books' },
};
