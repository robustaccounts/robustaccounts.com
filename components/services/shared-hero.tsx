'use client';

import React from 'react';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';
import FadeIn from '@/components/ui/fade-in';

interface ServiceHeroProps {
    title: string;
    subtitle: string;
    highlightedText?: string;
}

export default function ServiceHero({
    title,
    subtitle,
    highlightedText,
}: ServiceHeroProps) {
    return (
        <section className="service-hero relative min-h-screen w-full bg-white flex items-center justify-center">
            {/* Content Container */}
            <div className="relative z-20 flex w-full flex-col items-center justify-center gap-10 px-4 py-24 sm:gap-14 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {/* Main Content */}
                <FadeIn className="flex max-w-4xl flex-col items-center justify-center gap-6 text-center">
                    <h1 className="text-center text-4xl leading-[1.1] font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                        {title}{' '}
                        {highlightedText && (
                            <span className="text-accent">{highlightedText}</span>
                        )}
                    </h1>
                    <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
                        {subtitle}
                    </p>
                    
                    {/* CTA Button */}
                    <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6 pt-4">
                        <ScheduleMyCallButton size="lg" showSubtext={false} />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
