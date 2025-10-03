'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import { Check } from '@/ui/icons/google-icons';

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

function WhyChooseUsCard({
    title,
    description,
}: Readonly<{
    title: string;
    description: string;
}>) {
    return (
        <div
            className={cn(
                'group flex items-start gap-4 rounded-xl p-4 transition-all hover:bg-secondary/30 sm:gap-5 sm:p-5',
            )}
        >
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 shadow-sm transition-all group-hover:scale-110 group-hover:bg-accent/20 sm:h-14 sm:w-14">
                    <Check className="h-6 w-6 fill-accent sm:h-7 sm:w-7" />
                </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-lg font-bold text-primary sm:text-xl lg:text-2xl">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function WhyChooseUsSection() {
    // Section ref for scroll tracking
    const sectionRef = useRef<HTMLDivElement>(null);
    // Framer Motion scroll progress for this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Parallax transforms (tweak values for desired effect)
    const overlayY = useTransform(scrollYProgress, [0, 1], ['0px', '50px']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-30px']);

    return (
        <section
            ref={sectionRef}
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20',
            )}
        >
            {/* Parallax Overlay for subtle effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 will-change-transform"
                style={{ y: overlayY }}
                aria-hidden="true"
            />
            <motion.div
                className="relative z-20 flex w-full max-w-6xl flex-col gap-12 will-change-transform sm:gap-14 lg:flex-row lg:items-center lg:justify-center lg:gap-16"
                style={{ y: contentY }}
            >
                {/* Left: Heading and Description */}
                <div className="flex w-full flex-col items-center justify-center gap-4 text-center sm:gap-5 lg:w-1/2 lg:items-start lg:text-left">
                    <h2 className="text-2xl leading-tight font-bold text-primary sm:text-3xl lg:text-4xl">
                        Smarter Accounting.{' '}
                        <span className="text-accent">Better Results</span>.
                    </h2>
                    <p className="max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                        We simplify bookkeeping with smart, expert
                        solutions—saving you time, ensuring accuracy, and
                        letting you focus on growing your business.
                    </p>
                </div>
                {/* Right: Benefits List */}
                <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 lg:w-1/2">
                    {benefits.map((benefit, index) => (
                        <WhyChooseUsCard
                            key={index}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
