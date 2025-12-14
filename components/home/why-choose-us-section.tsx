'use client';

import React from 'react';

import cn from '@/utils/cn';

const benefits = [
    {
        number: '01',
        title: 'Lower Operating Costs',
        description:
            'Reduce fixed overhead with a dedicated offshore team sized to your needs.',
    },
    {
        number: '02',
        title: 'Qualified Team',
        description:
            'CPAs and finance professionals with deep industry experience, assigned to your account.',
    },
    {
        number: '03',
        title: 'More Time for Operations',
        description:
            'Offload daily financial tasks so your team can focus on revenue-generating work.',
    },
    {
        number: '04',
        title: 'Secure Infrastructure',
        description:
            'End-to-end encryption and strict access controls protect your financial data.',
    },
];

import FadeIn from '@/components/ui/fade-in';

function WhyChooseUsCard({
    number,
    title,
    description,
    className,
}: Readonly<{
    number: string;
    title: string;
    description: string;
    className?: string;
}>) {
    return (
        <div
            className={cn(
                'group flex h-full flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-sm sm:p-8',
                className,
            )}
        >
            <span className="text-sm font-medium text-accent/70">{number}</span>
            <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-lg font-semibold text-primary sm:text-xl">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function WhyChooseUsSection() {
    return (
        <section className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
            <div className="container mx-auto relative z-20 flex w-full flex-col gap-14 px-5 sm:gap-16 sm:px-8 md:px-12 lg:px-16">
                {/* Heading */}
                <FadeIn className="flex w-full flex-col items-center justify-center gap-4 text-center">
                    <h2 className="text-[1.75rem] leading-tight font-bold tracking-[-0.02em] text-primary sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                        Why Businesses Work With Us
                    </h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                        We handle the work so you can focus on running your business.
                    </p>
                </FadeIn>

                {/* Grid */}
                <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
                    {benefits.map((benefit, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.08}
                            className="h-full"
                        >
                            <WhyChooseUsCard
                                number={benefit.number}
                                title={benefit.title}
                                description={benefit.description}
                                className="h-full"
                            />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

