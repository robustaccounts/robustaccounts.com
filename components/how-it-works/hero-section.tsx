'use client';


import React from 'react';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';
import FadeIn from '@/components/ui/fade-in';

export function HeroSection() {
    return (
        <section className="hero-section relative min-h-screen w-full bg-white">
            {/* Content Container */}
            <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-10 px-4 py-24 sm:gap-14 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {/* Main Content */}
                <FadeIn className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
                    <h1 className="text-center text-4xl leading-[1.1] font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                        Simple Process,{' '}
                        <span className="text-primary">Exceptional Results</span>
                    </h1>
                    <p className="max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
                        Our streamlined 3-step process ensures smooth transition
                        and timely management of your accounting needs.
                        Simplicity is our best policy.
                    </p>
                </FadeIn>

                {/* Trust Indicators */}
                <FadeIn delay={0.2} className="w-full max-w-xl">
                    <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            '100+ Clients',
                            'Certified Experts',
                            '99% Satisfaction',
                            'Secure & Compliant',
                        ].map((indicator, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-2 text-sm text-gray-600"
                            >
                                {/* You can replace this with a real icon if desired */}
                                <span className="inline-block h-4 w-4 rounded-full bg-primary" />
                                <span>{indicator}</span>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <ScheduleMyCallButton />
                </FadeIn>
            </div>
        </section>
    );
}
