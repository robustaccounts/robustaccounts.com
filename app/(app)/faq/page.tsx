'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import React, { useRef, useState } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';
import { ChevronDownIcon } from '@/lib/icons';
import { FAQ_PAGE_FAQS as faqs } from '@/lib/seo/faq-page-faqs';

const FAQItem = ({
    question,
    answer,
    isOpen,
    onClick,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className="group flex w-full items-center justify-between py-6 text-left"
                aria-expanded={isOpen}
            >
                <span className="pr-4 text-base font-medium text-theme-black transition-colors group-hover:text-primary lg:text-lg">
                    {question}
                </span>
                <ChevronDownIcon
                    className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
            >
                <p className="text-sm leading-relaxed text-gray-600 lg:text-base">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default function FAQPage() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const pageRef = useRef<HTMLElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((el) => {
                gsap.fromTo(
                    el,
                    { autoAlpha: 0, y: 20 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            once: true,
                        },
                    },
                );
            });
        },
        { scope: pageRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <main ref={pageRef} className="flex min-h-screen flex-col">
            {/* FAQ Section - 2 Column Layout */}
            <section className="bg-white py-20 text-theme-black lg:py-28">
                <div className="cust-container">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Left: Header */}
                        <div>
                            <span
                                className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                                data-animate
                            >
                                FAQs
                            </span>
                            <h1
                                className="mb-6 text-4xl leading-[1.1] font-light tracking-tight text-theme-black md:text-5xl lg:text-6xl"
                                data-animate
                            >
                                Everything You
                                <br />
                                Want To Know.
                            </h1>
                            <p
                                className="mb-8 max-w-md text-base leading-relaxed text-gray-600"
                                data-animate
                            >
                                Answers to frequently asked questions about our
                                services and how we work with clients.
                            </p>
                        </div>

                        {/* Right: FAQ List */}
                        <div data-animate>
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onClick={() =>
                                        setOpenIndex(
                                            openIndex === index ? null : index,
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
