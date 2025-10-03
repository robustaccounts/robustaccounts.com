import React from 'react';
import type { Metadata } from 'next';

import SoftwaresMasterySection from '@/components/common/softwares-mastery';
import FAQSection from '@/components/home/faq-section';
import HeroSection from '@/components/home/hero-section';
import ProcessStepsSection from '@/components/home/process-steps-section';
import ServicesSection from '@/components/home/services-section';
import WhyChooseUsSection from '@/components/home/why-choose-us-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <ServicesSection />
            <SoftwaresMasterySection />
            <ProcessStepsSection />
            <WhyChooseUsSection />
            <FAQSection />
            <TestimonialsSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Accounting Outsourcing for Growing Businesses',
    description:
        'Save time and reduce costs with expert bookkeeping, payroll, and financial advisory. Schedule a free consultation with Robust Accounts.',
    alternates: { canonical: '/' },
};
