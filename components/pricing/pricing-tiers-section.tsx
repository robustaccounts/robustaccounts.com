'use client';

import React, { useState } from 'react';

import { Check } from '@/ui/icons/google-icons';
import Link from '@/ui/link';

interface PricingTier {
    name: string;
    price: string;
    annualPrice: string;
    period?: string;
    description: string;
    popular: boolean;
    features: string[];
    limitations: string[];
    cta: string;
    href: string;
}

const defaultPricingTiers: PricingTier[] = [
    {
        name: 'Starter',
        price: '$299',
        annualPrice: '$269',
        period: '/month',
        description: 'Perfect for small businesses and startups',
        popular: false,
        features: [
            'Monthly bookkeeping',
            'Basic financial statements',
            'Transaction categorization',
            'Bank reconciliation',
            'Expense tracking',
            'Monthly reports',
            'Email support',
            'Up to 100 transactions/month',
        ],
        limitations: [
            'Basic reporting only',
            'Email support only',
            'No tax preparation',
        ],
        cta: 'Get Started',
        href: '/lead-form/schedule?source=pricing&plan=starter',
    },
    {
        name: 'Professional',
        price: '$599',
        annualPrice: '$539',
        period: '/month',
        description: 'Ideal for growing businesses',
        popular: true,
        features: [
            'Everything in Starter',
            'Advanced financial statements',
            'Cash flow management',
            'Budget planning & analysis',
            'Tax preparation & filing',
            'Quarterly business reviews',
            'Dedicated account manager',
            'Phone & email support',
            'Up to 500 transactions/month',
            'Financial advisory calls',
        ],
        limitations: ['Limited advisory hours', 'Standard reporting'],
        cta: 'Get Started',
        href: '/lead-form/schedule?source=pricing&plan=professional',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        annualPrice: 'Custom',
        description: 'Comprehensive solution for established businesses',
        popular: false,
        features: [
            'Everything in Professional',
            'Custom financial reporting',
            'Advanced analytics & insights',
            'Multi-entity management',
            'Audit preparation support',
            'Strategic planning sessions',
            'Priority support',
            'Dedicated CFO advisory',
            'Unlimited transactions',
            'Custom integrations',
            'Compliance monitoring',
        ],
        limitations: [],
        cta: 'Get Started',
        href: '/lead-form/schedule?source=pricing&plan=enterprise',
    },
];

interface PricingTiersSectionProps {
    pricingTiers?: PricingTier[];
    showToggle?: boolean;
    title?: string;
    subtitle?: string;
}

export default function PricingTiersSection({
    pricingTiers = defaultPricingTiers,
    showToggle = true,
    title,
    subtitle,
}: PricingTiersSectionProps) {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section className="flex items-center">
            <div className="container mx-auto flex flex-col items-center justify-center gap-14 px-4 sm:px-6 lg:px-12">
                {/* Optional Title and Subtitle */}
                {(title || subtitle) && (
                    <div className="text-center">
                        {title && (
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Pricing Toggle */}
                {showToggle && (
                    <div className="flex w-max items-center gap-4 rounded-full border border-gray-200 p-1">
                        <button
                            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                !isAnnual
                                    ? 'bg-accent text-white'
                                    : 'text-gray-600 hover:text-accent'
                            }`}
                            onClick={() => setIsAnnual(false)}
                        >
                            Monthly
                        </button>
                        <button
                            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                isAnnual
                                    ? 'bg-accent text-white'
                                    : 'text-gray-600 hover:text-accent'
                            }`}
                            onClick={() => setIsAnnual(true)}
                        >
                            Annual (Save 10%)
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                                tier.popular
                                    ? 'scale-105 border-accent'
                                    : 'border-gray-200 hover:border-accent'
                            }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-sm font-semibold text-white">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold">
                                    {tier.name}
                                </h3>
                                <p className="text-sm">{tier.description}</p>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold">
                                        {tier.price === 'Custom'
                                            ? 'Custom'
                                            : showToggle && isAnnual
                                              ? tier.annualPrice
                                              : tier.price}
                                    </span>
                                    {tier.period && tier.price !== 'Custom' && (
                                        <span>{tier.period}</span>
                                    )}
                                </div>
                                {showToggle &&
                                    isAnnual &&
                                    tier.price !== 'Custom' && (
                                        <div className="mt-1 text-sm">
                                            <span className="line-through">
                                                {tier.price}/month
                                            </span>
                                            <span className="ml-2 font-medium text-accent">
                                                Save 10%
                                            </span>
                                        </div>
                                    )}
                            </div>

                            <div className="mb-6">
                                <Link
                                    href={tier.href}
                                    className="block w-full rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-accent/80"
                                >
                                    {tier.cta}
                                </Link>
                            </div>

                            <div className="mb-6 flex-grow">
                                <h4 className="mb-3 text-sm font-semibold">
                                    What's included:
                                </h4>
                                <div className="space-y-3">
                                    {tier.features.map(
                                        (feature, featureIndex) => (
                                            <div
                                                key={featureIndex}
                                                className="flex items-start gap-3"
                                            >
                                                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 fill-primary" />
                                                <span className="text-sm">
                                                    {feature}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {tier.limitations.length > 0 && (
                                <div className="border-t border-gray-200 pt-4">
                                    <h4 className="mb-2 text-xs font-semibold uppercase">
                                        Limitations:
                                    </h4>
                                    <div className="space-y-1">
                                        {tier.limitations.map(
                                            (limitation, limitIndex) => (
                                                <div
                                                    key={limitIndex}
                                                    className="text-xs"
                                                >
                                                    • {limitation}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export type { PricingTier };
