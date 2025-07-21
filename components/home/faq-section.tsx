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
                'container mx-auto flex h-full w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 lg:py-24 xl:min-h-screen xl:py-0',
            )}
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-6 text-center">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Frequently Asked{' '}
                    <span className="text-accent">Questions</span>
                </h2>
                <p className="max-w-2xl text-base leading-relaxed">
                    Get answers to the most common questions about our
                    accounting outsourcing services.
                </p>
            </div>

            {/* FAQ Items */}
            <div className="w-full max-w-4xl space-y-4">
                {faqs.map((faq, index) => (
                    <FrequentlyAskedQuestion
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-6 text-center">
                <p className="text-base sm:text-lg">
                    Still have questions? We're here to help.
                </p>
                <Link
                    href="/faq"
                    className="flex transform cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none sm:px-8 sm:py-4 sm:text-lg"
                >
                    View All FAQs
                </Link>
            </div>
        </section>
    );
}
