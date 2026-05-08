import type { Metadata } from 'next';
import React from 'react';

import AdditionalServicesSection from '@/components/pricing/additional-services-section';
import ComparisonTableSection from '@/components/pricing/comparison-table-section';
import HeroSection from '@/components/pricing/hero-section';
import PricingTiersSection from '@/components/pricing/pricing-tiers-section';

export default function PricingPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <PricingTiersSection />
            <AdditionalServicesSection />
            <ComparisonTableSection />
        </main>
    );
}


export const metadata: Metadata = {
    title: 'Accounting & Bookkeeping Pricing Plans | Robust Accounts',
    description:
        'Affordable bookkeeping & accounting plans from $160/month. Starter, Professional, or Enterprise — payroll, tax prep, CFO advisory. No hidden fees.',
    keywords: [
        'bookkeeping pricing',
        'accounting services cost',
        'small business accounting',
        'bookkeeping plans',
        'payroll services pricing',
        'tax preparation cost',
        'CFO advisory services',
        'outsourced accounting',
    ],
    openGraph: {
        title: 'Simple, Transparent Pricing | Robust Accounts',
        description:
            'Full-service bookkeeping and accounting from $160/month. Payroll, tax prep, and CFO advisory included. No surprises.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Accounting & Bookkeeping Pricing | Robust Accounts',
        description:
            'Professional bookkeeping from $160/month. Payroll, tax prep, CFO advisory. Plans that scale with your business.',
    },
    alternates: { canonical: '/pricing' },
};
