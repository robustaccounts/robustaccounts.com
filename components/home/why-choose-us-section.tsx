'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import { Check } from 'lucide-react';

import cn from '@/utils/cn';

const benefits = [
    {
        title: 'Cost-Effective Solutions',
        description:
            'Reduce overhead costs by up to 60% with our scalable outsourcing services, tailored to your budget and business size.',
    },
    {
        title: 'Expert Team',
        description:
            'Access a global team of certified public accountants and financial experts with 10+ years of experience.',
    },
    {
        title: 'Time Savings',
        description:
            'Free up 40+ hours monthly to focus on core business activities while we handle your complete financial operations.',
    },
    {
        title: 'Advanced Security',
        description:
            'Bank-grade security with end-to-end encryption, ensuring your financial data is protected at all times.',
    },
];

import FadeIn from '@/components/ui/fade-in';

function WhyChooseUsCard({
    title,
    description,
    className,
}: Readonly<{
    title: string;
    description: string;
    className?: string;
}>) {
    return (
        <div
            className={cn(
                'group flex h-full items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:gap-5 sm:p-8',
                className,
            )}
        >
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-white sm:h-14 sm:w-14">
                    <Check className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-lg font-bold text-primary sm:text-xl lg:text-2xl">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function WhyChooseUsSection() {
    return (
        <section className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
            <div className="container mx-auto relative z-20 flex w-full flex-col gap-16 px-5 sm:px-8 md:px-12 lg:px-16">
                {/* Heading */}
                <FadeIn className="flex w-full flex-col items-center justify-center gap-4 text-center lg:items-start lg:text-left">
                    <h2 className="text-center text-3xl leading-tight font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl lg:text-left">
                        Smarter Accounting.{' '}
                        <span className="text-accent">Better Results</span>.
                    </h2>
                    <p className="max-w-3xl text-center text-sm leading-relaxed text-gray-600 sm:text-base lg:text-left lg:text-lg">
                        We simplify bookkeeping with smart, expert
                        solutions—saving you time, ensuring accuracy, and
                        letting you focus on growing your business.
                    </p>
                </FadeIn>

                {/* Bento Grid */}
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                    {benefits.map((benefit, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.1}
                            className={cn(
                                'h-full',
                                index === 0 || index === 3
                                    ? 'md:col-span-2'
                                    : 'md:col-span-1',
                            )}
                        >
                            <WhyChooseUsCard
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
