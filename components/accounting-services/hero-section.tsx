import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

const trustIndicators = [
    'U.S.-Based Experts',
    'Highly Vetted Team',
    'Scalable Solutions',
    'AI-Empowered',
];

export default function AccountingServicesHeroSection() {
    return (
        <section
            className={cn(
                'hero-section relative flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            {/* Main Content */}
            <div className="flex flex-col justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4xl">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    Complete{' '}
                    <span className="text-accent">Financial Solutions</span>
                </h1>
                <p className="text-center text-base leading-relaxed text-primary/80 sm:text-lg lg:text-xl">
                    The expertise your business deserves. The only accounting
                    solution that scales with you. Robust Accounts offers the
                    financial support you need <em>when you need it</em>.
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
        </section>
    );
}
