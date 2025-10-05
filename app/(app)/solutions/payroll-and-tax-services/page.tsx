import type { Metadata } from 'next';
import React from 'react';

import FAQSection from '@/components/home/faq-section';
import TestimonialsSection from '@/components/pricing/testimonials-section';
import HeroSection from '@/components/solutions/payroll-and-tax-services/hero-section';

export default function PayrollAndTaxServicesPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Payroll & Tax Services | Hassle-Free Payroll and Tax Management',
    description:
        'From payroll to taxes, handled without the headaches. Comprehensive payroll processing and tax services that ensure compliance and accuracy.',
    alternates: { canonical: '/solutions/payroll-and-tax-services' },
};
