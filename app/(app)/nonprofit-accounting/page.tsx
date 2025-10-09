import type { Metadata } from 'next';
import React from 'react';

import GuaranteeSection from '@/components/accounting-services/guarantee-section';
import ContactUsBanner from '@/components/contact-us-banner';
import NonprofitFAQSection from '@/components/nonprofit-accounting/faq-section';
import NonprofitHeroSection from '@/components/nonprofit-accounting/hero-section';
import NonprofitServicesSection from '@/components/nonprofit-accounting/services-section';
import NonprofitTestimonialsSection from '@/components/nonprofit-accounting/testimonials-section';
import NonprofitValuesSection from '@/components/nonprofit-accounting/values-section';

export default function NonprofitAccountingPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <NonprofitHeroSection />
            <NonprofitServicesSection />
            <NonprofitValuesSection />
            <NonprofitTestimonialsSection />
            <GuaranteeSection />
            <NonprofitFAQSection />
            <ContactUsBanner />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Church & Non-Profit Accounting Services',
    description:
        'Expert accounting services for churches, ministries, and non-profit organizations. Fund accounting, grant reporting, IRS Form 990 preparation, and more. Ministry-minded professionals.',
    alternates: { canonical: '/nonprofit-accounting' },
};
