'use client';

import React from 'react';
import FadeIn from '@/components/ui/fade-in';
import { Check } from 'lucide-react';
import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

interface WhoIsThisForSectionProps {
    audience: string[];
    title?: string;
    description?: string;
}

export default function WhoIsThisForSection({
    audience,
    title = 'Who Is This For?',
    description = 'Our services are perfect for businesses that want to grow.',
}: WhoIsThisForSectionProps) {
    return (
        <section className="w-full bg-gray-50 py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <FadeIn>
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-gray-600">
                            {description}
                        </p>
                        <div className="mt-8">
                            <ScheduleMyCallButton
                                className="bg-accent text-white hover:bg-accent/90"
                                showSubtext={false}
                            />
                        </div>
                    </FadeIn>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {audience.map((item, index) => (
                            <FadeIn 
                                key={index} 
                                delay={index * 0.1}
                                className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                                    <Check className="h-3.5 w-3.5 text-accent" />
                                </div>
                                <span className="text-base font-medium text-gray-700">
                                    {item}
                                </span>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
