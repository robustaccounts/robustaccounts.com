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
                    'fixed top-8 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-[100vw] -translate-x-1/2 transform rounded-full px-4 py-2 text-primary transition-all duration-300 md:container md:mx-auto md:w-full md:px-8',
                    isScrolled
                        ? 'bg-secondary/60 backdrop-blur-sm'
                        : 'bg-secondary',
                )}
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center justify-between object-contain"
                    >
                        <Image
                            src="/assets/logo.png"
                            alt="Robust Accounts Logo"
                            width={64}
                            height={64}
                            className="h-10 w-10 object-contain md:h-14 md:w-14"
                        />
                        <span className="text-xl font-bold sm:text-xl">
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
                                className="rounded-md px-1 font-medium transition-all hover:text-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Phone CTA: mobile shows icon, desktop shows number */}
                    <Link
                        href={`tel:${contactInfo.phoneHref}`}
                        className="inline text-primary lg:hidden"
                        aria-label={`Call us at ${contactInfo.phoneDisplay}`}
                    >
                        <Call className="h-6 w-6 fill-primary" />
                    </Link>
                    <Link
                        href={`tel:${contactInfo.phoneHref}`}
                        className="hidden text-lg font-semibold text-primary lg:inline"
                    >
                        {contactInfo.phoneDisplay}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="rounded-md p-2 transition-colors hover:text-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent lg:hidden"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMobileMenuOpen ? (
                            <Close className="h-7 w-7 fill-primary transition-transform duration-200" />
                        ) : (
                            <Menu className="h-7 w-7 fill-primary transition-transform duration-200" />
                        )}
                    </button>
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
                        transition={{ duration: 0.18 }}
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Main navigation"
                        className="fixed inset-0 top-0 z-40 h-screen w-screen bg-white p-4 backdrop-blur-sm lg:hidden"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            transition={{ duration: 0.18 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-6 z-50 rounded-full bg-white/80 p-2 text-primary shadow-md transition hover:bg-white"
                            aria-label="Close mobile menu"
                        >
                            <Close className="h-7 w-7 fill-primary" />
                        </motion.button>
                        {/* Header space */}
                        <div className="h-24"></div>
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-1 flex-col px-4"
                        >
                            <nav className="flex w-full flex-col gap-1">
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
                                            className="flex w-full items-center rounded-lg px-2 py-3 text-2xl font-bold text-primary transition-all hover:bg-primary/10 focus:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
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
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 32 }}
                            transition={{ delay: 0.18, duration: 0.22 }}
                            className="fixed right-0 bottom-0 left-0 z-50 flex w-full justify-center bg-white px-4 pt-4 pb-8"
                        >
                            <Link
                                href={`tel:${contactInfo.phoneHref}`}
                                className="text-2xl font-bold text-primary"
                            >
                                {contactInfo.phoneDisplay}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
