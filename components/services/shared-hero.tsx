'use client';

import React from 'react';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';
import FadeIn from '@/components/ui/fade-in';

import Image from 'next/image';

interface ServiceHeroProps {
    title: string;
    subtitle: string;
    highlightedText?: string;
    image?: string;
    imageAlt?: string;
}

export default function ServiceHero({
    title,
    subtitle,
    highlightedText,
    image,
    imageAlt,
}: ServiceHeroProps) {
    // Shared text content component
    const TextContent = () => (
        <FadeIn className={`flex flex-col gap-6 ${image ? 'items-start text-left' : 'items-center text-center max-w-4xl'}`}>
            <h1 className={`text-4xl leading-[1.1] font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl ${!image && 'text-center'}`}>
                {title}{' '}
                {highlightedText && (
                    <span className="text-accent">{highlightedText}</span>
                )}
            </h1>
            <p className={`text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl lg:text-2xl ${image ? 'max-w-xl' : 'max-w-3xl'}`}>
                {subtitle}
            </p>
            
            {/* CTA Button */}
            <div className={`flex flex-col gap-4 sm:flex-row sm:gap-6 pt-4 ${!image && 'justify-center'}`}>
                <ScheduleMyCallButton size="lg" showSubtext={false} />
            </div>
        </FadeIn>
    );

    return (
        <section className="service-hero relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden">
            {/* Content Container */}
            <div className="relative z-20 w-full px-4 py-24 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto">
                {image ? (
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Text Side */}
                        <div>
                            <TextContent />
                        </div>

                        {/* Image Side */}
                        <FadeIn delay={0.2} className="relative aspect-square w-full max-w-lg mx-auto lg:max-w-none lg:mx-0">
                            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-900/10">
                                <Image
                                    src={image}
                                    alt={imageAlt || 'Hero Image'}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {/* Optional overlay gradient for better contrast if needed, currently clean */}
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
                            </div>
                            
                            {/* Decorative element behind image */}
                            <div className="absolute -top-12 -right-12 -z-10 h-full w-full rounded-2xl bg-accent/5 blur-3xl" />
                            <div className="absolute -bottom-12 -left-12 -z-10 h-full w-full rounded-2xl bg-primary/5 blur-3xl" />
                        </FadeIn>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <TextContent />
                    </div>
                )}
            </div>
        </section>
    );
}
