import React from "react";

import FrequentlyAskedQuestion from "@/components/common/faq";
import contactInfo from "@/data/contact-info";

const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What is accounting outsourcing?",
        answer:
          "Accounting outsourcing is the practice of hiring an external company to handle your business's accounting functions. This includes bookkeeping, tax preparation, payroll processing, financial reporting, and other accounting services. It allows businesses to focus on their core operations while ensuring professional financial management.",
      },
      {
        question: "How much can I save by outsourcing my accounting?",
        answer:
          "Most businesses save 40-60% on their accounting costs by outsourcing. You eliminate the need for full-time accounting staff, office space, software licenses, and training costs. Our clients typically save $30,000-$80,000 annually compared to hiring in-house accountants.",
      },
      {
        question: "What size businesses do you work with?",
        answer:
          "We work with businesses of all sizes, from startups and small businesses to mid-market companies and enterprises. Our scalable solutions can adapt to your business size and growth trajectory.",
      },
      {
        question: "How quickly can you get started?",
        answer:
          "We can typically start working on your accounts within 5-7 business days after the initial consultation and contract signing. Our streamlined onboarding process ensures a smooth transition.",
      },
    ],
  },
  {
    title: "Services & Pricing",
    faqs: [
      {
        question: "What accounting services do you provide?",
        answer:
          "We offer comprehensive accounting services including bookkeeping, tax preparation and planning, payroll management, financial reporting, accounts payable/receivable, bank reconciliation, budgeting, cash flow management, and financial advisory services.",
      },
      {
        question: "How do you price your services?",
        answer:
          "Our pricing is based on the complexity of your business, transaction volume, and specific services needed. We offer transparent, fixed monthly pricing with no hidden fees. Contact us for a custom quote based on your requirements.",
      },
      {
        question: "Do you offer a free consultation?",
        answer:
          "Yes, we offer a free 30-minute consultation to understand your business needs and discuss how our services can benefit you. This consultation helps us provide a tailored solution and accurate pricing.",
      },
      {
        question: "Can you handle my industry-specific accounting needs?",
        answer:
          "Yes, we have experience working with various industries including technology, e-commerce, manufacturing, professional services, healthcare, real estate, and more. Our team stays updated with industry-specific regulations and best practices.",
      },
    ],
  },
  {
    title: "Security & Compliance",
    faqs: [
      {
        question: "How do you ensure data security?",
        answer:
          "We implement bank-level security measures including 256-bit SSL encryption, secure VPN connections, multi-factor authentication, and regular security audits. We are GDPR compliant and follow strict data protection protocols.",
      },
      {
        question: "Are you compliant with accounting standards?",
        answer:
          "Yes, we strictly follow GAAP (Generally Accepted Accounting Principles) and stay updated with all relevant accounting standards and regulations. Our team includes certified professionals who maintain their credentials and continuing education.",
      },
      {
        question: "How do you handle sensitive financial information?",
        answer:
          "We treat all financial information with the utmost confidentiality. We use secure, encrypted systems for data transmission and storage, and all team members sign strict confidentiality agreements.",
      },
      {
        question: "What happens to my data if I cancel?",
        answer:
          "Your data remains yours. We provide you with all your financial records and help with the transition to ensure continuity of your accounting processes. We maintain backups for a reasonable period as required by law.",
      },
    ],
  },
  {
    title: "Communication & Support",
    faqs: [
      {
        question: "How do you communicate with clients?",
        answer:
          "We use multiple communication channels including email, phone, video calls, and project management tools. You'll have direct access to your dedicated account manager and accounting team.",
      },
      {
        question: "What are your business hours?",
        answer: `We operate across multiple time zones to provide 24/7 support. Our core business hours are ${contactInfo.businessHours.fullDisplay}, with extended support available as needed.`,
      },
      {
        question: "How often will I receive financial reports?",
        answer:
          "We provide monthly financial statements as standard, with weekly or daily reporting available upon request. You'll also have real-time access to your financial dashboard.",
      },
      {
        question: "What if I have questions or need urgent support?",
        answer:
          "Your dedicated account manager is available for urgent matters. We also provide 24/7 support through our help desk system with guaranteed response times based on priority levels.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="container mx-auto flex flex-col">
      {/* Hero Section */}
      <section className="relative flex h-full px-4 pt-32 sm:px-6 lg:px-12">
        <div className="container mx-auto flex h-auto w-full flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 lg:px-12 lg:py-16">
          {/* Main Content */}
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
            <h1 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Got Questions?{" "}
              <span className="text-accent">We've Got Answers</span>
            </h1>
            <p className="max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
              Find answers to the most common questions about our accounting
              outsourcing services. Can't find what you're looking for? Contact
              us directly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="flex w-full flex-col items-center justify-center gap-12 px-4 py-12 sm:gap-16 sm:px-6 lg:px-12 lg:py-16">
        <div className="w-full">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <FrequentlyAskedQuestion
                    key={faqIndex}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
