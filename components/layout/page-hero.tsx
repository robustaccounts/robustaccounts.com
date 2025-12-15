'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Image from 'next/image';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

interface PageHeroProps {
    eyebrow?: string;
    title: string;
    imageSrc?: string;
}

export default function PageHero({
    eyebrow,
    title,
    imageSrc = '/assets/images/hero-bg.jpg',
}: PageHeroProps) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                '[data-hero-eyebrow]',
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.6 },
            ).fromTo(
                '[data-hero-title]',
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.8 },
                '-=0.3',
            );
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-0">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={imageSrc}
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-theme-black opacity-80" />
                <div className="absolute inset-0 bg-theme-black/30" />
            </div>

            {/* Content */}
            <div className="cust-container relative z-10 pt-28 pb-20 text-white md:pt-32 lg:pt-36 xl:pt-44">
                {eyebrow && (
                    <p
                        className="mb-6 text-xs font-semibold tracking-[0.2em] text-primary uppercase"
                        data-hero-eyebrow
                    >
                        {eyebrow}
                    </p>
                )}
                <h1
                    className="text-4xl leading-[1.05] font-light tracking-tight capitalize md:text-5xl lg:text-6xl xl:text-7xl"
                    data-hero-title
                >
                    {title}
                </h1>
            </div>
        </section>
    );
}
