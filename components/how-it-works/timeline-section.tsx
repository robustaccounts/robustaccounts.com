'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, CheckCircle, Clock, Zap } from 'lucide-react';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
    {
        phase: 'Initial Consultation',
        duration: '1-2 days',
        description: 'Understanding your needs and requirements',
        icon: Calendar,
    },
    {
        phase: 'Process Setup',
        duration: '3-5 days',
        description: 'Setting up systems and dedicated team',
        icon: CheckCircle,
    },
    {
        phase: 'Transition Period',
        duration: '1-2 weeks',
        description: 'Smooth handover of your accounting functions',
        icon: Zap,
    },
    {
        phase: 'Ongoing Management',
        duration: 'Continuous',
        description: 'Regular accounting operations and support',
        icon: Clock,
    },
];

export function TimelineSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Header animation
            gsap.from('.timeline-header-anim', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            // Card stagger animation
            gsap.from('.timeline-card', {
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.timeline-grid',
                    start: 'top 80%',
                },
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white py-24 lg:py-32"
        >
            {/* Background Grid Pattern */}
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

            <div className="cust-container relative z-10">
                {/* Header */}
                <div className="timeline-header-anim mb-16 text-center lg:mb-20">
                    <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
                        Implementation Timeline
                    </span>
                    <h2 className="mx-auto mb-6 max-w-3xl text-3xl leading-[1.1] font-light tracking-tight text-theme-black md:text-4xl lg:text-5xl">
                        From initial consultation
                        <br />
                        to full implementation
                    </h2>
                    <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        Typical go-live in under 3 weeks
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="timeline-grid grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {timeline.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={index} className="timeline-card relative">
                                {/* Connection Line */}
                                {index < timeline.length - 1 && (
                                    <div className="absolute top-10 left-full hidden h-px w-full bg-gray-200 lg:block" />
                                )}

                                <div className="module-card flex h-full flex-col gap-4 transition-all duration-300 hover:border-primary/20">
                                    {/* Icon and Number */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <IconComponent className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-sm font-bold tracking-wide text-primary uppercase">
                                            {item.duration}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold text-theme-black">
                                            {item.phase}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Step indicator */}
                                    <div className="mt-auto border-t border-gray-100 pt-4">
                                        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                                            Step{' '}
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
