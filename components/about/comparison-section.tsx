import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

const comparisonData = [
    {
        category: 'Technology & Innovation',
        robustAccounts: {
            title: 'Cutting-Edge Technology',
            features: [
                'Cloud-based accounting platforms',
                'Real-time financial reporting',
                'Automated processes and AI integration',
                'Mobile accessibility',
                'Advanced security protocols',
            ],
        },
        traditional: {
            title: 'Traditional Methods',
            features: [
                'Manual paper-based processes',
                'Delayed reporting cycles',
                'Limited automation',
                'Office-bound access only',
                'Basic security measures',
            ],
        },
    },
    {
        category: 'Accessibility & Convenience',
        robustAccounts: {
            title: '24/7 Global Access',
            features: [
                'Round-the-clock service availability',
                'Global team across time zones',
                'Instant communication channels',
                'No geographical limitations',
                'Flexible engagement models',
            ],
        },
        traditional: {
            title: 'Limited Availability',
            features: [
                'Business hours only',
                'Local team constraints',
                'Phone/email communication only',
                'Geographical restrictions',
                'Fixed service packages',
            ],
        },
    },
    {
        category: 'Cost & Efficiency',
        robustAccounts: {
            title: 'Cost-Effective Solutions',
            features: [
                'Predictable monthly pricing',
                'No overhead costs passed to clients',
                'Scalable services as you grow',
                'Reduced operational expenses',
                'Higher ROI on accounting spend',
            ],
        },
        traditional: {
            title: 'Higher Costs',
            features: [
                'Variable hourly billing',
                'Office overhead included in fees',
                'Fixed service limitations',
                'Additional charges for extra work',
                'Lower cost efficiency',
            ],
        },
    },
    {
        category: 'Expertise & Specialization',
        robustAccounts: {
            title: 'Specialized Expertise',
            features: [
                'Industry-specific knowledge',
                'Multi-country compliance expertise',
                'Dedicated specialists for each service',
                'Continuous training and certification',
                'Access to global best practices',
            ],
        },
        traditional: {
            title: 'General Practice',
            features: [
                'Limited industry specialization',
                'Local compliance focus only',
                'Generalist approach',
                'Variable training standards',
                'Local market knowledge only',
            ],
        },
    },
];

export default function ComparisonSection() {
    return (
        <section className={cn('py-12 lg:py-16')}>
            <div
                className={cn(
                    'flex w-full flex-col items-center justify-center gap-12 px-4 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
                )}
            >
                <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                        Robust Accounts vs{' '}
                        <span className="text-accent">Traditional</span>{' '}
                        Accounting Firms
                    </h2>
                    <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                        Discover why modern businesses choose our innovative
                        approach over traditional accounting methods.
                    </p>
                </div>

                <div className="w-full max-w-6xl space-y-8">
                    {comparisonData.map((category, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl p-5 sm:p-8"
                        >
                            <div className="pb-3 text-center sm:pb-4">
                                <h3 className="text-2xl font-bold text-accent sm:text-3xl">
                                    {category.category}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                                {/* Robust Accounts Column */}
                                <div className="rounded-2xl bg-white p-5 sm:p-6 lg:p-8">
                                    <div className="mb-4 flex items-start justify-between">
                                        <h4 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                            {category.robustAccounts.title}
                                        </h4>
                                        <span className="hidden rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent sm:inline-flex">
                                            Robust Accounts
                                        </span>
                                    </div>
                                    <ul className="space-y-3">
                                        {category.robustAccounts.features.map(
                                            (feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                                                        <Check className="h-3.5 w-3.5 fill-accent" />
                                                    </div>
                                                    <span className="text-gray-700">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>

                                {/* Traditional Firms Column */}
                                <div className="rounded-2xl bg-white p-5 sm:p-6 lg:p-8">
                                    <div className="mb-4 flex items-start justify-between">
                                        <h4 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                            {category.traditional.title}
                                        </h4>
                                        <span className="hidden rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 sm:inline-flex">
                                            Traditional
                                        </span>
                                    </div>
                                    <ul className="space-y-3">
                                        {category.traditional.features.map(
                                            (feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                                                        <svg
                                                            className="h-3.5 w-3.5 fill-gray-500"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span className="text-gray-700">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl text-center">
                    <p className="mb-6 text-lg text-gray-600">
                        Ready to experience the difference? Join thousands of
                        businesses that have already made the switch to modern
                        accounting.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <ScheduleMyCallButton size="lg" showSubtext={false} />
                    </div>
                </div>
            </div>
        </section>
    );
}
