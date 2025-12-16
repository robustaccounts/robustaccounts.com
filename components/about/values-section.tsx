'use client';

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

const values = [
    {
        number: '01',
        title: 'Precision in Accounting',
        description:
            'We deliver accurate financial records with meticulous attention to detail, ensuring your books are always perfect.',
    },
    {
        number: '02',
        title: 'Data Security',
        description:
            'Your financial data is protected with bank-level security and GDPR compliance standards.',
    },
    {
        number: '03',
        title: 'Speed & Efficiency',
        description:
            'Quick turnaround times and streamlined processes to keep your business moving forward.',
    },
    {
        number: '04',
        title: 'Partnership Approach',
        description:
            'We work as an extension of your team, understanding your business goals and challenges.',
    },
    {
        number: '05',
        title: 'Growth Focused',
        description:
            'Our services are designed to scale with your business and support your growth objectives.',
    },
    {
        number: '06',
        title: 'Innovation',
        description:
            'We leverage the latest accounting technology and best practices to serve you better.',
    },
];

export default function ValuesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial state
            gsap.set('[data-animate]', { autoAlpha: 1 });

            gsap.from('[data-animate]', {
                y: 40,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.1,
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
        <section ref={sectionRef} className="bg-white py-20 lg:py-28">
            <div className="cust-container">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span
                        data-animate
                        className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                    >
                        Our Values
                    </span>
                    <h2
                        data-animate
                        className="mb-4 text-3xl leading-[1.1] font-light tracking-tight text-theme-black md:text-4xl lg:text-5xl"
                    >
                        The Principles That Guide Us
                    </h2>
                    <p data-animate className="mx-auto max-w-2xl text-gray-600">
                        These core values define who we are and how we serve our
                        clients every day.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            data-animate
                            className="group border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-lg"
                        >
                            <span className="mb-4 block text-4xl font-light text-gray-200 transition-colors group-hover:text-primary">
                                {value.number}
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-theme-black">
                                {value.title}
                            </h3>
                            <p className="leading-relaxed text-gray-600">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
