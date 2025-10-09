'use client';

import React, { useState } from 'react';

import cn from '@/utils/cn';

const faqs = [
    {
        question: 'What financial services does Robust Accounts offer?',
        answer: `Robust Accounts Financial Solutions provide remote, U.S.-based support across bookkeeping, payroll, tax services, and financial strategy, delivered by experienced professionals. We offer virtual Bookkeepers, Payroll Services, Tax Preparation, and fractional CFOs, designed to give business owners accurate, real-time visibility into their finances without the burden of hiring in-house staff.`,
    },
    {
        question: 'How much do Robust Accounts Financial Solutions cost?',
        answer: `Robust Accounts Financial Solutions are priced based on the level of support, complexity, and service scope your business requires. We offer flexible, premium financial support, typically far more cost-effective than hiring full-time finance employees. Pricing is customized to fit your unique business needs, so you only pay for the expertise you actually use.`,
    },
    {
        question: 'What are Robust Accounts Financial Solutions?',
        answer: `Robust Accounts Financial Solutions are outsourced financial services designed for small to mid-sized businesses that want accurate, reliable, and scalable financial support — without hiring full-time staff. From virtual bookkeeping to strategic financial guidance, we help you stay financially sound and focused on growth.`,
    },
    {
        question: 'Why should I outsource my finances to Robust Accounts?',
        answer: `Outsourcing your finances to Robust Accounts gives you access to expert-level financial support without the cost or commitment of in-house hires. Our Financial Solutions help eliminate stress, reduce errors, and give you confidence in your numbers, so you can make smarter decisions faster.`,
    },
    {
        question: 'How much do outsourced financial solutions cost?',
        answer: `Outsourced financial solutions costs depend on your transaction volume, business complexity, and service scope. At Robust Accounts, our Financial Solutions are delivered by U.S.-based professionals on a fractional basis, so you pay only for the hours and expertise you need. This offers a more scalable and cost-effective alternative to hiring full-time financial staff, with no benefits, onboarding, or overhead expenses.`,
    },
    {
        question: 'What are the benefits of remote Financial Solutions?',
        answer: `The benefits include: Lower overhead compared to in-house staff, real-time access to clean financial data, increased accuracy and fewer errors, greater flexibility and scalability, and seamless integration with your cloud-based tools. Our virtual Financial Solutions pair you with a U.S.-based expert who works securely within your systems so you stay compliant, efficient, and focused on growth.`,
    },
    {
        question: 'Are remote Financial Solutions secure?',
        answer: `Yes, remote financial solutions are secure when handled by professional providers using cloud-based tools. At Robust Accounts, our virtual Financial Experts use industry-standard platforms with bank-level encryption, secure file sharing, and multi-factor authentication. All services are delivered through your existing accounting systems (like QuickBooks Online or Xero), so you stay in control while we handle the execution.`,
    },
    {
        question:
            'How does Robust Accounts deliver its Financial Solutions remotely?',
        answer: `Robust Accounts delivers all Financial Solutions virtually through secure cloud-based systems and vetted U.S.-based professionals. Whether it's bookkeeping, payroll support, or financial insights, your Robust Accounts financial team works seamlessly within your systems while maintaining full transparency and control.`,
    },
    {
        question:
            'Is Robust Accounts a good fit for small businesses needing financial help?',
        answer: `Yes, Robust Accounts Financial Solutions are especially well-suited for small and growing businesses that need professional-grade financial support without the expense of full-time hires. Our flexible model ensures you get only what you need, when you need it.`,
    },
    {
        question:
            'What makes Robust Accounts Financial Solutions different from other virtual finance services?',
        answer: `Robust Accounts Financial Solutions stand apart due to our rigorous vetting process, U.S.-based team members, and commitment to long-term relationship building. Unlike freelancers or low-cost outsourcing firms, we match you with dedicated professionals who integrate into your workflow and deliver consistent, high-trust support.`,
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

export default function AccountingServicesFAQSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 bg-secondary px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Frequently Asked Questions
                </h2>
                <p className="max-w-3xl text-base sm:text-lg">
                    Get answers to common questions about our financial
                    solutions and services
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
