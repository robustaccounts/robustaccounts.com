import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

const steps = [
    {
        number: '01',
        title: 'GET',
        subtitle: 'Understanding Your Business',
        description:
            'We get an understanding of your business, its bookkeeping, accounting and reconciliation status. Then, we discuss future business plans, the scope of work and other deliverables.',
        details: [
            'Comprehensive business assessment',
            'Current financial status review',
            'Future goals and objectives discussion',
            'Scope of work definition',
            'Deliverables planning',
            'Timeline establishment',
        ],
    },
    {
        number: '02',
        title: 'SET',
        subtitle: 'Setting Up Your Success',
        description:
            'We mutually set a process for data access, query resolution and reporting. Upon contract agreement, we set up a dedicated accounting team for you.',
        details: [
            'Data access protocols establishment',
            'Query resolution process setup',
            'Reporting framework creation',
            'Contract agreement finalization',
            'Dedicated team assignment',
            'Communication channels setup',
        ],
    },
    {
        number: '03',
        title: 'GO',
        subtitle: 'Focus on Growth',
        description:
            'You can focus on your business and leave the rest to us as we manage your end-to-end accounting, bookkeeping, payroll, sales tax and tax return function.',
        details: [
            'End-to-end accounting management',
            'Comprehensive bookkeeping services',
            'Payroll processing and management',
            'Sales tax handling and compliance',
            'Tax return preparation and filing',
            'Ongoing support and optimization',
        ],
    },
];

export function ProcessStepsSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-4 text-center sm:gap-6">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Our 3-Step Process
                </h2>
                <p className="text-base lg:text-lg">
                    From understanding your needs to delivering exceptional
                    results
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                {steps.map((step, index) => (
                    <div key={index} className="relative h-full">
                        {/* Connection Line */}
                        {index < steps.length - 1 && (
                            <div className="absolute top-16 left-1/2 hidden h-0.5 w-full bg-gray-200 lg:block" />
                        )}

                        <div className="relative h-full rounded-2xl bg-secondary p-8 transition-all duration-300">
                            {/* Step Number */}
                            <div className="absolute -top-4 left-8 rounded-full bg-accent px-4 py-2 text-sm font-bold text-white">
                                {step.number}
                            </div>

                            <div className="flex h-full flex-col gap-6 pt-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary sm:text-3xl">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg font-medium text-gray-700">
                                        {step.subtitle}
                                    </p>
                                </div>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                                <div className="flex flex-col gap-2">
                                    {step.details.map((detail, detailIndex) => (
                                        <div
                                            key={detailIndex}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-4 w-4 flex-shrink-0 fill-primary" />
                                            <span className="text-sm text-gray-600">
                                                {detail}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
