import siteConfig from '@/siteconfig';

import React from 'react';

import { CalendarClock, Phone, Mail } from 'lucide-react';
import Link from '@/ui/link';

const { contactInfo } = siteConfig;

import FadeIn from '@/components/ui/fade-in';
import cn from '@/utils/cn';

const ContactMethodsGrid = () => {
    const contactMethods = [
        {
            icon: <Phone className="h-8 w-8 text-accent" />,
            title: 'Phone',
            description: 'Speak with our team directly',
            contact: contactInfo.phoneDisplay,
            subtext: contactInfo.businessHours.fullDisplay,
            href: `tel:${contactInfo.phoneHref}`,
        },
        {
            icon: <Mail className="h-8 w-8 text-accent" />,
            title: 'Email',
            description: 'Send us a message anytime',
            contact: contactInfo.emailDisplay,
            subtext: `We respond within ${contactInfo.responseTime}`,
            href: `mailto:${contactInfo.emailHref}`,
        },
        {
            icon: <CalendarClock className="h-8 w-8 text-accent" />,
            title: 'Schedule a Call',
            description: 'Book a free consultation',
            contact: 'Schedule Now',
            subtext: contactInfo.consultationDuration,
            href: '/contact',
        },
    ];

    return (
        <section className="w-full bg-gray-50 py-24 lg:py-32">
            <div className="container mx-auto px-5 sm:px-8 lg:px-12">
                <FadeIn className="mb-16 flex flex-col items-center justify-center gap-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                        Get in Touch
                    </h2>
                    <p className="text-base text-gray-600 lg:text-lg">
                        Choose the method that works best for you
                    </p>
                </FadeIn>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {contactMethods.map((method, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.1}
                        >
                            <Link
                                href={method.href}
                                className="group flex h-full flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-white">
                                    <div className="text-accent group-hover:text-white transition-colors">
                                        {method.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                        {method.title}
                                    </h3>
                                    <p className="mb-4 text-sm text-gray-600 sm:text-base">
                                        {method.description}
                                    </p>
                                    <div className="mb-2 text-lg font-bold text-accent">
                                        {method.contact}
                                    </div>
                                    <p className="text-xs font-medium text-gray-500">
                                        {method.subtext}
                                    </p>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactMethodsGrid;
