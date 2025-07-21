import React from 'react';

import GetStartedButton from '@/components/common/get-started-button';

import cn from '@/utils/cn';

const benefits = [
    {
        title: 'Seamless Transition',
        description:
            'Our proven process ensures a smooth transition from your current setup to our optimized system.',
    },
    {
        title: 'Dedicated Team',
        description:
            'You get a dedicated team of accounting professionals who understand your business inside out.',
    },
    {
        title: 'Transparent Process',
        description:
            'Every step is clearly communicated with regular updates and transparent reporting.',
    },
    {
        title: 'Scalable Solutions',
        description:
            'Our process adapts to your business growth and changing requirements.',
    },
];

export function BenefitsSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-4 text-center sm:gap-6">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Why Our Process Works
                </h2>
                <p className="text-base lg:text-lg">
                    Proven methodology that delivers consistent results
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {benefits.map((benefit, index) => (
                    <div
                        key={index}
                        className="rounded-xl bg-secondary p-6 transition-all duration-300"
                    >
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600">
                                {benefit.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-gray-600">
                    Join hundreds of businesses who have streamlined their
                    accounting operations with our proven process.
                </p>
                <GetStartedButton size="lg" />
            </div>
        </section>
    );
}
