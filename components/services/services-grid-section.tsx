import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

import LearnMoreButton from '../common/learn-more-button';

const services = [
    {
        id: 'bookkeeping',
        title: 'Bookkeeping & Accounting',
        description:
            'Comprehensive bookkeeping services to keep your financial records accurate and up-to-date.',
        features: [
            'Daily transaction recording',
            'Bank reconciliation',
            'Accounts payable/receivable',
            'General ledger maintenance',
            'Monthly financial statements',
            'Expense tracking & categorization',
        ],
        pricing: 'Starting at $299/month',
        popular: true,
    },
    {
        id: 'payroll',
        title: 'Payroll Management',
        description:
            'Complete payroll processing including payments, taxes, and compliance reporting.',
        features: [
            'Employee payment processing',
            'Tax withholding & filings',
            'Benefits administration',
            'Time tracking integration',
            'Compliance reporting',
            'Direct deposit setup',
        ],
        pricing: 'Starting at $149/month',
        popular: false,
    },
    {
        id: 'financial-advisory',
        title: 'Financial Advisory',
        description:
            'Strategic financial insights to support budgeting, forecasting, and business growth.',
        features: [
            'Budget planning & analysis',
            'Cash flow forecasting',
            'Financial reporting',
            'Business performance analysis',
            'Growth strategy consulting',
            'Investment planning',
        ],
        pricing: 'Starting at $399/month',
        popular: false,
    },
    {
        id: 'business-advisory',
        title: 'Business Advisory',
        description:
            'Strategic business consulting to help you make informed financial decisions.',
        features: [
            'Business strategy consulting',
            'Market analysis',
            'Mergers & acquisitions',
            'Business valuation',
            'Succession planning',
            'Due diligence',
        ],
        pricing: 'Custom pricing',
        popular: false,
    },
];

export default function ServicesGridSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex max-w-4xl flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                    Choose Your Perfect Service Package
                </h2>
                <p className="text-base text-gray-600 sm:text-lg">
                    Professional accounting services designed to scale with your
                    business
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <div key={service.id} className="relative">
                        {service.popular && (
                            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform rounded-full bg-accent px-4 py-1 text-sm font-medium text-white">
                                Most Popular
                            </div>
                        )}
                        <div className="h-full cursor-pointer rounded-xl bg-secondary p-6 transition-all duration-300 sm:p-8">
                            <div className="flex h-full flex-col justify-between gap-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-semibold sm:text-xl lg:text-2xl">
                                            {service.title}
                                        </h3>
                                        <p className="font-semibold text-accent">
                                            {service.pricing}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-600 sm:text-base">
                                        {service.description}
                                    </p>

                                    <div className="space-y-3">
                                        {service.features.map(
                                            (feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3"
                                                >
                                                    <Check className="h-5 w-5 flex-shrink-0 fill-accent" />
                                                    <span className="text-sm text-gray-700 sm:text-base">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <LearnMoreButton
                                        href={`/services/${service.id}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
