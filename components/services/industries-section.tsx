import React from 'react';

import { Check } from 'lucide-react';

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

import FadeIn from '@/components/ui/fade-in';

export default function IndustriesSection() {
    return (
        <section className="w-full bg-white py-24 lg:py-32">
            <div className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-5 sm:gap-16 sm:px-8 lg:px-12">
                <FadeIn className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Industries We Serve
                    </h2>
                    <p className="max-w-3xl text-base sm:text-lg text-gray-600">
                        Specialized accounting expertise across diverse business
                        sectors with industry-specific solutions
                    </p>
                </FadeIn>

                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {industries.map((industry, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.05}
                            className="h-full"
                        >
                            <div
                                className="group h-full cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                            >
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl group-hover:text-primary transition-colors">
                                            {industry.name}
                                        </h3>
                                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                            {industry.description}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex flex-col gap-2.5">
                                        {industry.services.map(
                                            (service, serviceIndex) => (
                                                <div
                                                    key={serviceIndex}
                                                    className="flex items-center gap-2.5"
                                                >
                                                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/10 flex-shrink-0">
                                                        <Check className="h-2.5 w-2.5 text-accent" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {service}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
