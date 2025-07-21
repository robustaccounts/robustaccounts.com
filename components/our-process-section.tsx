import React from 'react';

import Link from '@/ui/link';

import cn from '@/utils/cn';

const processSteps = [
    {
        title: 'Consultation',
        description:
            'Free analysis of your current accounting needs and business goals.',
    },
    {
        title: 'Proposal',
        description:
            'Receive a custom service package tailored to your requirements.',
    },
    {
        title: 'Onboarding',
        description:
            'Seamless transition of your financial data and processes.',
    },
    {
        title: 'Ongoing Support',
        description:
            '24/7 support with a dedicated account manager for your business.',
    },
];

function ProcessStepCard({
    title,
    description,
    step,
}: {
    title: string;
    description: string;
    step: number;
}) {
    return (
        <div className={cn('flex items-start gap-4')}>
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-secondary/80">
                    <span className="text-lg font-bold text-accent">
                        {step < 10 ? `0${step}` : step}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
                <p className="text-sm leading-relaxed sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function OurProcessSection() {
    return (
        <section
            className={cn(
                'container mx-auto flex h-full w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 lg:py-24 xl:min-h-screen xl:py-0',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Our Proven Process
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Simple, transparent steps to get your accounting outsourced.
                </p>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                {processSteps.map((step, idx) => (
                    <ProcessStepCard
                        key={idx}
                        title={step.title}
                        description={step.description}
                        step={idx + 1}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <p className="text-base sm:text-lg">
                    Ready to transform your business finances?
                </p>
                <Link
                    href="/contact"
                    className="group flex transform cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none sm:px-8 sm:py-4 sm:text-lg"
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
}
