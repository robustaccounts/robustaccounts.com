import React from 'react';

import cn from '@/utils/cn';

const features = [
    {
        title: 'Employee Payment Processing',
        description:
            'Automated payroll processing with direct deposit and check options for all employees.',
    },
    {
        title: 'Tax Withholding & Filings',
        description:
            'Accurate calculation and filing of federal, state, and local payroll taxes.',
    },
    {
        title: 'Benefits Administration',
        description:
            'Manage health insurance, retirement plans, and other employee benefits.',
    },
    {
        title: 'Time Tracking Integration',
        description:
            'Seamless integration with time tracking systems for accurate payroll.',
    },
    {
        title: 'Compliance Reporting',
        description:
            'Generate required reports for government agencies and compliance.',
    },
    {
        title: 'Year-End Processing',
        description:
            'W-2 and 1099 preparation and distribution to employees and contractors.',
    },
];

function FeatureCard({
    title,
    description,
}: Readonly<{
    title: string;
    description: string;
}>) {
    return (
        <div className="group cursor-pointer rounded-2xl bg-secondary p-6 transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg sm:p-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 group-hover:text-white sm:text-xl">
                {title}
            </h3>
            <p className="text-sm text-gray-600 group-hover:text-white sm:text-base">
                {description}
            </p>
        </div>
    );
}

export default function PayrollFeaturesSection() {
    return (
        <section className={cn(
            'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
        )}>
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Complete Payroll Solutions
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    End-to-end payroll management for businesses of all sizes
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </section>
    );
} 