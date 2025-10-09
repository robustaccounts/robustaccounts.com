import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

const trustIndicators = [
    'U.S.-Based Team',
    'Highly Vetted',
    'Ministry-Minded',
    'Customizable',
];

export default function NonprofitHeroSection() {
    return (
        <section
            className={cn(
                'hero-section relative flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            {/* Main Content */}
            <div className="flex flex-col justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4xl">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    Focus on Your <span className="text-accent">Mission</span>.{' '}
                    <span className="text-accent">We'll Handle</span> the Rest.
                </h1>
                <p className="text-center text-base leading-relaxed text-primary/80 sm:text-lg lg:text-xl">
                    Take care of your people and your mission. We'll take care
                    of your books. Expert accounting services designed
                    specifically for churches, ministries, and non-profit
                    organizations.
                </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
                {trustIndicators.map((indicator, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center gap-2"
                    >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                            <Check className="h-3 w-3 fill-white" />
                        </div>
                        <span className="text-sm font-medium text-primary">
                            {indicator}
                        </span>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <ScheduleMyCallButton
                    className="w-xs"
                    size="lg"
                    showSubtext={false}
                />
            </div>

            {/* Subtitle */}
            <p className="text-center text-sm text-gray-600 sm:text-base">
                We search the entire country to find the right ministry-minded
                professionals for your organization
            </p>
        </section>
    );
}
