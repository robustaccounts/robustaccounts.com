'use client';

import { useModal } from '@/contexts/modal-context';
import contactInfo from '@/data/contact-info';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Call, Close, Menu } from '@/ui/icons/google-icons';
import Link from '@/ui/link';

import cn from '@/utils/cn';

const mobileMenuLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Accounting Services', href: '/accounting-services' },
    { name: 'Non-Profit & Church', href: '/nonprofit-accounting' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Our Expertise', href: '/our-expertise' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
];

const menuVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
    exit: { opacity: 0, y: 16, transition: { duration: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.22 },
    },
    exit: { opacity: 0, x: 24, transition: { duration: 0.12 } },
};

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isSchedulingModalOpen } = useModal();
    const mobileMenuRef = React.useRef<HTMLDivElement | null>(null);
    const firstMobileLinkRef = React.useRef<HTMLAnchorElement | null>(null);

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            // Focus first link for accessibility
            setTimeout(() => {
                firstMobileLinkRef.current?.focus();
            }, 0);
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    // Close on Escape and trap focus inside mobile menu
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
                return;
            }
            if (e.key === 'Tab' && mobileMenuRef.current) {
                const focusable =
                    mobileMenuRef.current.querySelectorAll<HTMLElement>(
                        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
                    );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                const active = document.activeElement as HTMLElement | null;
                if (e.shiftKey) {
                    if (active === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (active === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);

    if (isSchedulingModalOpen) {
        return null;
    }

    return (
        <>
            <header
                className={cn(
                    'fixed top-4 left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-[100vw] -translate-x-1/2 transform rounded-full px-4 py-2.5 text-primary shadow-sm transition-all duration-300 sm:top-6 sm:w-[calc(100vw-2rem)] md:top-8 md:container md:mx-auto md:w-full md:px-8 md:py-3',
                    isScrolled
                        ? 'bg-secondary/95 shadow-md backdrop-blur-md'
                        : 'bg-secondary',
                )}
            >
                <div className="flex items-center justify-between gap-2">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2 object-contain sm:gap-2.5"
                    >
                        <Image
                            src="/assets/logo.png"
                            alt="Robust Accounts Logo"
                            width={64}
                            height={64}
                            className="h-9 w-9 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12"
                        />
                        <span className="text-base font-bold sm:text-lg md:text-xl">
                            Robust Accounts
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
                        {[
                            { name: 'Services', href: '/services' },
                            { name: 'About', href: '/about' },

                            { name: 'How It Works', href: '/how-it-works' },
                            {
                                name: 'Our Expertise',
                                href: '/our-expertise',
                            },
                            { name: 'Pricing', href: '/pricing' },
                            { name: 'Blog', href: '/blog' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="rounded-md px-1 font-medium transition-all hover:text-primary/60 focus-visible:outline-2 focus-visible:outline-accent"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Phone CTA: mobile shows icon, desktop shows number */}
                        <Link
                            href={`tel:${contactInfo.phoneHref}`}
                            className="inline rounded-full p-2 text-primary transition-colors hover:bg-accent/10 lg:hidden"
                            aria-label={`Call us at ${contactInfo.phoneDisplay}`}
                        >
                            <Call className="h-5 w-5 fill-primary sm:h-6 sm:w-6" />
                        </Link>
                        <Link
                            href={`tel:${contactInfo.phoneHref}`}
                            className="hidden text-base font-semibold text-primary transition-colors hover:text-accent lg:inline lg:text-lg"
                        >
                            {contactInfo.phoneDisplay}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="rounded-full p-2 transition-colors hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-accent lg:hidden"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMobileMenuOpen ? (
                                <Close className="h-6 w-6 fill-primary transition-transform duration-200 sm:h-7 sm:w-7" />
                            ) : (
                                <Menu className="h-6 w-6 fill-primary transition-transform duration-200 sm:h-7 sm:w-7" />
                            )}
                        </button>
                    </div>
                </div>
            </header>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        key="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Main navigation"
                        className="fixed inset-0 top-0 z-40 h-screen w-screen overflow-y-auto bg-white p-5 lg:hidden"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 z-50 rounded-full bg-accent/10 p-2.5 text-primary shadow-sm transition hover:bg-accent/20"
                            aria-label="Close mobile menu"
                        >
                            <Close className="h-6 w-6 fill-primary" />
                        </motion.button>
                        {/* Header space */}
                        <div className="h-20"></div>
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-1 flex-col px-2"
                        >
                            <nav className="flex w-full flex-col gap-2">
                                {mobileMenuLinks.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        variants={itemVariants}
                                    >
                                        <Link
                                            href={item.href}
                                            ref={
                                                item.name === 'Home'
                                                    ? firstMobileLinkRef
                                                    : undefined
                                            }
                                            className="flex w-full items-center rounded-xl px-4 py-4 text-xl font-bold text-primary transition-all hover:bg-accent/10 focus:bg-accent/10 focus-visible:outline-2 focus-visible:outline-accent active:scale-95"
                                            style={{
                                                justifyContent: 'flex-start',
                                            }}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.2, duration: 0.25 }}
                            className="fixed right-0 bottom-0 left-0 z-50 flex w-full justify-center border-t border-gray-200 bg-white px-5 pt-5 pb-8 shadow-lg"
                        >
                            <Link
                                href={`tel:${contactInfo.phoneHref}`}
                                className="flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:bg-accent/90 active:scale-95"
                            >
                                <Call className="h-6 w-6 fill-white" />
                                {contactInfo.phoneDisplay}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
