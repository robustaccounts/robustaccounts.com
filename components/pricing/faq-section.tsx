'use client';

import React, { useState } from 'react';

import { ChevronDown } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: 'Can I change my plan at any time?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately with prorated billing, while downgrades take effect at the start of your next billing cycle. Our team will help ensure a smooth transition between plans.',
    },
    {
        question: 'How do prices change as my monthly expenses go up?',
        answer: 'Our pricing scales with your business complexity. As your monthly expenses increase, you may need to move to a higher tier to accommodate additional transaction volume and reporting needs. We\'ll always discuss any pricing changes with you before they take effect and help you find the right plan for your needs.',
    },
    {
        question: 'Are there any transaction volume limits?',
        answer: 'Each plan is designed to handle a specific range of transaction volumes. Launch is ideal for businesses with moderate transactions, Scale handles higher volumes with automated workflows, and Command offers unlimited capacity for complex, high-volume operations. We\'ll monitor your usage and recommend the best plan as your business grows.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, ACH bank transfers, and wire transfers. All plans are billed annually in advance at a discounted rate.',
    },
    {
        question: 'What happens during onboarding?',
        answer: 'Our onboarding process connects your bank accounts, sets up your chart of accounts, migrates historical data, and configures your reporting preferences. Quick onboarding typically completes in days, while Priority and Day-Zero onboarding offer expedited timelines.',
    },
    {
        question: 'Is there a contract or can I cancel anytime?',
        answer: 'Our plans are billed annually for the best rates. You can cancel with 30 days notice, and we\'ll help you transition your books to your new provider. Your data always remains yours.',
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="flex items-center py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Frequently asked{' '}
                        <span className="text-accent">questions</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
                        Common questions about our pricing and billing
                    </p>
                </div>

                <div className="mx-auto max-w-3xl space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300"
                        >
                            <button
                                type="button"
                                onClick={() => toggleFaq(index)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left"
                            >
                                <h3 className="pr-4 text-base font-semibold text-gray-900 sm:text-lg">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-200 ${
                                    openIndex === index
                                        ? 'max-h-96 opacity-100'
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className="px-6 pb-5 text-base leading-relaxed text-gray-600">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
