import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/dedicated-accountant/hero-section';

export default function DedicatedAccountantPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Dedicated Accountant | Personal Service, Not a Call Center',
    description:
        'Your dedicated accountant — not a call center. Get personalized attention from an experienced accounting professional who knows your business.',
    alternates: { canonical: '/solutions/dedicated-accountant' },
};
