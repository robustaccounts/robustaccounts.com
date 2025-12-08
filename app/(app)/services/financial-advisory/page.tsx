'use client';

import React from 'react';

import ServiceHero from '@/components/services/shared-hero';
import FadeIn from '@/components/ui/fade-in';
import { BarChart2, Target, LineChart, Briefcase } from 'lucide-react';
import ProcessSection from '@/components/services/process-section';
import WhoIsThisForSection from '@/components/services/who-is-this-for-section';
import FAQSection from '@/components/services/faq-section';

const features = [
    {
        title: 'Cash Flow Forecasting',
        description:
            'Predict future cash positions to make informed decisions about hiring, inventory, and expansion.',
        icon: LineChart,
    },
    {
        title: 'Budgeting & Planning',
        description:
            'Create realistic budgets and track performance against them to keep your business on course.',
        icon: Target,
    },
    {
        title: 'KPI Dashboarding',
        description:
            'Visualize your most important metrics with custom dashboards tailored to your industry.',
        icon: BarChart2,
    },
    {
        title: 'Strategic CFO Guidance',
        description:
            'Regular meetings with a dedicated CFO to discuss strategy, risks, and opportunities.',
        icon: Briefcase,
    },
];

const processSteps = [
    {
        title: 'Discovery & Analysis',
        description:
            'We review your historical financials and business model to understand your profit drivers and cash flow cycle.',
    },
    {
        title: 'Build the Roadmap',
        description:
            'We create a financial model, set budgets, and define key performance indicators (KPIs) relevant to your goals.',
    },
    {
        title: 'Regular Advisory Meetings',
        description:
            'We meet monthly or quarterly to review performance, adjust the plan, and provide strategic advice for growth.',
    },
];

const audience = [
    'Businesses hitting a growth plateau',
    'Owners looking to exit or sell their business',
    'Companies preparing for fundraising',
    'Businesses with complex cash flow challenges',
    'CEOs needing a financial sounding board',
];

const faqs = [
    {
        question: 'Do I really need a CFO?',
        answer: 'If you are making complex decisions about growth, hiring, or capital allocation based on gut feeling rather than data, fractional CFO services can provide high ROI.',
    },
    {
        question: 'How often do we meet?',
        answer: 'It depends on your needs. Standard advisory packages include monthly strategy sessions, but we also offer quarterly reviews or bi-weekly deep dives.',
    },
    {
        question: 'Is this different from bookkeeping?',
        answer: 'Yes. Bookkeeping looks backward at what happened. Financial Advisory looks forward at what will happen and how to influence it.',
    },
    {
        question: 'Can you help with investor pitch decks?',
        answer: 'Yes, we specialize in helping founders prepare robust financial models and narratives for investor meetings.',
    },
];

export default function FinancialAdvisoryPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <ServiceHero
                title="Strategic insight for"
                highlightedText="growth"
                subtitle="Go beyond the numbers. Our financial advisory services provide the strategic guidance and analysis you need to scale your business with confidence."
            />

            {/* Features Grid */}
            <section className="w-full bg-gray-50 py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                            Unlock Your Potential
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Expert financial guidance to drive your business
                            forward.
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
