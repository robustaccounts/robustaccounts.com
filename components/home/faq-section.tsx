'use client';

import React from 'react';

import Link from '@/ui/link';

import FrequentlyAskedQuestion from '@/components/common/faq';

import cn from '@/utils/cn';

const faqs = [
    {
        question: 'What are the cost benefits of outsourcing?',
        answer: 'Outsourcing removes the need for full-time hires, office space, software licenses, and ongoing training. Most clients see meaningful cost reduction while gaining a dedicated team sized to their needs.',
    },
    {
        question: 'How quickly can you get started?',
        answer: 'We can typically start working on your accounts within 5-7 business days after the initial discovery call and contract signing. Our streamlined onboarding process ensures a smooth transition.',
    },
    {
        question: 'What does your team handle?',
        answer: 'We provide comprehensive accounting services including bookkeeping, tax preparation and planning, payroll management, financial reporting, accounts payable/receivable, bank reconciliation, budgeting, cash flow management, and financial advisory services.',
    },
    {
        question: 'How do you ensure data security?',
        answer: 'We implement strict security measures including 256-bit SSL encryption, secure VPN connections, multi-factor authentication, and regular security audits. We are GDPR compliant and follow strict data protection protocols.',
    },
];

export default function FAQSection() {
    return (
        <section className="w-full bg-gray-50 py-24 sm:py-32">
            <div className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-12 px-5 sm:gap-16 sm:px-8 md:px-12 lg:px-16">
                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
                    <h2 className="text-[1.75rem] leading-tight font-bold tracking-[-0.02em] text-primary sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                        Common Questions
                    </h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                        Answers to frequently asked questions about working with us.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="w-full max-w-4xl space-y-3 sm:space-y-4">
                    {faqs.map((faq, index) => (
                        <FrequentlyAskedQuestion
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center gap-5 pt-4 text-center sm:gap-6">
                    <p className="text-sm text-gray-600 sm:text-base lg:text-lg">
                        Have more questions? We're here to help.
                    </p>
                    <Link
                        href="/faq"
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[0.9375rem] font-medium text-white transition-all duration-300 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 sm:px-9 sm:py-4 sm:text-base"
                    >
                        View All FAQs
                    </Link>
                </div>
            </div>
        </section>
    );
}

