import React from 'react';

import { ArrowForward } from '@/ui/icons/google-icons';

import GetStartedButton from '@/components/common/get-started-button';

const steps = [
    {
        step: '01',
        title: 'Fill Out Form',
        description: 'Tell us about your business and accounting needs',
    },
    {
        step: '02',
        title: 'Free Consultation',
        description: 'We analyze your requirements and discuss solutions',
    },
    {
        step: '03',
        title: 'Custom Proposal',
        description: 'Receive a tailored service package and pricing',
    },
    {
        step: '04',
        title: 'Get Started',
        description: 'Begin your accounting transformation journey',
    },
];

export default function ProcessStepsSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-14 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                            How It Works
                        </h2>
                        <p className="text-lg text-gray-600">
                            Simple steps to get your accounting outsourced
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="relative flex flex-col gap-12 md:flex-row md:justify-between">
                        {steps.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center text-center md:w-1/4"
                            >
                                {/* Step Circle */}
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                                    {item.step}
                                </div>
                                {/* Step Title */}
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
                                    {item.title}
                                </h3>
                                {/* Step Description */}
                                <p className="px-2 text-base text-gray-600 md:text-sm">
                                    {item.description}
                                </p>
                                {/* Arrow (desktop only, except last step) */}
                                {index < steps.length - 1 && (
                                    <div
                                        className="absolute top-1/2 right-0 hidden translate-x-1/2 -translate-y-1/2 md:block"
                                        style={{ zIndex: 1 }}
                                    >
                                        <ArrowForward className="h-7 w-7 text-accent" />
                                    </div>
                                )}
                                {/* Arrow (mobile, below step, except last) */}
                                {index < steps.length - 1 && (
                                    <div className="mt-6 mb-2 block md:hidden">
                                        <ArrowForward className="mx-auto h-6 w-6 rotate-90 text-accent" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-14 flex justify-center">
                        <GetStartedButton size="lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}
