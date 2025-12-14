import React from 'react';

import Accounts from '@/ui/icons/accounts';
import FinancialAdvisory from '@/ui/icons/financial-advisory';
import Payroll from '@/ui/icons/payroll';
import Link from '@/ui/link';

import cn from '@/utils/cn';

import LearnMoreButton from '../common/learn-more-button';

const services = [
    {
        id: 1,
        icon: <Accounts className="h-6 w-6 text-accent" />,
        title: 'Bookkeeping & Accounting',
        description:
            'Comprehensive bookkeeping services including accounts payable/receivable, general ledger maintenance, and monthly financial statements.',
        features: [
            'Daily transaction recording',
            'Bank reconciliation',
            'Financial statements',
        ],
        href: '/services/bookkeeping',
    },
    {
        id: 2,
        icon: <Payroll className="h-6 w-6 text-accent" />,
        title: 'Payroll Management',
        description:
            'End-to-end payroll processing including employee payments, tax withholdings, and regulatory compliance reporting.',
        features: ['Employee payments', 'Tax filings', 'Compliance reporting'],
        href: '/services/payroll',
    },
    {
        id: 3,
        icon: <FinancialAdvisory className="h-6 w-6 text-accent" />,
        title: 'Financial Advisory',
        description:
            'Strategic financial insights and advisory services to support budgeting, forecasting, and long-term business growth.',
        features: [
            'Budget planning',
            'Cash flow analysis',
            'Growth strategies',
        ],
        href: '/services/financial-advisory',
    },
];

function ServicesCard({
    title,
    description,
    className,
    href,
    icon,
}: Readonly<{
    title: string;
    description: string;
    className?: string;
    href: string;
    icon: React.ReactNode;
}>) {
    return (
        <div
            className={cn(
                'group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10',
                className,
            )}
        >
            <div className="flex h-full flex-col justify-between gap-5 sm:gap-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 rounded-xl bg-accent/10 p-3 transition-colors group-hover:bg-accent/20">
                            {icon}
                        </div>
                        <h3 className="flex-1 pt-1 text-lg leading-tight font-bold text-primary sm:text-xl lg:text-2xl">
                            {title}
                        </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                        {description}
                    </p>
                </div>
                <LearnMoreButton href={href} />
            </div>
        </div>
    );
}

import FadeIn from '@/components/ui/fade-in';

// ... (keep imports)

export default function ServicesSection() {
    return (
        <section className="w-full bg-gray-50 py-24 sm:py-32">
            <div className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-12 px-5 sm:gap-16 sm:px-8 md:px-12 lg:px-16">
                <FadeIn className="flex flex-col items-center justify-center gap-4 text-center sm:gap-5">
                    <h2 className="text-[1.75rem] leading-tight font-bold tracking-[-0.02em] text-primary sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                        What We Handle
                    </h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                        A complete finance function, managed offshore.
                    </p>
                </FadeIn>
                <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                    {services.map((service, index) => (
                        <FadeIn
                            key={service.id}
                            delay={index * 0.1}
                            className="h-full"
                        >
                            <ServicesCard
                                title={service.title}
                                description={service.description}
                                href={service.href}
                                icon={service.icon}
                                className="h-full"
                            />
                        </FadeIn>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center gap-5 pt-4 text-center sm:gap-6">
                    <p className="text-sm text-gray-600 sm:text-base lg:text-lg">
                        See how we work with businesses like yours.
                    </p>
                    <Link
                        href="/services"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[0.9375rem] font-medium text-white transition-all duration-300 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 sm:px-9 sm:py-4 sm:text-base"
                    >
                        View Our Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
