'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

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
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                '[data-hero-title]',
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.8 },
            )
                .fromTo(
                    '[data-hero-desc]',
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 0.6 },
                    '-=0.4',
                )
                .fromTo(
                    '[data-hero-cta]',
                    { autoAlpha: 0, y: 20 },
                    { autoAlpha: 1, y: 0, duration: 0.6 },
                    '-=0.3',
                )
                .fromTo(
                    '[data-hero-image]',
                    { autoAlpha: 0, scale: 1.02 },
                    { autoAlpha: 1, scale: 1, duration: 0.8 },
                    '-=0.6',
                );
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white py-24 lg:py-32"
        >
            {/* Background Grid */}
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

            <div className="cust-container relative z-10">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Text Content */}
                    <div>
                        <h1
                            className="mb-6 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                            data-hero-title
                        >
                            {title}{' '}
                            {highlightedText && (
                                <span className="text-primary">
                                    {highlightedText}
                                </span>
                            )}
                        </h1>
                        <p
                            className="mb-8 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg"
                            data-hero-desc
                        >
                            {subtitle}
                        </p>
                        <div data-hero-cta>
                            <Link
                                href="/lead-form/schedule?source=services"
                                className="btn-div inline-flex uppercase"
                            >
                                <span className="text-box">
                                    Schedule a Call
                                </span>
                                <span className="icon-box">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M5.67227 14.6363L4.59045 13.5545L12.0086 6.13632H5.36318V4.59087H14.6359V13.8636H13.0905V7.21814L5.67227 14.6363Z"
                                            fill="white"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    {image && (
                        <div className="relative" data-hero-image>
                            <div className="relative h-[400px] overflow-hidden shadow-2xl lg:h-[500px]">
                                <Image
                                    src={image}
                                    alt={imageAlt || 'Service Hero Image'}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
