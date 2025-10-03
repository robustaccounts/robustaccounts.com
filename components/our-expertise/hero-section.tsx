'use client';

import Image from 'next/image';
import React from 'react';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

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
            <div
                className="absolute inset-0 z-10 bg-black/70"
                aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Content Container */}
            <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {/* Main Content */}
                <div className="flex flex-col justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4/5">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                        Deep Industry{' '}
                        <span className="text-accent">Knowledge</span>,{' '}
                        <span className="text-accent">Proven Results</span>
                    </h1>
                    <p className="text-center text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
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
                </div>

                {/* Stats */}
                <div className="flex flex-col items-center gap-4 py-10">
                    <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-accent sm:text-3xl">
                                8+
                            </div>
                            <div className="text-sm text-white/80 sm:text-base">
                                Industries Served
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-accent sm:text-3xl">
                                50+
                            </div>
                            <div className="text-sm text-white/80 sm:text-base">
                                Certified Professionals
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-accent sm:text-3xl">
                                15+
                            </div>
                            <div className="text-sm text-white/80 sm:text-base">
                                Years Experience
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-accent sm:text-3xl">
                                100%
                            </div>
                            <div className="text-sm text-white/80 sm:text-base">
                                Compliance Rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
