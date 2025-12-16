'use client';

import FAQSection, { type FAQItem } from '@/components/ui/faq-section';

interface ContactFAQGridProps {
    faqs: FAQItem[];
}

export default function ContactFAQGrid({ faqs }: ContactFAQGridProps) {
    return (
        <FAQSection
            faqs={faqs}
            eyebrow="FAQ"
            title={`Common
Questions.`}
            description="Get answers to frequently asked questions about our services and how we work with clients."
            showViewAllButton={false}
        />
    );
}
