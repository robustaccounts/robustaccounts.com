import type { Metadata } from 'next';
import React from 'react';

import { HOME_FAQS } from '@/lib/seo/home-faqs';
import { faqPageSchema } from '@/lib/seo/schema';

import ContactUsBanner from '@/components/contact-us-banner';
import FAQSection from '@/components/sections/faq-section';
import HeroSection from '@/components/sections/hero-section';
import ProcessWorkflow from '@/components/sections/process-workflow';
import { JsonLd } from '@/components/seo/json-ld';
import ServicesSection from '@/components/sections/services-section';
import SoftwaresMasterySection from '@/components/sections/softwares-mastery';
import StatsSection from '@/components/sections/stats-section';
import WhyChooseUsSection from '@/components/sections/why-choose-us-section';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <JsonLd data={faqPageSchema(HOME_FAQS, '/')} />
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
    title: 'Robust Accounts | Bookkeeping, Payroll & Financial Advisory',
    description:
        'Save time and reduce costs with expert bookkeeping, payroll, and financial advisory. Schedule a free 30-minute consultation with Robust Accounts.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'Robust Accounts | Bookkeeping, Payroll & Financial Advisory',
        description:
            'Expert bookkeeping, payroll, and financial advisory for small businesses. Free 30-minute consultation.',
        url: '/',
        type: 'website',
    },
};
