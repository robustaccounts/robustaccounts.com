import React from 'react';
import Image from 'next/image';

import { Check } from '@/ui/icons/google-icons';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

const trustIndicators = [
    'Complete Service Portfolio',
    'Scalable Solutions',
    'Expert Team Support',
    'Proven Track Record',
];

export default function HeroSection() {
    return (
        <section className="hero-section relative min-h-screen w-full">
            {/* Optimized Background Image */}
            <Image
                src="/assets/images/hero-section-bg-2.png"
                alt=""
                fill
                priority={false}
                className="object-cover"
                aria-hidden="true"
            />
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 z-10 bg-black/70" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Content Container */}
            <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {/* Main Content */}
                <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                        Complete Accounting Solutions for{' '}
                        <span className="text-accent">Your Business</span>
                    </h1>
                    <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                        From basic bookkeeping to strategic financial advisory,
                        we provide comprehensive accounting services tailored to
                        your business needs. Save time, reduce costs, and ensure
                        compliance.
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="mt-2 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {trustIndicators.map((indicator, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-2"
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                                <Check className="h-3 w-3 fill-white" />
                            </div>
                            <span className="text-sm font-medium text-white">
                                {indicator}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <ScheduleMyCallButton
                        className="w-xs"
                        size="lg"
                        showSubtext={false}
                    />
                </div>
            </div>
        </section>
    );
}
