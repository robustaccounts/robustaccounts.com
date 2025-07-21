import React from 'react';

import cn from '@/utils/cn';

import PricingTiersSection, { PricingTier } from '@/components/pricing/pricing-tiers-section';
import BookkeepingHeroSection from '@/components/services/bookkeeping/hero-section';
import BookkeepingFeaturesSection from '@/components/services/bookkeeping/features-section';
import BookkeepingBenefitsSection from '@/components/services/bookkeeping/benefits-section';

// Bookkeeping-specific pricing tiers
const bookkeepingPricingTiers: PricingTier[] = [
    {
        name: 'Starter',
        price: '$299',
        annualPrice: '$269',
        period: '/month',
        description: 'Perfect for small businesses with basic bookkeeping needs',
        popular: false,
        features: [
            'Up to 50 transactions/month',
            'Bank reconciliation',
            'Basic financial statements',
            'Monthly reporting',
            'Email support',
            'Transaction categorization',
            'Expense tracking',
        ],
        limitations: [
            'Basic reporting only',
            'Email support only',
            'No tax preparation',
        ],
        cta: 'Get Started',
        href: '/getting-started?plan=starter&service=bookkeeping',
    },
    {
        name: 'Professional',
        price: '$499',
        annualPrice: '$449',
        period: '/month',
        description: 'Ideal for growing businesses with moderate transaction volume',
        popular: true,
        features: [
            'Up to 200 transactions/month',
            'Full bookkeeping services',
            'Accounts payable/receivable management',
            'Advanced financial statements',
            'Weekly reporting',
            'Phone & email support',
            'Tax preparation support',
            'Dedicated bookkeeper',
        ],
        limitations: [
            'Limited advisory hours',
            'Standard reporting templates',
        ],
        cta: 'Get Started',
        href: '/getting-started?plan=professional&service=bookkeeping',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        annualPrice: 'Custom',
        description: 'Comprehensive solution for established businesses',
        popular: false,
        features: [
            'Unlimited transactions',
            'Dedicated senior bookkeeper',
            'Custom financial reporting',
            'Daily updates available',
            'Priority support',
            'CFO advisory services',
            'Multi-location support',
            'Advanced analytics',
            'Audit preparation support',
        ],
        limitations: [],
        cta: 'Contact Sales',
        href: '/contact',
    },
];

export default function BookkeepingPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <BookkeepingHeroSection />

            {/* Features Section */}
            <BookkeepingFeaturesSection />

            {/* Benefits Section */}
            <BookkeepingBenefitsSection />

            {/* Pricing Section */}
            <section className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}>
                <PricingTiersSection 
                    pricingTiers={bookkeepingPricingTiers}
                    title="Choose Your Bookkeeping Package"
                    subtitle="Flexible pricing options designed specifically for your bookkeeping needs"
                />
            </section>
        </main>
    );
}
