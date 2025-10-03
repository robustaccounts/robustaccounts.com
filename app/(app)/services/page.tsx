import React from 'react';
import type { Metadata } from 'next';

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
    title: 'Services',
    description:
        'Comprehensive bookkeeping, payroll, financial and business advisory services tailored to your needs.',
    alternates: { canonical: '/services' },
};
