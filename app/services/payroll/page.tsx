import React from 'react';

import cn from '@/utils/cn';

import PricingTiersSection, { PricingTier } from '@/components/pricing/pricing-tiers-section';
import PayrollHeroSection from '@/components/services/payroll/hero-section';
import PayrollFeaturesSection from '@/components/services/payroll/features-section';
import PayrollBenefitsSection from '@/components/services/payroll/benefits-section';

// Payroll-specific pricing tiers
const payrollPricingTiers: PricingTier[] = [
    {
        name: 'Essentials',
        price: '$149',
        annualPrice: '$134',
        period: '/month',
        description: 'Perfect for small teams getting started with payroll',
        popular: false,
        features: [
            'Up to 5 employees included',
            'Direct deposit processing',
            'Basic tax filings',
            'Employee pay stubs',
            'Monthly reporting',
            'Email support',
            '$8/additional employee',
        ],
        limitations: [
            'Basic reporting only',
            'Email support only',
            'No benefits administration',
        ],
        cta: 'Get Started',
        href: '/getting-started?plan=essentials&service=payroll',
    },
    {
        name: 'Professional',
        price: '$299',
        annualPrice: '$269',
        period: '/month',
        description: 'Comprehensive payroll for growing businesses',
        popular: true,
        features: [
            'Up to 15 employees included',
            'All Essential features',
            'Benefits administration',
            'Time tracking integration',
            'Quarterly tax reports',
            'Phone & email support',
            'HR compliance tools',
            '$6/additional employee',
        ],
        limitations: [
            'Standard reporting templates',
            'Limited HR features',
        ],
        cta: 'Get Started',
        href: '/getting-started?plan=professional&service=payroll',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        annualPrice: 'Custom',
        description: 'Advanced payroll solution for large organizations',
        popular: false,
        features: [
            'Up to 50 employees included',
            'All Professional features',
            'Dedicated payroll specialist',
            'Advanced reporting & analytics',
            'Multi-location support',
            'Priority support',
            'Custom integrations',
            '$4/additional employee',
        ],
        limitations: [],
        cta: 'Contact Sales',
        href: '/contact',
    },
];

export default function PayrollPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <PayrollHeroSection />

            {/* Features Section */}
            <PayrollFeaturesSection />

            {/* Benefits Section */}
            <PayrollBenefitsSection />

            {/* Pricing Section */}
            <section className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}>
                <PricingTiersSection 
                    pricingTiers={payrollPricingTiers}
                    title="Choose Your Payroll Package"
                    subtitle="Flexible pricing options designed specifically for your payroll needs"
                />
            </section>
        </main>
    );
}
