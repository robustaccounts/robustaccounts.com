'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useRef } from 'react';

const testimonials = [
    {
        name: 'Sarah Johnson',
        company: 'TechStart Inc.',
        role: 'CEO',
        quote: 'The Professional plan has been perfect for our growing startup. The dedicated account manager and tax preparation services have saved us countless hours.',
        plan: 'Professional',
    },
    {
        name: 'Michael Chen',
        company: 'Manufacturing Solutions',
        role: 'CFO',
        quote: "Enterprise plan's custom reporting and CFO advisory services have transformed how we make financial decisions. The ROI has been incredible.",
        plan: 'Enterprise',
    },
    {
        name: 'Lisa Rodriguez',
        company: 'Local Retail Shop',
        role: 'Owner',
        quote: 'As a small business owner, the Starter plan gives me everything I need at a price I can afford. The monthly reports are clear and helpful.',
        plan: 'Starter',
    },

    {
        name: 'Sarah Johnson',
        company: 'TechStart Inc.',
        role: 'CEO',
        quote: 'The Professional plan has been perfect for our growing startup. The dedicated account manager and tax preparation services have saved us countless hours.',
        plan: 'Professional',
    },
    {
        name: 'Michael Chen',
        company: 'Manufacturing Solutions',
        role: 'CFO',
        quote: "Enterprise plan's custom reporting and CFO advisory services have transformed how we make financial decisions. The ROI has been incredible.",
        plan: 'Enterprise',
    },
    {
        name: 'Lisa Rodriguez',
        company: 'Local Retail Shop',
        role: 'Owner',
        quote: 'As a small business owner, the Starter plan gives me everything I need at a price I can afford. The monthly reports are clear and helpful.',
        plan: 'Starter',
    },
];

export default function TestimonialsSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        containScroll: 'trimSnaps',
    });
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!emblaApi) return;
        const start = () => {
            autoplayRef.current = setInterval(
                () => emblaApi.scrollNext(),
                4500,
            );
        };
        const stop = () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
                autoplayRef.current = null;
            }
        };

        start();
        emblaApi.on('pointerDown', stop);
        emblaApi.on('destroy', stop);

        const root = emblaApi.rootNode();
        root.addEventListener('mouseenter', stop);
        root.addEventListener('mouseleave', start);
        root.addEventListener('focusin', stop);
        root.addEventListener('focusout', start);

        return () => {
            root.removeEventListener('mouseenter', stop);
            root.removeEventListener('mouseleave', start);
            root.removeEventListener('focusin', stop);
            root.removeEventListener('focusout', start);
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [emblaApi]);

    return (
        <section className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-8 px-5 py-12 sm:gap-10 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="text-center">
                <h2 className="mb-3 text-2xl leading-tight font-bold sm:mb-4 sm:text-3xl lg:text-4xl">
                    What Our <span className="text-accent">Clients Say</span>
                </h2>
                <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                    See how our services have helped businesses like yours
                    succeed
                </p>
            </div>

            <div
                className="w-full overflow-hidden"
                ref={emblaRef}
                role="region"
                aria-roledescription="carousel"
                aria-label="Client testimonials"
            >
                <div className="flex">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="min-w-0 shrink-0 grow-0 basis-full p-2 sm:basis-1/2 sm:p-3 lg:basis-1/3"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} of ${testimonials.length}`}
                        >
                            <div className="h-full rounded-2xl bg-secondary p-6 text-primary shadow-sm transition-all hover:shadow-md sm:p-7">
                                <div className="mb-5 flex flex-col gap-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="h-min rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
                                            {testimonial.plan}
                                        </div>
                                        <div
                                            className="flex items-center gap-0.5"
                                            aria-label="5 out of 5 stars"
                                        >
                                            <span className="sr-only">
                                                5 out of 5 stars
                                            </span>
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="text-accent"
                                                    aria-hidden
                                                >
                                                    <span className="text-lg">
                                                        ★
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                                        "{testimonial.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <div>
                                        <div className="font-bold text-primary">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-xs text-gray-600 sm:text-sm">
                                            {testimonial.role},{' '}
                                            {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            if (autoplayRef.current) {
                                clearInterval(autoplayRef.current);
                                autoplayRef.current = null;
                            }
                            emblaApi?.scrollPrev();
                        }}
                        className="rounded-full border-2 border-accent bg-white px-6 py-2.5 text-sm font-semibold text-accent shadow-sm transition-all hover:bg-accent hover:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
                        aria-label="Previous testimonial"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (autoplayRef.current) {
                                clearInterval(autoplayRef.current);
                                autoplayRef.current = null;
                            }
                            emblaApi?.scrollNext();
                        }}
                        className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
                        aria-label="Next testimonial"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
}
