'use client';

import React from 'react';
import FadeIn from '@/components/ui/fade-in';
import { ArrowRight } from 'lucide-react';

interface Step {
    title: string;
    description: string;
}

interface ProcessSectionProps {
    steps: Step[];
    title?: string;
    description?: string;
}

export default function ProcessSection({
    steps,
    title = 'How It Works',
    description = 'Our simple streamlined process.',
}: ProcessSectionProps) {
    return (
        <section className="w-full bg-white py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        {title}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">{description}</p>
                </FadeIn>

                <div className="relative mt-12 grid gap-8 md:grid-cols-3">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-12 left-0 hidden h-0.5 w-full bg-gray-100 lg:block" />

                    {steps.map((step, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.2}
                            className="relative flex h-full flex-col"
                        >
                            {/* Card Container */}
                            <div className="relative flex h-full flex-col rounded-2xl bg-secondary/30 p-8 transition-all duration-300 hover:bg-secondary/50">
                                {/* Number Badge */}
                                <div className="absolute -top-4 left-8 flex h-8 items-center justify-center rounded-full bg-accent px-4 text-sm font-bold text-white shadow-sm">
                                    Step {index + 1}
                                </div>

                                <div className="mt-4 flex h-full flex-col gap-4">
                                    <h3 className="text-2xl font-bold text-primary">
                                        {step.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Mobile Arrow */}
                            {index < steps.length - 1 && (
                                <div className="my-4 flex justify-center text-gray-300 lg:hidden">
                                     <ArrowRight className="h-6 w-6 rotate-90" />
                                </div>
                            )}
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
