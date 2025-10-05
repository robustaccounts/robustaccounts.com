import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/transparent-pricing/hero-section';

export default function TransparentPricingPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Transparent Pricing | One Flat Fee, No Hidden Costs',
    description:
        'One flat fee, no hidden surprises. Clear, predictable pricing for professional accounting services that fit your budget and grow with your business.',
    alternates: { canonical: '/solutions/transparent-pricing' },
};
