import contactInfo from '@/data/contact-info';

import React from 'react';

import {
    CalendarClock,
    Call,
    Mail,
    SupportAgent,
} from '@/ui/icons/google-icons';
import Link from '@/ui/link';

const ContactMethodsGrid = () => {
    const contactMethods = [
        {
            icon: <Call className="h-12 w-12 fill-accent" />,
            title: 'Phone',
            description: 'Speak with our team directly',
            contact: contactInfo.phoneDisplay,
            subtext: contactInfo.businessHours.fullDisplay,
            href: `tel:${contactInfo.phoneHref}`,
        },
        {
            icon: <Mail className="h-12 w-12 fill-accent" />,
            title: 'Email',
            description: 'Send us a message anytime',
            contact: contactInfo.emailDisplay,
            subtext: `We respond within ${contactInfo.responseTime}`,
            href: `mailto:${contactInfo.emailHref}`,
        },
        {
            icon: <CalendarClock className="h-12 w-12 fill-accent" />,
            title: 'Schedule a Call',
            description: 'Book a free consultation',
            contact: 'Schedule Now',
            subtext: contactInfo.consultationDuration,
            href: '/contact',
        },
        // {
        //     icon: <SupportAgent className="h-12 w-12 fill-accent" />,
        //     title: 'Live Chat',
        //     description: 'Chat with our support team',
        //     contact: 'Start Chat',
        //     subtext: `Available ${contactInfo.supportHours}`,
        //     href: '#',
        // },
    ];

    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="mb-12 flex flex-col items-center justify-center gap-2 text-center">
                    <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Get in Touch
                    </h2>
                    <p className="text-base lg:text-lg">
                        Choose the method that works best for you
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {contactMethods.map((method, index) => (
                        <Link
                            key={index}
                            href={method.href}
                            className="flex items-center gap-x-4 rounded-xl p-6"
                        >
                            <div className="flex flex-col">
                                <div className="mb-4">{method.icon}</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 lg:text-xl">
                                    {method.title}
                                </h3>
                                <p className="mb-3 text-sm text-gray-600 lg:text-lg">
                                    {method.description}
                                </p>
                                <div className="mb-2 font-semibold text-accent">
                                    {method.contact}
                                </div>
                                <p className="text-xs text-gray-500 lg:text-sm">
                                    {method.subtext}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactMethodsGrid;
