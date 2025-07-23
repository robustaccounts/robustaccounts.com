'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

import { ArrowForward } from '@/ui/icons/google-icons';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

const steps = [
    {
        step: '01',
        title: 'Fill Out Form',
        description: 'Tell us about your business and accounting needs',
    },
    {
        step: '02',
        title: 'Free Consultation',
        description: 'We analyze your requirements and discuss solutions',
    },
    {
        step: '03',
        title: 'Custom Proposal',
        description: 'Receive a tailored service package and pricing',
    },
    {
        step: '04',
        title: 'Get Started',
        description: 'Begin your accounting transformation journey',
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
                'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-8 md:px-16 lg:px-24 xl:py-32',
            )}
        >
            {/* Parallax Background Image */}
            <motion.div
                className="absolute inset-0 z-0 bg-cover bg-center will-change-transform"
                style={{
                    backgroundImage:
                        "url('/assets/images/hero-section-bg.png')",
                    y: bgY,
                }}
                aria-hidden="true"
            />
            {/* Parallax Overlay for better text contrast */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 bg-black/70 will-change-transform"
                style={{ y: overlayY }}
                aria-hidden="true"
            />
            <motion.div
                className="relative z-20 flex w-full max-w-4xl flex-col gap-16 will-change-transform"
                style={{ y: contentY }}
            >
                <div className="mb-14 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-200">
                        Simple steps to get your accounting outsourced
                    </p>
                </div>
                {/* Steps Grid */}
                <div className="relative mx-auto grid max-w-2xl grid-cols-2 grid-rows-2 gap-x-16 gap-y-16 md:gap-x-24 md:gap-y-20">
                    {/* Step 1 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                            {steps[0].step}
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-white">
                            {steps[0].title}
                        </h3>
                        <p className="text-lg text-gray-200">
                            {steps[0].description}
                        </p>
                        {/* Arrow to Step 2 (right) */}
                        <div className="absolute top-1/2 right-[-44px] z-10 hidden md:block">
                            <ArrowForward className="h-10 w-10 text-accent" />
                        </div>
                    </div>
                    {/* Step 2 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                            {steps[1].step}
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-white">
                            {steps[1].title}
                        </h3>
                        <p className="text-lg text-gray-200">
                            {steps[1].description}
                        </p>
                        {/* Arrow to Step 3 (down) */}
                        <div className="absolute bottom-[-44px] left-1/2 z-10 hidden -translate-x-1/2 md:block">
                            <ArrowForward className="h-10 w-10 rotate-90 text-accent" />
                        </div>
                    </div>
                    {/* Step 4 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                            {steps[3].step}
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-white">
                            {steps[3].title}
                        </h3>
                        <p className="text-lg text-gray-200">
                            {steps[3].description}
                        </p>
                    </div>
                    {/* Step 3 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                            {steps[2].step}
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold text-white">
                            {steps[2].title}
                        </h3>
                        <p className="text-lg text-gray-200">
                            {steps[2].description}
                        </p>
                        {/* Arrow to Step 4 (left) */}
                        <div className="absolute top-1/2 left-[-44px] z-10 hidden -translate-y-1/2 md:block">
                            <ArrowForward className="h-10 w-10 rotate-180 text-accent" />
                        </div>
                    </div>
                </div>
                {/* Mobile Steps & CTA */}
                <div className="mt-16 md:hidden">
                    <div className="relative flex flex-col gap-12">
                        {steps.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center text-center"
                            >
                                {/* Step Circle */}
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                                    {item.step}
                                </div>
                                {/* Step Title */}
                                <h3 className="mb-2 text-lg font-semibold text-white">
                                    {item.title}
                                </h3>
                                {/* Step Description */}
                                <p className="px-2 text-base text-gray-200">
                                    {item.description}
                                </p>
                                {/* Arrow (mobile, below step, except last) */}
                                {index < steps.length - 1 && (
                                    <div className="mt-6 mb-2 block">
                                        <ArrowForward className="mx-auto h-6 w-6 rotate-90 text-accent" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* CTA Button */}
                    <div className="mt-14 flex justify-center">
                        <ScheduleMyCallButton size="lg" showSubtext={false} />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
