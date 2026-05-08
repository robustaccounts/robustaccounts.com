import type { Metadata } from 'next';
import React from 'react';

import HeroSection from '@/components/services/hero-section';
import IndustriesSection from '@/components/services/industries-section';
import ServicesGridSection from '@/components/services/services-grid-section';

export default function ServicesPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <ServicesGridSection />
            <IndustriesSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Bookkeeping, Payroll & Tax Services | Robust Accounts',
    description:
        'Comprehensive bookkeeping, payroll, and financial-advisory services for small businesses — tailored to your industry, software, and growth stage.',
    alternates: { canonical: '/services' },
    openGraph: {
        title: 'Bookkeeping, Payroll & Tax Services | Robust Accounts',
        description:
            'Bookkeeping, payroll, and financial advisory built for small businesses. Tailored to your industry, software, and growth stage.',
        url: '/services',
        type: 'website',
    },
};
