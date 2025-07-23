import React from 'react';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

export function HeroSection() {
    return (
        <section
            className={cn(
                'mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-12 px-4 pt-40 sm:gap-16 sm:px-6',
            )}
        >
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
                <h1 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                    Simple Process,{' '}
                    <span className="text-accent">Exceptional Results</span>
                </h1>
                <p className="max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                    Our streamlined 3-step process ensures smooth transition and
                    timely management of your accounting needs. Simplicity is
                    our best policy.
                </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                        <span className="inline-block h-4 w-4 rounded-full bg-accent" />
                        <span>{indicator}</span>
                    </div>
                ))}
            </div>

            <ScheduleMyCallButton />
        </section>
    );
}
