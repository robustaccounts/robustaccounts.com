'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    CheckCircle2,
    Shield,
    Sparkles,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react';

import { ArrowIcon } from '@/lib/icons';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    {
        title: 'Seamless Transition',
        description:
            'Our proven process ensures a smooth transition from your current setup to our optimized system.',
        icon: Sparkles,
    },
    {
        title: 'Dedicated Team',
        description:
            'You get a dedicated team of accounting professionals who understand your business inside out.',
        icon: Shield,
    },
    {
        title: 'Transparent Process',
        description:
            'Every step is clearly communicated with regular updates and transparent reporting.',
        icon: CheckCircle2,
    },
    {
        title: 'Scalable Solutions',
        description:
            'Our process adapts to your business growth and changing requirements.',
        icon: TrendingUp,
    },
];

export function BenefitsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Header animation
            gsap.from('.benefits-header-anim', {
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
            gsap.from('.benefit-card', {
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.benefits-grid',
                    start: 'top 80%',
                },
            });

            // CTA animation
            gsap.from('.benefits-cta', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.benefits-cta',
                    start: 'top 90%',
                },
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-theme-offwhite py-24 lg:py-32"
        >
            <div className="cust-container">
                {/* Header */}
                <div className="benefits-header-anim mb-16 text-center lg:mb-20">
                    <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
                        Why Our Process Works
                    </span>
                    <h2 className="mx-auto max-w-3xl text-3xl leading-[1.1] font-light tracking-tight text-theme-black md:text-4xl lg:text-5xl">
                        Proven methodology that
                        <br />
                        delivers consistent results
                    </h2>
                </div>

                {/* Benefits Grid */}
                <div className="benefits-grid mb-20 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                            <div
                                key={index}
                                className="benefit-card group border border-gray-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                            >
                                <div className="flex flex-col gap-5">
                                    {/* Icon */}
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-theme-black">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-600">
                                            {benefit.description}
                                        </p>
                                    </div>

                                    {/* Arrow link */}
                                    <div className="mt-auto pt-4">
                                        <ArrowRight className="h-5 w-5 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className="benefits-cta flex flex-col items-center gap-6 text-center">
                    <p className="max-w-xl text-gray-600">
                        Join hundreds of businesses who have streamlined their
                        accounting operations with our proven process.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/lead-form/schedule"
                            className="btn-div uppercase"
                        >
                            <span className="text-box">Get Started Today</span>
                            <span className="icon-box">
                                <ArrowIcon size={14} className="text-white" />
                            </span>
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center border border-theme-black/15 px-8 py-[1rem] text-[0.85rem] font-bold tracking-[0.1em] text-theme-black uppercase transition-all hover:border-primary hover:text-primary"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
