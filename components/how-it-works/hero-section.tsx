'use client';

import React from 'react';
import Image from 'next/image';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

export function HeroSection() {
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
            {/* Soft bottom gradient for polish */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Content Container */}
            <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {/* Main Content */}
                <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                        Simple Process,{' '}
                        <span className="text-accent">Exceptional Results</span>
                    </h1>
                    <p className="max-w-3xl text-center text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                        Our streamlined 3-step process ensures smooth transition
                        and timely management of your accounting needs.
                        Simplicity is our best policy.
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="mt-2 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        '100+ Clients',
                        'Certified Experts',
                        '99% Satisfaction',
                        'Secure & Compliant',
                    ].map((indicator, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-2 text-sm text-white"
                        >
                            {/* You can replace this with a real icon if desired */}
                            <span className="inline-block h-4 w-4 rounded-full bg-accent" />
                            <span>{indicator}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <ScheduleMyCallButton />
                </div>
            </div>
        </section>
    );
}
