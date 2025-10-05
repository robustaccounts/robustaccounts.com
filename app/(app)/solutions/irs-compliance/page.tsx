import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/irs-compliance/hero-section';

export default function IRSCompliancePage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'IRS Compliance Made Easy | Never Worry About IRS Audits',
    description:
        "Sleep easy knowing the IRS won't come knocking. Expert accounting services ensuring full IRS compliance and tax accuracy for your business.",
    alternates: { canonical: '/solutions/irs-compliance' },
};
