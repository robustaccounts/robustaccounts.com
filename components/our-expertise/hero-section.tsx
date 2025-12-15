'use client';

import React from 'react';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';
import FadeIn from '@/components/ui/fade-in';

export default function HeroSection() {
    return (
        <section className="hero-section relative min-h-screen w-full bg-white">
            {/* Content Container */}
            <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-10 px-4 py-24 sm:gap-14 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {/* Main Content */}
                <FadeIn className="flex flex-col justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4/5">
                    <h1 className="text-center text-4xl leading-[1.1] font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                        Deep Industry{' '}
                        <span className="text-primary">Knowledge</span>,{' '}
                        <span className="text-primary">Proven Results</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
                        Our team combines industry-specific expertise with
                        cutting-edge technology to deliver exceptional
                        accounting services across diverse business sectors.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
                        <ScheduleMyCallButton
                            className="w-xs"
                            size="lg"
                            showSubtext={false}
                        />
                    </div>
                </FadeIn>

                {/* Stats */}
                <FadeIn delay={0.2} className="w-full">
                    <div className="flex flex-col items-center gap-4 py-10">
                        <div className="grid w-full grid-cols-2 gap-8 text-center sm:grid-cols-4">
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-2xl font-bold text-primary sm:text-3xl">
                                    8+
                                </div>
                                <div className="text-sm text-gray-600 sm:text-base">
                                    Industries Served
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-2xl font-bold text-primary sm:text-3xl">
                                    50+
                                </div>
                                <div className="text-sm text-gray-600 sm:text-base">
                                    Certified Professionals
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-2xl font-bold text-primary sm:text-3xl">
                                    15+
                                </div>
                                <div className="text-sm text-gray-600 sm:text-base">
                                    Years Experience
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-2xl font-bold text-primary sm:text-3xl">
                                    100%
                                </div>
                                <div className="text-sm text-gray-600 sm:text-base">
                                    Compliance Rate
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
