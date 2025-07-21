import React from 'react';

import cn from '@/utils/cn';

const features = [
    {
        title: 'Strategic Budget Planning',
        description:
            'Develop comprehensive budgets aligned with your business goals and growth strategies.',
    },
    {
        title: 'Cash Flow Forecasting',
        description:
            'Predictive cash flow analysis to optimize working capital and prevent shortfalls.',
    },
    {
        title: 'Financial Performance Analysis',
        description:
            'Deep dive into your financial metrics to identify opportunities and risks.',
    },
    {
        title: 'Growth Strategy Consulting',
        description:
            'Strategic guidance on expansion, investments, and scaling your business.',
    },
    {
        title: 'Investment Planning',
        description:
            'Professional advice on business investments and capital allocation strategies.',
    },
    {
        title: 'Risk Management',
        description:
            'Identify and mitigate financial risks to protect your business assets.',
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

export default function FinancialAdvisoryFeaturesSection() {
    return (
        <section className={cn(
            'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
        )}>
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Comprehensive Financial Advisory
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Strategic insights and expert guidance to drive your business forward
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