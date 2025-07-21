import React from 'react';

import AdditionalServicesSection from '@/components/pricing/additional-services-section';
import ComparisonTableSection from '@/components/pricing/comparison-table-section';
import FaqSection from '@/components/pricing/faq-section';
import HeroSection from '@/components/pricing/hero-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';

export default function PricingPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <AdditionalServicesSection />
            <ComparisonTableSection />
            <TestimonialsSection />
            <FaqSection />
        </main>
    );
}
