'use client';

import React from 'react';

import Link from '@/ui/link';

import FrequentlyAskedQuestion from '@/components/common/faq';

import cn from '@/utils/cn';

const faqs = [
    {
        question: 'How much can I save by outsourcing my accounting?',
        answer: 'Most businesses save 40-60% on their accounting costs by outsourcing. You eliminate the need for full-time accounting staff, office space, software licenses, and training costs. Our clients typically save $30,000-$80,000 annually compared to hiring in-house accountants.',
    },
    {
        question: 'How quickly can you get started?',
        answer: 'We can typically start working on your accounts within 5-7 business days after the initial consultation and contract signing. Our streamlined onboarding process ensures a smooth transition.',
    },
    {
        question: 'What accounting services do you provide?',
        answer: 'We offer comprehensive accounting services including bookkeeping, tax preparation and planning, payroll management, financial reporting, accounts payable/receivable, bank reconciliation, budgeting, cash flow management, and financial advisory services.',
    },
    {
        question: 'How do you ensure data security?',
        answer: 'We implement bank-level security measures including 256-bit SSL encryption, secure VPN connections, multi-factor authentication, and regular security audits. We are GDPR compliant and follow strict data protection protocols.',
    },
];

export default function FAQSection() {
    return (
        <section
            className={cn(
                'container mx-auto flex h-full w-full flex-col items-center justify-center gap-8 px-5 py-12 sm:gap-10 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20',
            )}
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
                <h2 className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                    Frequently Asked{' '}
                    <span className="text-accent">Questions</span>
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                    Get answers to the most common questions about our
                    accounting outsourcing services.
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
                <p className="text-base text-gray-700 sm:text-lg lg:text-xl">
                    Still have questions? We're here to help.
                </p>
                <Link
                    href="/faq"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none active:scale-95 sm:px-10 sm:text-lg"
                >
                    View All FAQs
                </Link>
            </div>
        </section>
    );
}
