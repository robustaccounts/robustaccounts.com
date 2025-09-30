import React from 'react';
import type { Metadata } from 'next';

import ContactFAQGrid from '@/components/contact/faq-section';
import ContactHeroSection from '@/components/contact/hero-section';
import ContactMethodsGrid from '@/components/contact/methods-section';

const faqs = [
    {
        question: 'How quickly can we get started?',
        answer: 'We can typically begin working with new clients within 5-7 business days after our initial consultation and contract signing. Our onboarding process is designed to be smooth and efficient.',
    },
    {
        question: 'What information do you need from us?',
        answer: "We'll need access to your current financial records, bank statements, previous tax returns, and any existing accounting software. Our team will provide a detailed checklist during onboarding.",
    },
    {
        question: 'Do you work with businesses in my industry?',
        answer: 'We work with businesses across various industries including technology, e-commerce, manufacturing, professional services, healthcare, real estate, and more. Our team has specialized expertise in multiple sectors.',
    },
    {
        question: 'How do you ensure data security?',
        answer: "We use enterprise-grade security measures including encrypted data transmission, secure cloud storage, multi-factor authentication, and regular security audits. We're also compliant with major security frameworks.",
    },
    {
        question: 'What are your payment terms?',
        answer: 'We offer flexible payment terms including monthly, quarterly, and annual billing options. Most clients prefer monthly billing for better cash flow management. We accept various payment methods including ACH, wire transfers, and credit cards.',
    },
    {
        question: 'Can you help with tax planning and preparation?',
        answer: 'Yes, we provide comprehensive tax services including tax planning, preparation, filing, and representation. Our tax professionals stay current with all tax law changes and can help optimize your tax strategy.',
    },
];

export default function ContactPage() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <ContactHeroSection />
            {/* Contact Methods */}
            <ContactMethodsGrid />
            {/* FAQ Section */}
            <ContactFAQGrid faqs={faqs} />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with Robust Accounts for a free consultation. Call, email, or schedule a time that suits you.',
    alternates: { canonical: '/contact' },
};
