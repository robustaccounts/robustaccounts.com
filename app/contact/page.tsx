import React from 'react';

import {
    CalendarClock,
    Call,
    LocationOn,
    Mail,
    SupportAgent,
} from '@/ui/icons/google-icons';
import Link from '@/ui/link';

import LeadForm from '@/components/lead-form';
import SocialMediaSection from '@/components/social-media-section';

const contactMethods = [
    {
        icon: <Call className="h-8 w-8 fill-primary" />,
        title: 'Phone',
        description: 'Speak with our team directly',
        contact: '+1 (555) 123-4567',
        subtext: 'Mon-Fri 9AM-6PM EST',
        href: 'tel:+15551234567',
    },
    {
        icon: <Mail className="h-8 w-8 fill-primary" />,
        title: 'Email',
        description: 'Send us a message anytime',
        contact: 'info@accountingagency.com',
        subtext: 'We respond within 24 hours',
        href: 'mailto:info@accountingagency.com',
    },
    {
        icon: <CalendarClock className="h-8 w-8 fill-primary" />,
        title: 'Schedule a Call',
        description: 'Book a free consultation',
        contact: 'Schedule Now',
        subtext: '30-minute free consultation',
        href: '/getting-started',
    },
    {
        icon: <SupportAgent className="h-8 w-8 fill-primary" />,
        title: 'Live Chat',
        description: 'Chat with our support team',
        contact: 'Start Chat',
        subtext: 'Available Mon-Fri 9AM-6PM EST',
        href: '#',
    },
];

const officeLocations = [
    {
        city: 'New York',
        address: '123 Financial District\nNew York, NY 10004',
        phone: '+1 (555) 123-4567',
        email: 'ny@accountingagency.com',
        hours: 'Mon-Fri: 9AM-6PM EST',
    },
    {
        city: 'Los Angeles',
        address: '456 Business Center\nLos Angeles, CA 90210',
        phone: '+1 (555) 234-5678',
        email: 'la@accountingagency.com',
        hours: 'Mon-Fri: 9AM-6PM PST',
    },
    {
        city: 'Chicago',
        address: '789 Commerce Plaza\nChicago, IL 60601',
        phone: '+1 (555) 345-6789',
        email: 'chicago@accountingagency.com',
        hours: 'Mon-Fri: 9AM-6PM CST',
    },
];

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
            <section className="relative flex h-full min-h-screen px-4 py-20 sm:px-6 lg:px-12">
                <div className="container mx-auto flex h-auto w-full flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 lg:px-12 lg:py-16">
                    {/* Main Content */}
                    <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
                        <h1 className="text-center font-montserrat text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                            Let's{' '}
                            <span className="font-bold text-primary">
                                Transform
                            </span>{' '}
                            Your Business Together
                        </h1>
                        <p className="max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                            Ready to streamline your finances and focus on
                            growing your business? Get in touch with our expert
                            team for a free consultation and discover how we can
                            help you achieve your financial goals.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                                24hrs
                            </div>
                            <div className="text-sm text-gray-600 sm:text-base">
                                Response Time
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                                500+
                            </div>
                            <div className="text-sm text-gray-600 sm:text-base">
                                Happy Clients
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                                99.9%
                            </div>
                            <div className="text-sm text-gray-600 sm:text-base">
                                Uptime
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                                5★
                            </div>
                            <div className="text-sm text-gray-600 sm:text-base">
                                Client Rating
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            Get in Touch
                        </h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Choose the method that works best for you
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {contactMethods.map((method, index) => (
                            <Link
                                key={index}
                                href={method.href}
                                className="rounded-xl p-6"
                            >
                                <div className="mb-4">{method.icon}</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    {method.title}
                                </h3>
                                <p className="mb-3 text-sm text-gray-600">
                                    {method.description}
                                </p>
                                <div className="mb-2 font-medium text-blue-600">
                                    {method.contact}
                                </div>
                                <p className="text-xs text-gray-500">
                                    {method.subtext}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12 lg:py-16 xl:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Send Us a Message
                        </h2>
                        <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl">
                            Fill out the form below and we'll get back to you
                            within 24 hours
                        </p>
                    </div>

                    <LeadForm />
                </div>
            </section>

            {/* Office Locations */}
            <section className="py-12 lg:py-16 xl:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Our Locations
                        </h2>
                        <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl">
                            Visit us at one of our convenient locations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {officeLocations.map((location, index) => (
                            <div key={index} className="rounded-xl p-6">
                                <h3 className="mb-4 text-xl font-semibold">
                                    {location.city}
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <LocationOn className="mt-0.5 h-5 w-5 fill-primary" />
                                        <div className="text-sm">
                                            {location.address
                                                .split('\n')
                                                .map((line, i) => (
                                                    <div key={i}>{line}</div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Call className="h-5 w-5 fill-primary" />
                                        <Link
                                            href={`tel:${location.phone.replace(/\D/g, '')}`}
                                            className="text-sm text-gray-600 hover:text-blue-600"
                                        >
                                            {location.phone}
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 fill-primary" />
                                        <Link
                                            href={`mailto:${location.email}`}
                                            className="text-sm text-gray-600 hover:text-blue-600"
                                        >
                                            {location.email}
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CalendarClock className="h-5 w-5 fill-primary" />
                                        <span className="text-sm text-gray-600">
                                            {location.hours}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
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

            <SocialMediaSection />
        </main>
    );
}
