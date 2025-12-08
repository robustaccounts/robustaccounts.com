import React from 'react';

import { Check } from 'lucide-react';

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
];

import FadeIn from '@/components/ui/fade-in';

export default function ServicesGridSection() {
    return (
        <section className="w-full bg-gray-50 py-24 lg:py-32">
            <div className="container mx-auto flex w-full flex-col items-center justify-center gap-12 px-5 sm:gap-16 sm:px-8 lg:px-12">
                <FadeIn className="flex max-w-4xl flex-col items-center justify-center gap-4 text-center">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-gray-900">
                        Choose Your Perfect Service Package
                    </h2>
                    <p className="text-base text-gray-600 sm:text-lg">
                        Professional accounting services designed to scale with your
                        business
                    </p>
                </FadeIn>

                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <FadeIn
                            key={service.id}
                            delay={index * 0.1}
                            className="relative h-full"
                        >
                            {service.popular && (
                                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform rounded-full bg-accent px-4 py-1 text-sm font-medium text-white shadow-md">
                                    Most Popular
                                </div>
                            )}
                            <div className={cn(
                                "group flex h-full flex-col justify-between rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-xl sm:p-8",
                                service.popular ? "border-accent/20 ring-1 ring-accent/10" : "border-gray-100"
                            )}>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                            {service.title}
                                        </h3>
                                        <p className="font-bold text-accent text-lg">
                                            {service.pricing}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-600 sm:text-base leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="space-y-3">
                                        {service.features.map(
                                            (feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                                                        <Check className="h-3 w-3 text-accent" />
                                                    </div>
                                                    <span className="text-sm text-gray-700 sm:text-base">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <LearnMoreButton
                                        href={`/services/${service.id}`}
                                        className="w-full justify-center"
                                    />
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
