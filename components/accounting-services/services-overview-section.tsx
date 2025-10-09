import Link from 'next/link';
import React from 'react';

import Accounts from '@/ui/icons/accounts';
import BusinessAdvisory from '@/ui/icons/business-advisory';
import FinancialAdvisory from '@/ui/icons/financial-advisory';
import { Check } from '@/ui/icons/google-icons';
import Payroll from '@/ui/icons/payroll';

import cn from '@/utils/cn';

const services = [
    {
        icon: <Accounts className="h-12 w-12 fill-accent" />,
        title: 'Bookkeeping',
        description: 'Clean, accurate books — closed on time, every month.',
        features: [
            'Daily transaction recording',
            'Bank reconciliation',
            'Monthly financial statements',
            'Expense tracking',
        ],
        href: '/services/bookkeeping',
    },
    {
        icon: <Payroll className="h-12 w-12 fill-accent" />,
        title: 'Full-Service Payroll',
        description:
            'Direct deposits, tax filings, and reporting — done for you.',
        features: [
            'Employee payment processing',
            'Tax withholdings & filings',
            'Compliance reporting',
            'Benefits administration',
        ],
        href: '/services/payroll',
    },
    {
        icon: <FinancialAdvisory className="h-12 w-12 fill-accent" />,
        title: 'Tax Services',
        description:
            'Corporate, personal, and quarterly taxes. Prepared, filed, and guided.',
        features: [
            'Tax preparation & filing',
            'Tax planning & strategy',
            'IRS compliance',
            'Tax advisory services',
        ],
        href: '/services/financial-advisory',
    },
    {
        icon: <BusinessAdvisory className="h-12 w-12 fill-accent" />,
        title: 'Fractional CFO',
        description:
            'Strategic planning, forecasting, budgeting, and capital insights.',
        features: [
            'Financial strategy',
            'Cash flow forecasting',
            'Budget planning',
            'Growth advisory',
        ],
        href: '/services/business-advisory',
    },
];

export default function ServicesOverviewSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 bg-secondary px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Every Financial Function.{' '}
                    <span className="text-accent">One Trusted Partner.</span>
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    From bookkeeping to CFO support, Robust Accounts delivers a
                    complete suite of financial services — customizable,
                    scalable, and tailored to your exact needs.
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="group flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                        {/* Icon */}
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary transition-colors group-hover:bg-accent/10">
                            {service.icon}
                        </div>

                        {/* Title & Description */}
                        <div>
                            <h3 className="mb-3 text-xl font-bold text-primary sm:text-2xl">
                                {service.title}
                            </h3>
                            <p className="text-base leading-relaxed text-gray-600">
                                {service.description}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="flex-1 space-y-3">
                            {service.features.map((feature, featureIndex) => (
                                <div
                                    key={featureIndex}
                                    className="flex items-start gap-3"
                                >
                                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 fill-accent" />
                                    <span className="text-sm leading-relaxed text-gray-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Learn More Link */}
                        <Link
                            href={service.href}
                            className="inline-flex items-center text-sm font-semibold text-accent transition-all hover:gap-2 hover:text-accent/80"
                        >
                            Learn More →
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
