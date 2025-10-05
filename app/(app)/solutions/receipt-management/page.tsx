import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/receipt-management/hero-section';

export default function ReceiptManagementPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Receipt Management Service | Focus on Business, Not Paperwork',
    description:
        'Focus on running your business, not chasing receipts. Automated receipt tracking and expense management that saves you time and headaches.',
    alternates: { canonical: '/solutions/receipt-management' },
};
