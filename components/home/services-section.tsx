import React from 'react';

import Accounts from '@/ui/icons/accounts';
import BusinessAdvisory from '@/ui/icons/business-advisory';
import FinancialAdvisory from '@/ui/icons/financial-advisory';
import Payroll from '@/ui/icons/payroll';
import Link from '@/ui/link';

import cn from '@/utils/cn';

import LearnMoreButton from '../common/learn-more-button';

const services = [
    {
        id: 1,
        icon: <Accounts className="h-6 w-6 fill-accent" />,
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
        icon: <Payroll className="h-6 w-6 fill-accent" />,
        title: 'Payroll Management',
        description:
            'End-to-end payroll processing including employee payments, tax withholdings, and regulatory compliance reporting.',
        features: ['Employee payments', 'Tax filings', 'Compliance reporting'],
        href: '/services/payroll',
    },
    {
        id: 3,
        icon: <FinancialAdvisory className="h-6 w-6 fill-accent" />,
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
    {
        id: 4,
        icon: <BusinessAdvisory className="h-6 w-6 fill-accent" />,
        title: 'Business Advisory',
        description:
            'Strategic business consulting to help you make informed decisions and drive sustainable growth.',
        features: [
            'Strategic planning',
            'Performance analysis',
            'Growth consulting',
        ],
        href: '/services/business-advisory',
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
                'group relative rounded-2xl bg-secondary p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:p-8',
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

export default function ServicesSection() {
    return (
        <section
            className={cn(
                'container mx-auto flex h-full w-full flex-col items-center justify-center gap-8 px-5 py-12 sm:gap-10 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-3 text-center sm:gap-4">
                <h2 className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                    Our Expert Accounting and{' '}
                    <span className="text-accent">Outsourcing Services</span>
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                    Tailored accounting solutions crafted to optimize your
                    business operations with precision and expertise.
                </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8">
                {services.map((service) => (
                    <ServicesCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        href={service.href}
                        icon={service.icon}
                    />
                ))}
            </div>

            {/* Enhanced CTA Section */}
            <div className="flex flex-col items-center gap-5 pt-4 text-center sm:gap-6">
                <p className="text-base text-gray-700 sm:text-lg lg:text-xl">
                    Ready to transform your business finances?
                </p>
                <Link
                    href="/services"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl active:scale-95 sm:px-10 sm:text-lg"
                >
                    Explore All Services
                </Link>
            </div>
        </section>
    );
}
