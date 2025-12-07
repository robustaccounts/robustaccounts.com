import React from 'react';

import { ArrowRight } from 'lucide-react';
import Link from '@/ui/link';

interface AddOn {
    name: string;
    price: string;
    description: string;
    features: string[];
    href: string;
}

const addOns: AddOn[] = [
    {
        name: 'Catch-up Bookkeeping',
        price: 'Starting at $200/mo',
        description: 'Get your books in order and start fresh.',
        features: [
            'Reconcile past months and correct prior period entries.',
            'Deliver clean, audit-ready financial records.',
        ],
        href: '/lead-form/schedule?source=pricing&addon=catchup-bookkeeping',
    },
    {
        name: 'Payroll & Bill Pay',
        price: 'Starting at $150/mo',
        description: 'Streamlined payroll and accounts payable processing.',
        features: [
            'Full payroll processing, bill pay, vendor management, and 1099 prep.',
            'Flexible limits – upgrade as your team grows.',
            'Accountant review on all payments and workflows.',
        ],
        href: '/lead-form/schedule?source=pricing&addon=payroll-billpay',
    },
    {
        name: 'Financial Planning & Analysis',
        price: 'Starting at $300/mo',
        description: 'Turn your financials into strategic insights.',
        features: [
            'Cash flow forecasting and KPI tracking.',
            'Budget vs. actual reporting with scenario planning.',
            'Investor-ready financial models and projections.',
        ],
        href: '/lead-form/schedule?source=pricing&addon=fpa',
    },
    {
        name: 'E-commerce Accounting',
        price: 'Starting at $100/mo',
        description: 'Multi-channel accounting for online sellers.',
        features: [
            'Integrate Shopify, Amazon, Stripe, and PayPal.',
            'Track fees, refunds, chargebacks, and inventory costs.',
            'Channel profitability reporting you can act on.',
        ],
        href: '/lead-form/schedule?source=pricing&addon=ecommerce',
    },
    {
        name: 'Tax Services',
        price: 'Starting at $500',
        description: 'Professional tax preparation and compliance.',
        features: [
            'Business and personal returns, quarterly estimates, 1099 filing.',
            'Sales tax compliance and R&D credit studies available.',
            'Built on the clean books we maintain monthly.',
        ],
        href: '/lead-form/schedule?source=pricing&addon=tax',
    },
    {
        name: 'Dedicated Staff Augmentation',
        price: 'Starting at $2,000/mo',
        description: 'Experienced accounting professionals embedded in your team.',
        features: [
            'Add a bookkeeper, accountant, or CFO advisor to your team.',
            'Works in your timezone with full onboarding and oversight.',
            'Scale up or down with flat monthly pricing.',
        ],
        href: '/lead-form/schedule?source=pricing&addon=staff-augmentation',
    },
];

export default function AdditionalServicesSection() {
    return (
        <section className="flex items-center py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Add-ons to{' '}
                        <span className="text-accent">enhance your plan</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
                        Specialized services tailored to your business needs
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {addOns.map((addon, index) => (
                        <div
                            key={index}
                            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
                        >
                            {/* Header */}
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {addon.name}
                                </h3>
                                <p className="mt-1 text-sm font-semibold text-accent">
                                    {addon.price}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="mb-4 text-sm text-gray-600">
                                {addon.description}
                            </p>

                            {/* Features */}
                            <ul className="mb-6 flex-grow space-y-2">
                                {addon.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-start gap-2 text-sm text-gray-700"
                                    >
                                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href={addon.href}
                                className="mt-auto flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition-all group-hover:border-accent group-hover:text-accent"
                            >
                                Learn More
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
