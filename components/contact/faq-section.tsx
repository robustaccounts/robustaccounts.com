import React from 'react';

interface FAQ {
    question: string;
    answer: string;
}

const ContactFAQGrid = ({ faqs }: { faqs: FAQ[] }) => (
    <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-12 flex flex-col items-center justify-center gap-2 text-center">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Frequently Asked Questions
                </h2>
                <p className="text-base lg:text-lg">
                    Get answers to common questions about our services
                </p>
            </div>
            <div className="mx-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {faqs.map((faq, index) => (
                        <div key={index} className="rounded-xl p-6">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900 lg:text-xl">
                                {faq.question}
                            </h3>
                            <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default ContactFAQGrid;
