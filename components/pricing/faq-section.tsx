import React from 'react';

const faqs = [
    {
        question: "What's included in the monthly fee?",
        answer: 'Our monthly fees include all bookkeeping services, financial statement preparation, bank reconciliation, and regular reporting. Additional services like tax preparation or advisory work are billed separately based on your chosen plan.',
    },
    {
        question: 'Are there any setup fees?',
        answer: "No, we don't charge setup fees. We believe in transparent pricing and want to make it easy for you to get started with our services.",
    },
    {
        question: 'Can I upgrade or downgrade my plan?',
        answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle.',
    },
    {
        question: 'What if I exceed my transaction limit?',
        answer: "If you exceed your monthly transaction limit, we'll charge $0.50 per additional transaction. We'll notify you before processing any overage charges.",
    },
    {
        question: 'Do you offer custom pricing for large businesses?',
        answer: 'Yes, we offer custom pricing for businesses with complex needs or high transaction volumes. Contact our sales team to discuss your specific requirements.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, ACH bank transfers, and wire transfers. Payment is due monthly in advance.',
    },
    {
        question: 'Is there a contract or can I cancel anytime?',
        answer: 'We offer both month-to-month and annual contracts. Month-to-month plans can be cancelled with 30 days notice. Annual contracts offer a 10% discount.',
    },
    {
        question: 'What happens to my data if I cancel?',
        answer: "Your data remains yours. We'll provide you with all your financial records and help with the transition to ensure continuity of your accounting processes.",
    },
];

export default function FaqSection() {
    return (
        <section className="flex min-h-screen items-center py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Pricing FAQ
                    </h2>
                    <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                        Common questions about our pricing and billing
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-xl bg-white p-6">
                            <h3 className="mb-3 text-lg font-semibold text-primary">
                                {faq.question}
                            </h3>
                            <p className="text-base leading-relaxed text-gray-600">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
