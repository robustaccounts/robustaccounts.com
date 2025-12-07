'use client';

import React, { useState } from 'react';

import { Check, Info } from 'lucide-react';
import Link from '@/ui/link';
import ExpenseSlider from './expense-slider';

interface PricingTier {
    name: string;
    basePrice: number;
    tagline: string;
    description: string;
    features: Array<{
        text: string;
        tooltip?: string;
    }>;
    cta: string;
    href: string;
}

// Pricing based on monthly expense level ($10K to $200K)
// Industry-standard scaling: prices roughly 2-2.5x from min to max expense
// Prices always round to nearest $10
const getPriceForExpense = (basePrice: number, expense: number): number => {
    // Base prices are for $10K expenses (minimum)
    // At $200K expenses, prices are approximately 2-2.5x the base
    // Using logarithmic scaling for natural pricing curve
    
    const minExpense = 10000;
    const maxExpense = 200000;
    
    // Clamp expense to valid range
    const clampedExpense = Math.max(minExpense, Math.min(maxExpense, expense));
    
    // Calculate position in range (0 to 1)
    const position = (clampedExpense - minExpense) / (maxExpense - minExpense);
    
    // Industry standard: ~2.2x multiplier at max expense
    // Using exponential curve for natural pricing progression
    const maxMultiplier = 2.2;
    const scaleFactor = 1 + (maxMultiplier - 1) * Math.pow(position, 0.85);
    
    const rawPrice = basePrice * scaleFactor;
    
    // Round to nearest $10
    return Math.round(rawPrice / 10) * 10;
};


// Determine which plan is recommended based on expense level
const getRecommendedPlanIndex = (expense: number): number => {
    if (expense <= 50000) return 0; // Starter: up to $50K
    if (expense <= 150000) return 1; // Professional: $50K-$150K
    return 2; // Enterprise: $150K+
};

const defaultPricingTiers: PricingTier[] = [
    {
        name: 'Starter',
        basePrice: 160,
        tagline: 'Perfect for small businesses',
        description:
            'Expert bookkeeping with accountant oversight. Get clean, accurate financials every month without the hassle.',
        features: [
            {
                text: 'Dedicated bookkeeper + accountant review',
                tooltip:
                    'Your own bookkeeper handles daily work, senior accountant reviews all entries',
            },
            {
                text: 'Daily transaction categorization',
                tooltip:
                    'Transactions coded and organized every business day',
            },
            {
                text: 'Bank & credit card reconciliation',
                tooltip: 'All accounts reconciled to ensure accuracy',
            },
            {
                text: '15-day month-end close',
                tooltip:
                    'Financial statements ready within 15 days of month end',
            },
            {
                text: 'Monthly financial statements',
                tooltip:
                    'Balance sheet, income statement, and cash flow report',
            },
            {
                text: 'Secure client portal',
                tooltip: 'Share documents and communicate securely online',
            },
            {
                text: 'Quarterly review calls',
                tooltip:
                    'Review your financials with your accountant each quarter',
            },
            {
                text: 'Year-end tax package',
                tooltip: 'Books organized and ready for your tax preparer',
            },
            {
                text: 'Unlimited email support',
                tooltip: 'Responses within 4 business hours',
            },
        ],
        cta: 'Get Started',
        href: '/lead-form/schedule?source=pricing&plan=starter',
    },
    {
        name: 'Professional',
        basePrice: 460,
        tagline: 'Built for growing teams',
        description:
            'Full-service accounting with payroll, AP/AR, and GAAP-compliant reporting. Scale confidently with expert guidance.',
        features: [
            {
                text: 'Everything in Starter, plus:',
                tooltip: 'All Starter features included',
            },
            {
                text: 'Senior accountant as your lead',
                tooltip:
                    'Work directly with an experienced senior accountant',
            },
            {
                text: '10-day GAAP-compliant close',
                tooltip: 'Faster closing with full GAAP compliance',
            },
            {
                text: 'Full payroll processing',
                tooltip:
                    'Direct deposit, tax filings, W-2s handled for you',
            },
            {
                text: 'Accounts payable & bill pay',
                tooltip:
                    'We manage vendor payments and keep track of what you owe',
            },
            {
                text: 'Invoicing & accounts receivable',
                tooltip: 'Send invoices and track customer payments',
            },
            {
                text: 'Monthly strategy calls',
                tooltip:
                    'Discuss your financials with your dedicated accountant monthly',
            },
            {
                text: 'Board-ready financial reports',
                tooltip:
                    'Professional reports suitable for investors and boards',
            },
            {
                text: 'Priority email & phone support',
                tooltip: 'Responses within 4 business hours',
            },
        ],
        cta: 'Get Started',
        href: '/lead-form/schedule?source=pricing&plan=professional',
    },
    {
        name: 'Enterprise',
        basePrice: 1270,
        tagline: 'For high-growth companies',
        description:
            'CFO-level advisory with comprehensive financial management. Strategic insights to drive your business forward.',
        features: [
            {
                text: 'Everything in Professional, plus:',
                tooltip: 'All Professional features included',
            },
            {
                text: 'Dedicated CFO advisor',
                tooltip:
                    'Strategic financial guidance from an experienced CFO',
            },
            {
                text: 'Unlimited payroll & AP processing',
                tooltip: 'No limits on employees or vendor payments',
            },
            {
                text: 'Custom chart of accounts',
                tooltip: 'Tailored financial structure for your specific needs',
            },
            {
                text: 'Department & project tracking',
                tooltip:
                    'Track profitability by department, project, or location',
            },
            {
                text: 'Multi-entity consolidation',
                tooltip:
                    'Manage multiple companies with consolidated reporting',
            },
            {
                text: 'Financial planning & analysis',
                tooltip: 'Budgets, forecasts, and scenario planning',
            },
            {
                text: '2-hour priority response',
                tooltip: 'Fastest support response for urgent matters',
            },
            {
                text: 'Quarterly business reviews',
                tooltip: 'In-depth strategic reviews with your CFO advisor',
            },
        ],
        cta: 'Contact Us',
        href: '/lead-form/schedule?source=pricing&plan=enterprise',
    },
];

interface PricingTiersSectionProps {
    pricingTiers?: PricingTier[];
    title?: string;
    subtitle?: string;
}

export default function PricingTiersSection({
    pricingTiers = defaultPricingTiers,
    title,
    subtitle,
}: PricingTiersSectionProps) {
    // Single synchronized expense value shared across all cards
    const [expenseValue, setExpenseValue] = useState(50000);
    
    // Get recommended plan based on current expense level
    const recommendedIndex = getRecommendedPlanIndex(expenseValue);
    
    // Check if at Custom pricing (beyond $200K)
    const isCustomPricing = expenseValue > 200000;


    return (
        <section className="flex items-center" id="pricing-plans">
            <div className="container mx-auto flex flex-col items-center justify-center gap-14 px-4 sm:px-6 lg:px-12">
                {/* Optional Title and Subtitle */}
                {(title || subtitle) && (
                    <div className="text-center">
                        {title && (
                            <h2 className="mb-4 text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="mx-auto max-w-3xl text-base font-normal text-gray-600 sm:text-lg lg:text-xl">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pricingTiers.map((tier, index) => {
                        const currentPrice = getPriceForExpense(
                            tier.basePrice,
                            expenseValue,
                        );
                        const isRecommended = index === recommendedIndex;

                        return (
                            <div
                                key={index}
                                className={`group relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                                    isRecommended
                                        ? 'border-2 border-accent bg-secondary ring-1 ring-accent/20'
                                        : 'border border-gray-200 bg-white hover:border-accent hover:bg-primary hover:text-white'
                                }`}
                            >
                                {/* Recommended Badge */}
                                {isRecommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
                                        Recommended
                                    </div>
                                )}

                                {/* Header */}
                                <div className="mb-4">
                                    <h3
                                        className={`text-xl font-semibold text-gray-900 ${!isRecommended ? 'group-hover:text-white' : ''}`}
                                    >
                                        {tier.name}
                                    </h3>
                                    <p className={`mt-1 text-sm font-medium text-accent ${!isRecommended ? 'group-hover:text-accent' : ''}`}>
                                        {tier.tagline}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    <div className="flex items-baseline">
                                        {isCustomPricing ? (
                                            <span
                                                className={`text-4xl font-bold tracking-tight text-gray-900 ${!isRecommended ? 'group-hover:text-white' : ''}`}
                                            >
                                                Custom
                                            </span>
                                        ) : (
                                            <>
                                                <span
                                                    className={`text-5xl font-bold tracking-tight transition-all duration-300 text-gray-900 ${!isRecommended ? 'group-hover:text-white' : ''}`}
                                                >
                                                    ${currentPrice.toLocaleString()}
                                                </span>
                                                <span
                                                    className={`ml-1 text-lg font-normal text-gray-600 ${!isRecommended ? 'group-hover:text-gray-100' : ''}`}
                                                >
                                                    /month
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <p className={`mt-1 text-sm font-medium text-accent ${!isRecommended ? 'group-hover:text-accent' : ''}`}>
                                        {isCustomPricing ? 'Contact us for pricing' : 'Billed annually (save 10%)'}
                                    </p>
                                </div>


                                {/* Description */}
                                <p
                                    className={`mb-6 text-sm font-normal leading-relaxed text-gray-600 ${!isRecommended ? 'group-hover:text-gray-100' : ''}`}
                                >
                                    {tier.description}
                                </p>


                                {/* Expense Slider - Per card but synced */}
                                <div className="mb-6">
                                    <ExpenseSlider
                                        value={expenseValue}
                                        onChange={setExpenseValue}
                                        isRecommended={isRecommended}
                                    />
                                </div>


                                {/* Features */}
                                <div className="mb-6 flex-grow">
                                    <h4
                                        className={`mb-4 text-sm font-medium text-gray-700 ${!isRecommended ? 'group-hover:text-gray-100' : ''}`}
                                    >
                                        What&apos;s included:
                                    </h4>
                                    <div className="space-y-3">
                                        {tier.features.map(
                                            (feature, featureIndex) => (
                                                <div
                                                    key={featureIndex}
                                                    className="group/feature flex items-start justify-between gap-2"
                                                >
                                                    <div className="flex items-start gap-2">
                                                        <Check
                                                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                                                        />
                                                        <span
                                                            className={`text-sm font-normal text-gray-700 ${!isRecommended ? 'group-hover:text-gray-100' : ''}`}
                                                        >
                                                            {feature.text}
                                                        </span>
                                                    </div>
                                                    {feature.tooltip && (
                                                        <div className="relative">
                                                            <Info
                                                                className={`h-4 w-4 cursor-help text-gray-400 ${!isRecommended ? 'group-hover:text-gray-200' : ''}`}
                                                            />
                                                            {/* Tooltip */}
                                                            <div className="invisible absolute right-0 bottom-full z-10 mb-2 w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal text-white opacity-0 transition-all duration-200 group-hover/feature:visible group-hover/feature:opacity-100">
                                                                {feature.tooltip}
                                                                <div className="absolute top-full right-2 h-2 w-2 rotate-45 bg-gray-900" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="mt-auto">
                                    <Link
                                        href={tier.href}
                                        className={`block w-full rounded-full py-3.5 text-center text-sm font-semibold transition-all ${
                                            isRecommended
                                                ? 'bg-accent text-white hover:bg-accent/90'
                                                : 'bg-accent text-white hover:bg-white hover:text-primary group-hover:bg-white group-hover:text-primary'
                                        }`}
                                    >
                                        {isCustomPricing ? 'Contact Us' : tier.cta}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export type { PricingTier };
