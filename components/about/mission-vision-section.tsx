'use client';

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

export default function MissionVisionSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('[data-animate]', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section ref={sectionRef} className="bg-theme-black py-20 lg:py-28">
            <div className="cust-container">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span
                        data-animate
                        className="mb-4 block text-xs font-bold tracking-[0.2em] uppercase"
                        style={{ color: '#34d399' }}
                    >
                        Our Purpose
                    </span>
                    <h2
                        data-animate
                        className="text-3xl leading-[1.1] font-light tracking-tight text-white md:text-4xl lg:text-5xl"
                    >
                        Mission & Vision
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Mission */}
                    <div
                        data-animate
                        className="border border-white/10 bg-white/5 p-8 lg:p-12"
                    >
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] uppercase"
                            style={{ color: '#34d399' }}
                        >
                            Our Mission
                        </span>
                        <p
                            className="text-lg leading-relaxed"
                            style={{ color: '#ffffff' }}
                        >
                            To empower businesses worldwide by providing
                            exceptional accounting and financial services that
                            drive growth, ensure compliance, and create lasting
                            value. We believe that every business deserves
                            access to professional financial expertise,
                            regardless of size or location.
                        </p>
                    </div>

                    {/* Vision */}
                    <div
                        data-animate
                        className="border border-white/10 bg-white/5 p-8 lg:p-12"
                    >
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] uppercase"
                            style={{ color: '#34d399' }}
                        >
                            Our Vision
                        </span>
                        <p
                            className="text-lg leading-relaxed"
                            style={{ color: '#ffffff' }}
                        >
                            To become the world's most trusted accounting
                            outsourcing partner, known for our commitment to
                            excellence, innovation, and client success. We
                            envision a future where businesses can focus
                            entirely on their core operations while we handle
                            their financial complexities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
