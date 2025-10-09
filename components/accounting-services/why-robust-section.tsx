import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

const keyQuestion = {
    question:
        'My company finances are too complex. How will you build the right solution for me?',
    answer: `At Robust Accounts, we create scalable accounting solutions built to grow with you — whether you're leading an ecommerce brand, real estate firm, small business, or nonprofit.

We've matched hundreds of leaders across 50+ industries with the right support. Complex challenges? That's our specialty.

**You're not too complicated. You're exactly why we built this.**`,
};

const comparisonPoints = [
    {
        feature: 'Quality',
        robust: 'We only accept the top experts with proven track records.',
        others: 'Offshore or entry-level task-doers',
    },
    {
        feature: 'Support',
        robust: 'Managed service with high-touch support from a dedicated, U.S.-based team.',
        others: 'Rotating freelancers or short-term contractors',
    },
    {
        feature: 'AI Readiness',
        robust: 'Financial Experts with AI, automation, and modern tech.',
        others: 'Inconsistent or outdated tech skills that put your data at risk.',
    },
    {
        feature: 'Scalability',
        robust: 'Fractional support that grows with you.',
        others: 'One-size-fits-all approach',
    },
];

const processSteps = [
    {
        step: 1,
        title: 'We get to know your needs.',
        description:
            'Not just your numbers — your people, your systems, your goals.',
    },
    {
        step: 2,
        title: 'We identify your solution.',
        description:
            'Bookkeeper? Fractional CFO? Just tax services? We support you.',
    },
    {
        step: 3,
        title: 'You meet your team.',
        description:
            'Experienced U.S.-based accountants with the expertise you deserve.',
    },
    {
        step: 4,
        title: 'We get you up and running.',
        description:
            'Tools. Systems. Data integration. Nothing falls through the cracks.',
    },
    {
        step: 5,
        title: 'We stay close and agile.',
        description:
            'Ongoing support. Proactive adjustments. Responsive to your needs.',
    },
];

export default function WhyRobustSection() {
    return (
        <>
            {/* Key Question Section */}
            <section
                className={cn(
                    'flex w-full flex-col items-center justify-center gap-12 bg-white px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
                )}
            >
                <div className="w-full max-w-4xl rounded-2xl bg-accent/5 p-8 md:p-12">
                    <h2 className="mb-6 text-2xl font-bold text-primary sm:text-3xl">
                        {keyQuestion.question}
                    </h2>
                    <div className="space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                        {keyQuestion.answer.split('\n\n').map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section
                className={cn(
                    'flex w-full flex-col items-center justify-center gap-12 bg-secondary px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
                )}
            >
                <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        The <span className="text-accent">Robust Accounts</span>{' '}
                        Difference
                    </h2>
                    <p className="max-w-3xl text-base leading-relaxed sm:text-lg">
                        We're not just another outsourcing firm. We're your
                        strategic financial partner.
                    </p>
                </div>

                {/* Comparison Grid - Mobile Friendly */}
                <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
                    {/* Header */}
                    <div className="grid grid-cols-3 gap-2 border-b border-gray-200 bg-primary p-4 text-white sm:gap-4 sm:p-6">
                        <div className="text-xs font-semibold sm:text-sm md:text-base">
                            Feature
                        </div>
                        <div className="text-xs font-semibold sm:text-sm md:text-base">
                            Robust Accounts
                        </div>
                        <div className="text-xs font-semibold sm:text-sm md:text-base">
                            Others
                        </div>
                    </div>

                    {/* Rows */}
                    {comparisonPoints.map((point, index) => (
                        <div
                            key={index}
                            className={cn(
                                'grid grid-cols-3 gap-2 p-4 sm:gap-4 sm:p-6',
                                index % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                            )}
                        >
                            <div className="text-xs font-semibold text-primary sm:text-sm md:text-base">
                                {point.feature}
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-700 sm:text-sm">
                                <Check className="mt-0.5 h-3 w-3 flex-shrink-0 fill-accent sm:h-4 sm:w-4" />
                                <span className="leading-relaxed">
                                    {point.robust}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 sm:text-sm">
                                ✕ {point.others}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How We Customize Your Solution */}
            <section
                className={cn(
                    'flex w-full flex-col items-center justify-center gap-12 bg-white px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
                )}
            >
                <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Here's How We Customize{' '}
                        <span className="text-accent">
                            Your Perfect Solution
                        </span>
                    </h2>
                </div>

                <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {processSteps.map((step) => (
                        <div
                            key={step.step}
                            className="group relative rounded-2xl bg-secondary p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                        >
                            {/* Step Number */}
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl font-bold text-white shadow-sm transition-transform group-hover:scale-110">
                                {step.step}
                            </div>

                            {/* Content */}
                            <h3 className="mb-3 text-lg font-bold text-primary">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-700">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
