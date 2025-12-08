
import React from 'react';

import { Check } from 'lucide-react';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';
import FadeIn from '@/components/ui/fade-in';

const trustIndicators = [
    'Complete Service Portfolio',
    'Scalable Solutions',
    'Expert Team Support',
    'Proven Track Record',
];

export default function HeroSection() {
    return (
        <section className="hero-section relative min-h-screen w-full bg-white">
            {/* Content Container */}
            <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-10 px-4 py-24 sm:gap-14 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {/* Main Content */}
                <FadeIn className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center">
                    <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                        Complete Accounting Solutions for{' '}
                        <span className="text-accent">Your Business</span>
                    </h1>
                    <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
                        From basic bookkeeping to strategic financial advisory,
                        we provide comprehensive accounting services tailored to
                        your business needs. Save time, reduce costs, and ensure
                        compliance.
                    </p>
                </FadeIn>

                {/* Trust Indicators */}
                <FadeIn delay={0.2} className="w-full max-w-4xl">
                    <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {trustIndicators.map((indicator, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-2"
                            >
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">
                                    {indicator}
                                </span>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                {/* CTA Buttons */}
                <FadeIn delay={0.4}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <ScheduleMyCallButton
                            className="w-xs"
                            size="lg"
                            showSubtext={false}
                        />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
