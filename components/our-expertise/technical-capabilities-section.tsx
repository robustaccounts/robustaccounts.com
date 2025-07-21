import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

const technicalCapabilities = [
    {
        title: 'International Accounting Standards',
        description:
            'Expert knowledge of IFRS and GAAP standards for global businesses.',
        details: [
            'IFRS implementation and compliance',
            'GAAP to IFRS conversion',
            'Multi-currency accounting',
            'International tax planning',
        ],
    },
    {
        title: 'Advanced Technology Stack',
        description:
            'Proficiency in all major accounting software and emerging technologies.',
        details: [
            'Cloud-based accounting platforms',
            'API integrations and automation',
            'AI-powered data analysis',
            'Real-time reporting dashboards',
        ],
    },
    {
        title: 'Regulatory Compliance',
        description:
            'Comprehensive understanding of regulatory requirements across jurisdictions.',
        details: [
            'SOX compliance and internal controls',
            'GDPR data protection',
            'Industry-specific regulations',
            'Audit preparation and support',
        ],
    },
    {
        title: 'Financial Analysis & Reporting',
        description:
            'Advanced financial modeling and business intelligence capabilities.',
        details: [
            'Management reporting and KPIs',
            'Budgeting and forecasting',
            'Variance analysis',
            'Business intelligence dashboards',
        ],
    },
];

export default function TechnicalCapabilitiesSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Technical Capabilities
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Advanced technical expertise to handle complex accounting
                    challenges
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                {technicalCapabilities.map((capability, index) => (
                    <div
                        key={index}
                        className="rounded-2xl bg-secondary p-6 transition-all duration-300 sm:p-8"
                    >
                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="text-xl font-semibold sm:text-2xl">
                                    {capability.title}
                                </h3>
                                <p className="mt-2 text-sm sm:text-base">
                                    {capability.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {capability.details.map(
                                    (detail, detailIndex) => (
                                        <div
                                            key={detailIndex}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-4 w-4 flex-shrink-0 fill-accent" />
                                            <span className="text-sm">
                                                {detail}
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
