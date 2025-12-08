'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import FadeIn from '@/components/ui/fade-in';
import cn from '@/utils/cn';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
    title?: string;
    description?: string;
}

export default function FAQSection({
    items,
    title = 'Frequently Asked Questions',
    description = 'Common questions about our services.',
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="w-full bg-white py-24 lg:py-32">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-16 text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                        <HelpCircle className="h-7 w-7" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        {title}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">{description}</p>
                </FadeIn>

                <div className="space-y-4">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <FadeIn
                                key={index}
                                delay={index * 0.05}
                                className={cn(
                                    "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                                    isOpen 
                                        ? "border-accent/20 ring-4 ring-accent/5 shadow-lg" 
                                        : "border-gray-100 hover:border-gray-200"
                                )}
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="flex w-full items-center justify-between px-6 py-5 text-left font-medium focus:outline-none sm:px-8 sm:py-6"
                                >
                                    <span className={cn(
                                        "text-lg font-bold transition-colors",
                                        isOpen ? "text-accent" : "text-primary"
                                    )}>
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            'h-5 w-5 text-gray-400 transition-transform duration-300',
                                            isOpen && 'rotate-180 text-accent',
                                        )}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height: 'auto',
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="px-6 pb-6 pt-0 text-base leading-relaxed text-gray-600 sm:px-8 sm:pb-8">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
