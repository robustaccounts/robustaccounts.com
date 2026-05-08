'use client';

import FAQSection from '@/components/ui/faq-section';
import { HOME_FAQS } from '@/lib/seo/home-faqs';

export default function HomeFAQSection() {
    return (
        <FAQSection
            faqs={HOME_FAQS}
            eyebrow="FAQ"
            title={`Common
Questions.`}
            description="Answers to frequently asked questions about working with us."
            showViewAllButton={true}
            buttonLink="/faq"
            buttonText="View All FAQs"
        />
    );
}
