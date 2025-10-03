import React from 'react';

import cn from '@/utils/cn';

import PricingTiersSection, { PricingTier } from '@/components/pricing/pricing-tiers-section';
import FinancialAdvisoryHeroSection from '@/components/services/financial-advisory/hero-section';
import FinancialAdvisoryFeaturesSection from '@/components/services/financial-advisory/features-section';
import FinancialAdvisoryBenefitsSection from '@/components/services/financial-advisory/benefits-section';

// Financial Advisory-specific pricing tiers
const financialAdvisoryPricingTiers: PricingTier[] = [
    {
        name: 'Financial Insights',
        price: '$399',
        annualPrice: '$359',
        period: '/month',
        description: 'Essential financial advisory for growing businesses',
        popular: false,
        features: [
            'Monthly financial analysis',
            'Budget planning & review',
            'Cash flow forecasting',
            'Performance dashboards',
            'Quarterly strategy sessions',
            'Email support',
            'Basic financial reporting',
        ],
        limitations: [
            'Basic reporting templates',
            'Email support only',
            'Limited strategy sessions',
        ],
        cta: 'Get Started',
        href: '/getting-started?plan=insights&service=financial-advisory',
    },
    {
        name: 'Strategic Advisory',
        price: '$799',
        annualPrice: '$719',
        period: '/month',
        description: 'Comprehensive financial guidance and planning',
        popular: true,
        features: [
            'All Financial Insights features',
            'Advanced financial modeling',
            'Growth strategy development',
            'Investment analysis',
            'Risk assessment',
            'Monthly strategy calls',
            'Priority support',
            'Custom reporting',
        ],
        limitations: [
            'Standard advisory hours',
            'Limited custom modeling',
        ],
        cta: 'Get Started',
        href: '/getting-started?plan=strategic&service=financial-advisory',
    },
    {
        name: 'Executive Partnership',
        price: 'Custom',
        annualPrice: 'Custom',
        description: 'Dedicated CFO-level advisory services',
        popular: false,
        features: [
            'All Strategic Advisory features',
            'Dedicated senior advisor',
            'Weekly strategy sessions',
            'Board presentation support',
            'Investor relations guidance',
            'Custom financial models',
            '24/7 strategic support',
            'M&A advisory support',
        ],
        limitations: [],
        cta: 'Contact Sales',
        href: '/contact',
    },
];

export default function FinancialAdvisoryPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <FinancialAdvisoryHeroSection />

            {/* Features Section */}
            <FinancialAdvisoryFeaturesSection />

            {/* Benefits Section */}
            <FinancialAdvisoryBenefitsSection />

            {/* Pricing Section */}
            <section className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}>
                <PricingTiersSection 
                    pricingTiers={financialAdvisoryPricingTiers}
                    title="Choose Your Financial Advisory Package"
                    subtitle="Flexible pricing options designed specifically for your financial advisory needs"
                />
            </section>
        </main>
    );
}
