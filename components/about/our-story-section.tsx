'use client';

import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';


const highlights = [
    'IFRS Reporting & GAAP Accounting Standards',
    'International Payroll & Tax Expertise',
    'One-Stop-Shop for Financial Outsourcing',
];

export default function OurStorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('[data-animate]', {
                y: 40,
                opacity: 0,
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
        <section ref={sectionRef} className="bg-theme-offwhite py-20 lg:py-28">
            <div className="cust-container">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Text Content */}
                    <div>
                        <span
                            data-animate
                            className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                        >
                            Our Story
                        </span>
                        <h2
                            data-animate
                            className="mb-6 text-3xl leading-[1.1] font-light tracking-tight text-theme-black md:text-4xl lg:text-5xl"
                        >
                            Built on Trust, Driven by Results
                        </h2>
                        <p
                            data-animate
                            className="mb-4 leading-relaxed text-gray-600"
                        >
                            Founded with a vision to democratize access to
                            professional accounting services, Robust Accounts
                            has grown from a small team of passionate
                            accountants to a globally recognized financial
                            services provider.
                        </p>
                        <p
                            data-animate
                            className="mb-8 leading-relaxed text-gray-600"
                        >
                            We understand that every business is unique, which
                            is why we offer personalized solutions that adapt to
                            your specific needs. Our team combines traditional
                            accounting expertise with modern technology to
                            deliver exceptional results.
                        </p>

                        {/* Highlights */}
                        <div className="space-y-4">
                            {highlights.map((item, index) => (
                                <div
                                    key={index}
                                    data-animate
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                    <span className="text-gray-700">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div data-animate className="relative">
                        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                            <Image
                                src="/assets/images/hero-section-bg.png"
                                alt="Our Story"
                                width={800}
                                height={600}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
