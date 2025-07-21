import React from "react";

interface FAQ {
  question: string;
  answer: string;
}

const ContactFAQGrid = ({ faqs }: { faqs: FAQ[] }) => (
  <section className="py-12 lg:py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
          Get answers to common questions about our services
        </p>
      </div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {faq.question}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
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
