'use client';

import React from 'react';

import ServiceHero from '@/components/services/shared-hero';
import FadeIn from '@/components/ui/fade-in';
import { Calendar, Users, ShieldCheck, FileText } from 'lucide-react';
import ProcessSection from '@/components/services/process-section';
import WhoIsThisForSection from '@/components/services/who-is-this-for-section';
import FAQSection from '@/components/services/faq-section';

const features = [
    {
        title: 'Automated Payroll Runs',
        description:
            'Set it and forget it. We handle your payroll schedule, whether weekly, bi-weekly, or monthly.',
        icon: Calendar,
    },
    {
        title: 'Tax Filing & Compliance',
        description:
            'We calculate, file, and pay your federal, state, and local payroll taxes automatically.',
        icon: ShieldCheck,
    },
    {
        title: 'Employee Self-Service',
        description:
            'Employees get their own portal to view pay stubs, W-2s, and manage personal details.',
        icon: Users,
    },
    {
        title: 'Year-End W-2s & 1099s',
        description:
            'We generate and distribute all necessary year-end tax forms to your team and contractors.',
        icon: FileText,
    },
];

const processSteps = [
    {
        title: 'Sync Employee Data',
        description:
            'Enter hours worked or sync with your time-tracking software. We verify the data for accuracy.',
    },
    {
        title: 'Review & Approve',
        description:
            'We prepare the payroll run and send you a summary for approval. One click and you’re done.',
    },
    {
        title: 'Direct Deposit & Tax Filing',
        description:
            'Funds are deposited directly into employee accounts, and all payroll taxes are filed and paid automatically.',
    },
];

const audience = [
    'Growing companies hiring their first employees',
    'Businesses tired of payroll tax penalties',
    'Remote teams in multiple states/jurisdictions',
    'Companies managing a mix of W-2s and contractors',
    'Owners who want to automate administrative tasks',
];

const faqs = [
    {
        question: 'Do you handle filings for all 50 states?',
        answer: 'Yes, we handle federal, state, and local payroll tax filings for employees in all 50 states.',
    },
    {
        question: 'Can I pay contractors (1099s) through this service?',
        answer: 'Absolutely. We can handle payments and year-end 1099 filings for all your independent contractors alongside your W-2 employees.',
    },
    {
        question: 'How long does direct deposit take?',
        answer: 'Standard processing time is 2-4 business days, but next-day and same-day direct deposit options are available for qualified businesses.',
    },
    {
        question: 'Who handles onboarding new employees?',
        answer: 'We provide self-service onboarding flows where new hires can enter their own personal banking and tax information securely.',
    },
];

import Image from 'next/image';

export default function PayrollPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <ServiceHero
                title="Payroll that works for"
                highlightedText="you & your team"
                subtitle="Streamlined payroll processing, automated tax filings, and full compliance. We ensure your team gets paid on time, every time."
                image="/assets/images/payroll-hero.png"
                imageAlt="HR manager managing payroll on a modern dashboard"
            />

            {/* Features Grid */}
            <section className="w-full bg-gray-50 py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                            Payroll Made Simple
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            A complete payroll solution that scales with your
                            team.
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
