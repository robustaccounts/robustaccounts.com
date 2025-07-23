import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

const stats = [
    { number: '500+', label: 'Satisfied Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '99.9%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Support Available' },
];

const trustIndicators = [
    'Global Expertise',
    'Proven Track Record',
    'Dedicated Support',
    'Trusted Partner',
];

export default function HeroSection() {
    return (
        <section
            className={cn(
                'mt-24 flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            {/* Main Content */}
            <div className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                    Your Trusted{' '}
                    <span className="text-accent">Financial Partner</span> for
                    Global Success
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                    With years of expertise in international accounting and
                    taxation, we serve clients across the USA, UK, Canada,
                    Australia, and India. Our mission is to provide world-class
                    financial services that help businesses thrive globally.
                </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {trustIndicators.map((indicator, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center gap-2"
                    >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                            <Check className="h-3 w-3 fill-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                            {indicator}
                        </span>
                    </div>
                ))}
            </div>

            {/* Stats */}
            <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
                            {stat.number}
                        </div>
                        <div className="text-sm text-gray-600 sm:text-base">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <ScheduleMyCallButton showSubtext={false} />
            </div>
        </section>
    );
}
