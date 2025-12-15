'use client';

import FAQSection, { type FAQItem } from '@/components/ui/faq-section';

interface ServicesFAQSectionProps {
    items: FAQItem[];
    title?: string;
    description?: string;
}

export default function ServicesFAQSection({
    items,
    title = 'Frequently Asked\nQuestions.',
    description = 'Common questions about our services.',
}: ServicesFAQSectionProps) {
    return (
        <FAQSection
            faqs={items}
            eyebrow="FAQ"
            title={title}
            description={description}
            showViewAllButton={false}
        />
    );
}
