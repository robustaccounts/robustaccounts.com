'use client';

import React, { useState } from 'react';

import cn from '@/utils/cn';

const faqs = [
    {
        question:
            'What makes your accounting services different for churches and non-profits?',
        answer: `We specialize in the unique financial requirements of churches and non-profit organizations, including fund accounting, grant management, donor reporting, and IRS Form 990 preparation. Our team understands ministry operations and compliance requirements specific to tax-exempt organizations.`,
    },
    {
        question: 'Do you understand church-specific accounting needs?',
        answer: `Yes! We have extensive experience with churches and understand designated giving, multi-fund accounting, pastor housing allowances, love offerings, and other ministry-specific financial matters. We've been serving churches since our founding.`,
    },
    {
        question: 'Can you help with IRS Form 990 preparation?',
        answer: `Absolutely. We prepare and file IRS Form 990, 990-EZ, and 990-N (e-Postcard) for non-profit organizations. We ensure compliance with all IRS requirements and help you avoid penalties.`,
    },
    {
        question: 'How do you handle donor confidentiality?',
        answer: `We maintain strict confidentiality with all donor information while ensuring proper documentation for tax purposes. We understand the sensitivity of church finances and work within your organization's policies for financial transparency.`,
    },
    {
        question: 'Do you provide grant accounting and reporting?',
        answer: `Yes, we offer complete grant accounting services including tracking restricted funds, preparing required grant reports, ensuring compliance with grantor requirements, and maintaining proper documentation for audits.`,
    },
    {
        question:
            'Can you help with budget planning for our church or non-profit?',
        answer: `Definitely. We assist with annual budget preparation, variance analysis, financial forecasting, and strategic planning. We help you make informed decisions about resource allocation to maximize your mission impact.`,
    },
    {
        question: 'How much do your services cost for small churches?',
        answer: `Our pricing is customized based on your organization's size, transaction volume, and specific needs. Many small churches find our services more affordable than hiring a part-time bookkeeper, with the added benefit of professional expertise and continuity.`,
    },
    {
        question: 'Do you work with church management software?',
        answer: `Yes, we integrate with popular church management platforms like Planning Center, Church Community Builder, Breeze, and others. We also work with accounting software like QuickBooks for Non-Profits and Aplos.`,
    },
    {
        question: 'Can you help prepare for an audit or financial review?',
        answer: `Yes, we can help organize your financial records, prepare required documentation, and coordinate with your auditors. Many churches and non-profits use our services specifically to ensure they're audit-ready.`,
    },
    {
        question: 'How quickly can you get us started?',
        answer: `We can typically begin within 1-2 weeks after our initial consultation. We'll work with you to understand your current systems, transition smoothly, and ensure no interruption in your financial operations.`,
    },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-lg border border-gray-200 bg-white">
            <button
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-base font-semibold text-primary sm:text-lg">
                    {question}
                </span>
                <span
                    className={cn(
                        'ml-4 flex-shrink-0 text-2xl text-accent transition-transform',
                        isOpen && 'rotate-45',
                    )}
                >
                    +
                </span>
            </button>
            {isOpen && (
                <div className="border-t border-gray-200 p-6">
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function NonprofitFAQSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 bg-white px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Frequently Asked Questions
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Common questions from churches and non-profit leaders
                </p>
            </div>

            <div className="w-full max-w-4xl space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>
        </section>
    );
}
