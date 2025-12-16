'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { ArrowIcon, ChevronDownIcon } from '@/lib/icons';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    /** Array of FAQ items */
    faqs: FAQItem[];
    /** Section eyebrow label */
    eyebrow?: string;
    /** Main heading - supports line breaks with \n */
    title?: string;
    /** Description text below heading */
    description?: string;
    /** Show "View All FAQs" button */
    showViewAllButton?: boolean;
    /** Custom link for the button */
    buttonLink?: string;
    /** Custom button text */
    buttonText?: string;
}

const FAQItemComponent = ({
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

export default function FAQSection({
    faqs,
    eyebrow = 'FAQ',
    title = 'Common\nQuestions.',
    description = 'Answers to frequently asked questions about working with us.',
    showViewAllButton = false,
    buttonLink = '/faq',
    buttonText = 'View All FAQs',
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Split title by newline for line breaks
    const titleParts = title.split('\n');

    return (
        <section className="bg-white py-20 text-theme-black lg:py-28">
            <div className="cust-container">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Left: Header */}
                    <div>
                        <span
                            className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase"
                            data-animate="fade-up"
                        >
                            {eyebrow}
                        </span>
                        <h2
                            className="mb-6 text-4xl leading-[1.1] font-light tracking-tight text-theme-black md:text-5xl"
                            data-animate="fade-up"
                        >
                            {titleParts.map((part, i) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < titleParts.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h2>
                        <p
                            className="mb-8 max-w-md text-base leading-relaxed text-gray-600"
                            data-animate="fade-up"
                        >
                            {description}
                        </p>
                        {showViewAllButton && (
                            <div data-animate="fade-up">
                                <Link
                                    href={buttonLink}
                                    className="btn-div uppercase"
                                >
                                    <span className="text-box">
                                        {buttonText}
                                    </span>
                                    <span className="icon-box">
                                        <ArrowIcon
                                            size={14}
                                            className="text-white"
                                        />
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right: FAQ List */}
                    <div>
                        {faqs.map((faq, index) => (
                            <FAQItemComponent
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
    );
}
