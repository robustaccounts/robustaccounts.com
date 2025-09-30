import React from 'react';

import cn from '@/utils/cn';

const timeline = [
    {
        phase: 'Initial Consultation',
        duration: '1-2 days',
        description: 'Understanding your needs and requirements',
    },
    {
        phase: 'Process Setup',
        duration: '3-5 days',
        description: 'Setting up systems and dedicated team',
    },
    {
        phase: 'Transition Period',
        duration: '1-2 weeks',
        description: 'Smooth handover of your accounting functions',
    },
    {
        phase: 'Ongoing Management',
        duration: 'Continuous',
        description: 'Regular accounting operations and support',
    },
];

export function TimelineSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-4 text-center sm:gap-6">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Implementation Timeline
                </h2>
                <p className="text-base lg:text-lg">
                    From initial consultation to full implementation
                </p>
                <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent sm:text-sm">
                    Typical go-live in under 3 weeks
                </div>
            </div>

            <div className="grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {timeline.map((item, index) => (
                    <div key={index} className="relative">
                        {/* Connection Line */}
                        {index < timeline.length - 1 && (
                            <div className="absolute top-8 left-full hidden h-0.5 w-full bg-gray-300 lg:block" />
                        )}

                        <div className="flex h-full flex-col gap-4 rounded-xl bg-secondary p-6 transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                                    {index + 1}
                                </div>
                                <div className="text-sm font-medium text-accent">
                                    {item.duration}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {item.phase}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
