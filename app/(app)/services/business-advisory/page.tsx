import React from 'react';

import cn from '@/utils/cn';

import PricingTiersSection, { PricingTier } from '@/components/pricing/pricing-tiers-section';
import BusinessAdvisoryHeroSection from '@/components/services/business-advisory/hero-section';
import BusinessAdvisoryFeaturesSection from '@/components/services/business-advisory/features-section';
import BusinessAdvisoryBenefitsSection from '@/components/services/business-advisory/benefits-section';

// Business Advisory-specific pricing tiers (all custom pricing)
const businessAdvisoryPricingTiers: PricingTier[] = [
    {
        name: 'Strategic Insights',
        price: 'Custom',
        annualPrice: 'Custom',
        description: 'Essential business advisory for growing companies',
        popular: false,
        features: [
            'Quarterly strategy sessions',
            'Market analysis reports',
            'Performance benchmarking',
            'Growth opportunity assessment',
            'Strategic planning support',
            'Email support',
        ],
        limitations: [
            'Limited session frequency',
            'Standard reporting templates',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=insights&service=business-advisory',
    },
    {
        name: 'Executive Advisory',
        price: 'Custom',
        annualPrice: 'Custom',
        description: 'Comprehensive strategic guidance and planning',
        popular: true,
        features: [
            'All Strategic Insights features',
            'Monthly strategy meetings',
            'Business plan development',
            'Market expansion planning',
            'Investment strategy guidance',
            'Priority support',
            'Custom analysis reports',
        ],
        limitations: [
            'Standard advisory hours',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=executive&service=business-advisory',
    },
    {
        name: 'Board Advisory',
        price: 'Custom',
        annualPrice: 'Custom',
        description: 'Board-level strategic advisory and governance',
        popular: false,
        features: [
            'All Executive Advisory features',
            'Board presentation support',
            'M&A transaction guidance',
            'Succession planning',
            'Investor relations support',
            '24/7 strategic support',
            'Dedicated senior advisor',
        ],
        limitations: [],
        cta: 'Contact Sales',
        href: '/contact?plan=board&service=business-advisory',
    },
];

export default function BusinessAdvisoryPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <BusinessAdvisoryHeroSection />

            {/* Features Section */}
            <BusinessAdvisoryFeaturesSection />

            {/* Benefits Section */}
            <BusinessAdvisoryBenefitsSection />

            {/* Pricing Section */}
            <section className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}>
                <PricingTiersSection 
                    pricingTiers={businessAdvisoryPricingTiers}
                    showToggle={false}
                    title="Choose Your Business Advisory Package"
                    subtitle="Custom pricing solutions designed specifically for your business advisory needs"
                />
            </section>
        </main>
    );
}
