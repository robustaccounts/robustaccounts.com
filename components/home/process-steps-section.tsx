'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import { ArrowRight } from 'lucide-react';

import cn from '@/utils/cn';

const steps = [
    {
        step: '01',
        title: 'Fill Out Form',
        description: 'Tell us about your business and financial operations',
    },
    {
        step: '02',
        title: 'Discovery Call',
        description: 'We learn about your operations and financial needs',
    },
    {
        step: '03',
        title: 'Custom Proposal',
        description: 'Receive a tailored service package and pricing',
    },
    {
        step: '04',
        title: 'Go Live',
        description: 'Your dedicated team takes over operations',
    },
];

export default function ProcessStepsSection() {
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
                'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-50 px-5 py-24 sm:px-8 sm:py-32 md:px-12 lg:px-16',
            )}
        >
            {/* Parallax Background Removed for Clean Style */}

            <motion.div
                className="relative z-20 flex w-full max-w-6xl flex-col gap-10 will-change-transform sm:gap-12 md:gap-16"
                style={{ y: contentY }}
            >
                <div className="text-center">
                    <h2 className="mb-3 text-[1.75rem] leading-tight font-bold tracking-[-0.02em] text-primary sm:mb-4 sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                        How We Start
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                        A clear path to getting your finance function running.
                    </p>
                </div>
                {/* Desktop Steps Grid - Hidden on mobile */}
                <div className="relative mx-auto hidden max-w-4xl grid-cols-2 grid-rows-2 gap-x-16 gap-y-16 md:grid md:gap-x-24 md:gap-y-20 lg:max-w-5xl">
                    {/* Step 1 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                            {steps[0].step}
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-primary">
                            {steps[0].title}
                        </h3>
                        <p className="text-lg text-gray-600">
                            {steps[0].description}
                        </p>
                        {/* Arrow to Step 2 (right) */}
                        <div className="absolute top-1/2 right-[-44px] z-10">
                            <ArrowRight className="h-10 w-10 text-accent/20" />
                        </div>
                    </div>
                    {/* Step 2 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                            {steps[1].step}
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-primary">
                            {steps[1].title}
                        </h3>
                        <p className="text-lg text-gray-600">
                            {steps[1].description}
                        </p>
                        {/* Arrow to Step 3 (down) */}
                        <div className="absolute bottom-[-44px] left-1/2 z-10 -translate-x-1/2">
                            <ArrowRight className="h-10 w-10 rotate-90 text-accent/20" />
                        </div>
                    </div>
                    {/* Step 4 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                            {steps[3].step}
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-primary">
                            {steps[3].title}
                        </h3>
                        <p className="text-lg text-gray-600">
                            {steps[3].description}
                        </p>
                    </div>
                    {/* Step 3 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                            {steps[2].step}
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-primary">
                            {steps[2].title}
                        </h3>
                        <p className="text-lg text-gray-600">
                            {steps[2].description}
                        </p>
                        {/* Arrow to Step 4 (left) */}
                        <div className="absolute top-1/2 left-[-44px] z-10 -translate-y-1/2">
                            <ArrowRight className="h-10 w-10 rotate-180 text-accent/20" />
                        </div>
                    </div>
                </div>
                {/* Mobile Steps - Improved Design */}
                <div className="md:hidden">
                    <div className="relative flex flex-col gap-6 sm:gap-8">
                        {steps.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center text-center"
                            >
                                {/* Step Circle */}
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white shadow-xl ring-4 ring-accent/20 sm:h-20 sm:w-20 sm:text-3xl">
                                    {item.step}
                                </div>
                                {/* Step Content */}
                                <div className="max-w-sm px-4">
                                    <h3 className="mb-2 text-xl font-bold text-primary sm:text-2xl">
                                        {item.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                                        {item.description}
                                    </p>
                                </div>
                                {/* Arrow (mobile, below step, except last) */}
                                {index < steps.length - 1 && (
                                    <div className="mt-6 block sm:mt-8">
                                        <div className="rounded-full bg-accent/20 p-2">
                                            <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-accent sm:h-8 sm:w-8" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
