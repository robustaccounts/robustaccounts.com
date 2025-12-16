import type { Metadata } from 'next';
import React from 'react';

import ContactUsBanner from '@/components/contact-us-banner';
import FAQSection from '@/components/sections/faq-section';
import HeroSection from '@/components/sections/hero-section';
import ProcessWorkflow from '@/components/sections/process-workflow';
import ServicesSection from '@/components/sections/services-section';
import SoftwaresMasterySection from '@/components/sections/softwares-mastery';
import StatsSection from '@/components/sections/stats-section';
import WhyChooseUsSection from '@/components/sections/why-choose-us-section';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <StatsSection />
            <ServicesSection />
            <SoftwaresMasterySection />
            <ProcessWorkflow />
            <WhyChooseUsSection />
            <FAQSection />
            <ContactUsBanner />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Accounting Outsourcing for Growing Businesses',
    description:
        'Save time and reduce costs with expert bookkeeping, payroll, and financial advisory. Schedule a free consultation with Robust Accounts.',
    alternates: { canonical: '/' },
};
