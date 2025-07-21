import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

const industries = [
    {
        name: 'Technology & Startups',
        description:
            'Specialized accounting for tech companies, SaaS businesses, and startups with complex equity structures.',
        services: [
            'Revenue recognition',
            'Equity accounting',
            'R&D tax credits',
            'Venture capital reporting',
        ],
    },
    {
        name: 'Healthcare & Life Sciences',
        description:
            'Compliance-focused accounting for healthcare providers, pharmaceutical companies, and medical device manufacturers.',
        services: [
            'Regulatory compliance',
            'Grant accounting',
            'Clinical trial costs',
            'Insurance billing',
        ],
    },
    {
        name: 'Manufacturing',
        description:
            'Cost accounting and inventory management for manufacturing companies of all sizes.',
        services: [
            'Cost accounting',
            'Inventory management',
            'Work-in-process tracking',
            'Supply chain finance',
        ],
    },
    {
        name: 'E-commerce & Retail',
        description:
            'Multi-channel accounting for online retailers, marketplaces, and traditional retail businesses.',
        services: [
            'Multi-channel reconciliation',
            'Inventory tracking',
            'Sales tax compliance',
            'Marketplace accounting',
        ],
    },
    {
        name: 'Professional Services',
        description:
            'Project-based accounting for consulting firms, law firms, and other professional service providers.',
        services: [
            'Project accounting',
            'Time tracking',
            'Client billing',
            'Partner distributions',
        ],
    },
    {
        name: 'Real Estate',
        description:
            'Property accounting for real estate developers, property managers, and investment firms.',
        services: [
            'Property accounting',
            'Tenant billing',
            'Construction accounting',
            'Investment reporting',
        ],
    },
    {
        name: 'Non-Profit Organizations',
        description:
            'Fund accounting and compliance reporting for non-profit organizations and foundations.',
        services: [
            'Fund accounting',
            'Grant reporting',
            'Donor management',
            'Compliance reporting',
        ],
    },
    {
        name: 'Financial Services',
        description:
            'Specialized accounting for banks, credit unions, investment firms, and fintech companies.',
        services: [
            'Regulatory reporting',
            'Investment accounting',
            'Risk management',
            'Compliance monitoring',
        ],
    },
];

export default function IndustriesSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Industries We Serve
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Specialized accounting expertise across diverse business
                    sectors with industry-specific solutions
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {industries.map((industry, index) => (
                    <div
                        key={index}
                        className="cursor-pointer rounded-2xl bg-secondary p-6 transition-all duration-300 sm:p-8"
                    >
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="text-lg font-semibold sm:text-xl">
                                    {industry.name}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                    {industry.description}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {industry.services.map(
                                    (service, serviceIndex) => (
                                        <div
                                            key={serviceIndex}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-4 w-4 flex-shrink-0 fill-accent" />
                                            <span className="text-sm text-gray-600">
                                                {service}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
