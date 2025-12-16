'use client';

import siteConfig from '@/siteconfig';
import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { CalendarClock, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

const { contactInfo } = siteConfig;

const contactMethods = [
    {
        icon: Phone,
        title: 'Phone',
        description: 'Speak with our team directly',
        contact: contactInfo.phoneDisplay,
        subtext: contactInfo.businessHours.fullDisplay,
        href: `tel:${contactInfo.phoneHref}`,
    },
    {
        icon: Mail,
        title: 'Email',
        description: 'Send us a message anytime',
        contact: contactInfo.emailDisplay,
        subtext: `We respond within ${contactInfo.responseTime}`,
        href: `mailto:${contactInfo.emailHref}`,
    },
    {
        icon: CalendarClock,
        title: 'Schedule a Call',
        description: 'Book a free consultation',
        contact: 'Schedule Now',
        subtext: contactInfo.consultationDuration,
        href: '/lead-form/schedule?source=contact',
    },
];

export default function ContactMethodsGrid() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const cards = gsap.utils.toArray<HTMLElement>('.contact-card');

            gsap.fromTo(
                cards,
                { autoAlpha: 0, y: 20 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 95%',
                        once: true,
                    },
                },
            );
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] },
    );

    return (
        <section ref={sectionRef} className="bg-theme-offwhite py-20 lg:py-28">
            <div className="cust-container">
                <div className="mb-16">
                    <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
                        Reach Out
                    </span>
                    <h2 className="mb-4 text-4xl leading-[1.05] font-light tracking-tight text-theme-black md:text-5xl">
                        Get in Touch
                    </h2>
                    <p className="max-w-lg text-base text-gray-600">
                        Choose the method that works best for you
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {contactMethods.map((method, index) => (
                        <Link
                            key={index}
                            href={method.href}
                            className="contact-card group border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-lg"
                        >
                            <div className="contact-icon-box mb-6 flex h-12 w-12 items-center justify-center bg-primary/10 transition-colors group-hover:bg-primary">
                                <method.icon className="contact-icon h-6 w-6 text-primary transition-colors" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-theme-black transition-colors group-hover:text-primary">
                                {method.title}
                            </h3>
                            <p className="mb-4 text-sm text-gray-600">
                                {method.description}
                            </p>
                            <p className="mb-2 text-lg font-semibold text-primary">
                                {method.contact}
                            </p>
                            <p className="text-xs text-gray-500">
                                {method.subtext}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
