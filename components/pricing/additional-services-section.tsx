'use client';

import React from 'react';

import Link from '@/components/ui/link';

interface AddOn {
    name: string;
    price: string;
    description: string;
}

const addOns: AddOn[] = [
    {
        name: 'Catch-up Bookkeeping',
        price: 'Starting at $200/mo',
        description:
            'Get your books in order and start fresh. Reconcile past months and correct prior period entries.',
    },
    {
        name: 'Payroll & Bill Pay',
        price: 'Starting at $150/mo',
        description:
            'Full payroll processing, bill pay, vendor management, and 1099 prep with accountant review.',
    },
    {
        name: 'Financial Planning & Analysis',
        price: 'Starting at $300/mo',
        description:
            'Cash flow forecasting, KPI tracking, and investor-ready financial models.',
    },
    {
        name: 'E-commerce Accounting',
        price: 'Starting at $100/mo',
        description:
            'Multi-channel accounting for Shopify, Amazon, Stripe, and PayPal with profitability reporting.',
    },
    {
        name: 'Tax Services',
        price: 'Starting at $500',
        description:
            'Business and personal returns, quarterly estimates, 1099 filing, and sales tax compliance.',
    },
    {
        name: 'Dedicated Staff Augmentation',
        price: 'Starting at $2,000/mo',
        description:
            'Add a bookkeeper, accountant, or CFO advisor to your team with flat monthly pricing.',
    },
];

export default function AdditionalServicesSection() {
    return (
        <section className="bg-theme-offwhite py-20 lg:py-28">
            <div className="cust-container">
                <span className="mb-4 block text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                    Add-Ons
                </span>
                <h2 className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl">
                    Enhance Your Plan
                </h2>
                <p className="mb-12 max-w-2xl text-gray-600 lg:mb-16">
                    Specialized services tailored to your business needs. Add
                    these to any plan for expanded capabilities.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {addOns.map((addon, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-transparent hover:shadow-lg"
                        >
                            <h3 className="mb-2 text-xl font-semibold text-theme-black">
                                {addon.name}
                            </h3>
                            <p className="mb-4 text-sm font-semibold text-primary">
                                {addon.price}
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600">
                                {addon.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/lead-form/schedule?source=pricing&addon=custom"
                        className="btn-div inline-flex uppercase"
                    >
                        <span className="text-box">Discuss Add-Ons</span>
                        <span className="icon-box">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M5.67227 14.6363L4.59045 13.5545L12.0086 6.13632H5.36318V4.59087H14.6359V13.8636H13.0905V7.21814L5.67227 14.6363Z"
                                    fill="white"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
