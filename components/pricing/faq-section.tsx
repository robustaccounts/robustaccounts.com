'use client';

import FAQSection from '@/components/ui/faq-section';

const FAQS = [
    {
        question: 'Can I change my plan at any time?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately with prorated billing, while downgrades take effect at the start of your next billing cycle. Our team will help ensure a smooth transition between plans.',
    },
    {
        question: 'How do prices change as my monthly expenses go up?',
        answer: "Our pricing scales with your business complexity. As your monthly expenses increase, you may need to move to a higher tier to accommodate additional transaction volume and reporting needs. We'll always discuss any pricing changes with you before they take effect and help you find the right plan for your needs.",
    },
    {
        question: 'Are there any transaction volume limits?',
        answer: "Each plan is designed to handle a specific range of transaction volumes. Launch is ideal for businesses with moderate transactions, Scale handles higher volumes with automated workflows, and Command offers unlimited capacity for complex, high-volume operations. We'll monitor your usage and recommend the best plan as your business grows.",
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, ACH bank transfers, and wire transfers. All plans are billed annually in advance at a discounted rate.',
    },
    {
        question: 'What happens during onboarding?',
        answer: 'Our onboarding process connects your bank accounts, sets up your chart of accounts, migrates historical data, and configures your reporting preferences. Quick onboarding typically completes in days, while Priority and Day-Zero onboarding offer expedited timelines.',
    },
    {
        question: 'Is there a contract or can I cancel anytime?',
        answer: "Our plans are billed annually for the best rates. You can cancel with 30 days notice, and we'll help you transition your books to your new provider. Your data always remains yours.",
    },
];

export default function PricingFAQSection() {
    return (
        <FAQSection
            faqs={FAQS}
            eyebrow="FAQ"
            title={`Frequently Asked
Questions.`}
            description="Common questions about our pricing and billing."
            showViewAllButton={false}
        />
    );
}
