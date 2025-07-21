import React from 'react';

import cn from '@/utils/cn';

const features = [
    {
        title: 'Strategic Business Consulting',
        description:
            'Comprehensive business strategy development and execution planning for sustainable growth.',
    },
    {
        title: 'Market Analysis & Research',
        description:
            'In-depth market research and competitive analysis to identify opportunities and risks.',
    },
    {
        title: 'Mergers & Acquisitions',
        description:
            'Expert guidance through M&A transactions, due diligence, and integration planning.',
    },
    {
        title: 'Business Valuation',
        description:
            'Professional business valuation services for investment, sale, or strategic planning.',
    },
    {
        title: 'Succession Planning',
        description:
            'Strategic succession planning to ensure smooth business transition and continuity.',
    },
    {
        title: 'Performance Optimization',
        description:
            'Operational improvements and efficiency optimization across all business functions.',
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

export default function BusinessAdvisoryFeaturesSection() {
    return (
        <section className={cn(
            'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
        )}>
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Comprehensive Business Advisory Services
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Strategic guidance and expert consulting for executive leadership
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