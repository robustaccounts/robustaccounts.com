import type { Metadata } from 'next';
import React from 'react';

import AIEmpoweredSection from '@/components/accounting-services/ai-empowered-section';
import AccountingServicesFAQSection from '@/components/accounting-services/faq-section';
import GuaranteeSection from '@/components/accounting-services/guarantee-section';
import AccountingServicesHeroSection from '@/components/accounting-services/hero-section';
import ServicesOverviewSection from '@/components/accounting-services/services-overview-section';
import WhyRobustSection from '@/components/accounting-services/why-robust-section';
import SoftwaresMasterySection from '@/components/common/softwares-mastery';
import ContactUsBanner from '@/components/contact-us-banner';
import TestimonialsSection from '@/components/pricing/testimonials-section';

export default function AccountingServicesPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <AccountingServicesHeroSection />
            <ServicesOverviewSection />
            <WhyRobustSection />
            <AIEmpoweredSection />
            <SoftwaresMasterySection />
            <GuaranteeSection />
            <TestimonialsSection />
            <AccountingServicesFAQSection />
            <ContactUsBanner />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Accounting Services - Complete Financial Solutions',
    description:
        'The only accounting solution that scales with you. Bookkeeping, payroll, tax services, and fractional CFO support. U.S.-based experts. AI-empowered efficiency.',
    alternates: { canonical: '/accounting-services' },
};
