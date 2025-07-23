'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import { ArrowForward, Check } from '@/ui/icons/google-icons';
import Link from '@/ui/link';

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
        <div className={cn('flex items-start gap-4')}>
            <div className="mt-1 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-secondary/80">
                    <Check className="h-6 w-6 fill-accent" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-accent sm:text-2xl">
                    {title}
                </h3>
                <p className="text-base leading-relaxed text-gray-800 sm:text-lg">
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
    const bgY = useTransform(scrollYProgress, [0, 1], ['0px', '80px']);
    const overlayY = useTransform(scrollYProgress, [0, 1], ['0px', '50px']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-30px']);

    return (
        <section
            ref={sectionRef}
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-20 sm:px-8 md:px-16 lg:px-24 xl:py-32',
            )}
        >
            {/* Removed Parallax Background Image */}
            {/* Parallax Overlay for better text contrast */}
            {/* Optionally, you can remove the overlay as well, but keeping for subtle effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 will-change-transform"
                style={{ y: overlayY }}
                aria-hidden="true"
            />
            <motion.div
                className="relative z-20 flex w-full max-w-6xl flex-col gap-16 will-change-transform lg:flex-row lg:items-center lg:justify-center"
                style={{ y: contentY }}
            >
                {/* Left: Heading and Description */}
                <div className="flex w-full flex-col items-center justify-center gap-8 text-center sm:gap-10 lg:w-1/2 lg:items-start lg:text-left">
                    <h2 className="text-3xl font-bold text-accent sm:text-4xl lg:text-5xl">
                        Smarter Accounting. Better Results.
                    </h2>
                    <p className="max-w-3xl text-lg text-gray-700 sm:text-xl">
                        We simplify bookkeeping with smart, expert
                        solutions—saving you time, ensuring accuracy, and
                        letting you focus on growing your business.
                    </p>
                </div>
                {/* Right: Benefits List */}
                <div className="grid w-full grid-cols-1 gap-10 lg:w-1/2 lg:gap-12">
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
