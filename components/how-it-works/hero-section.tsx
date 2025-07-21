import React from 'react';

import cn from '@/utils/cn';

export function HeroSection() {
    return (
        <section
            className={cn(
                'container mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 pt-40 sm:gap-16 sm:px-6 md:px-12 lg:px-16',
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
            {/* <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {trustIndicators.map((indicator, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center gap-2 text-sm text-gray-600"
                    >
                        <Check className="h-4 w-4 flex-shrink-0 fill-accent" />
                        <span>{indicator}</span>
                    </div>
                ))}
            </div> */}

            {/* CTA Buttons */}
            {/* <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <GetStartedButton className="w-xs" size="lg" />
            </div> */}
        </section>
    );
}
