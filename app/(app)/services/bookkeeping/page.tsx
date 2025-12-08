'use client';

import React from 'react';

import ServiceHero from '@/components/services/shared-hero';
import FadeIn from '@/components/ui/fade-in';
import { Check, ClipboardList, PieChart, TrendingUp } from 'lucide-react';
import ProcessSection from '@/components/services/process-section';
import WhoIsThisForSection from '@/components/services/who-is-this-for-section';
import FAQSection from '@/components/services/faq-section';

const features = [
    {
        title: 'Daily Transaction Categorization',
        description:
            'We categorize every transaction daily so your books are always up to date.',
        icon: ClipboardList,
    },
    {
        title: 'Bank Reconciliation',
        description:
            'Monthly reconciliation of all bank and credit card accounts to ensure accuracy.',
        icon: Check,
    },
    {
        title: 'Financial Reporting',
        description:
            'Get detailed Profit & Loss, Balance Sheet, and Cash Flow statements every month.',
        icon: PieChart,
    },
    {
        title: 'Tax-Ready Financials',
        description:
            'We prepare clean financial packages ready for your tax CPA at year-end.',
        icon: TrendingUp,
    },
];

const processSteps = [
    {
        title: 'Connect Your Accounts',
        description:
            'Securely connect your bank feeds and credit cards to our read-only dashboard. We integrate with QuickBooks, Xero, and more.',
    },
    {
        title: 'We Categorize & Reconcile',
        description:
            'Our dedicated bookkeepers categorize daily transactions and reconcile accounts monthly to ensure every penny is accounted for.',
    },
    {
        title: 'Receive Monthly Reports',
        description:
            'By the 15th of each month, you get accurate financial statements (P&L, Balance Sheet) to make informed business decisions.',
    },
];

const audience = [
    'Small Business Owners overwhelmed by paperwork',
    'Startups needing investor-ready financials',
    'Agencies wanting to track profitability per client',
    'E-commerce stores with high transaction volume',
    'Businesses preparing for tax season',
    'Companies looking to replace an expensive in-house bookkeeper',
];

const faqs = [
    {
        question: 'Do you work with my CPA?',
        answer: 'Absolutely. We prepare your books so your CPA can focus on tax strategy and filing. We can communicate directly with them during tax season to answer any questions.',
    },
    {
        question: 'Which accounting software do you support?',
        answer: 'We primarily work with QuickBooks Online and Xero, which are the industry standards. If you are on another platform, let us know and we can discuss migration or support.',
    },
    {
        question: 'How secure is my financial data?',
        answer: 'Security is our top priority. We use bank-level 256-bit encryption for all data transmission and never have authority to move your money—only to view and categorize.',
    },
    {
        question: 'What if I am behind on my books?',
        answer: 'No problem! We offer catch-up services to bring months or even years of messy historical data up to date anytime.',
    },
];

export default function BookkeepingPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <ServiceHero
                title="Accurate bookkeeping for"
                highlightedText="peace of mind"
                subtitle="Stop worrying about your books. Our expert team handles your daily transactions, reconciliations, and reporting so you can focus on growing your business."
            />

            {/* Features Grid */}
            <section className="w-full bg-gray-50 py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                            What's Included
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Comprehensive bookkeeping services designed for
                            growing businesses.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                        {features.map((feature, index) => (
                            <FadeIn
                                key={index}
                                delay={index * 0.1}
                                className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-base leading-relaxed text-gray-600">
                                    {feature.description}
                                </p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <ProcessSection steps={processSteps} />
            <WhoIsThisForSection audience={audience} />
            <FAQSection items={faqs} />
        </main>
    );
}
