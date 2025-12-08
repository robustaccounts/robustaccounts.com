'use client';

import siteConfig from '@/siteconfig';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Link from '@/ui/link';

import cn from '@/utils/cn';

// Navigation Data Structure
interface NavItem {
    name: string;
    href: string;
    description?: string;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    {
        name: 'Services',
        href: '/services',
        children: [
            {
                name: 'Bookkeeping',
                href: '/services/bookkeeping',
                description: 'Accurate financial records',
            },
            {
                name: 'Payroll',
                href: '/services/payroll',
                description: 'Complete payroll processing',
            },
            {
                name: 'Financial Advisory',
                href: '/services/financial-advisory',
                description: 'Strategic financial guidance',
            },
        ],
    },
    {
        name: 'About',
        href: '/about',
        children: [
            {
                name: 'Company',
                href: '/about',
                description: 'Our mission, vision & values',
            },
            {
                name: 'How It Works',
                href: '/how-it-works',
                description: 'Our streamlined process',
            },
            {
                name: 'Our Expertise',
                href: '/our-expertise',
                description: 'Industries we serve',
            },
        ],
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
];

// Add 'Contact' to mobile menu specifically if needed, but it's usually separate or at bottom
const mobileNavItems: NavItem[] = [
    { name: 'Home', href: '/' },
    ...navItems,
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

// Generic Dropdown Component
function NavDropdown({
    item,
    activeDropdown,
    setActiveDropdown,
}: {
    item: NavItem;
    activeDropdown: string | null;
    setActiveDropdown: (name: string | null) => void;
}) {
    const isOpen = activeDropdown === item.name;
    const dropdownRef = useRef<HTMLDivElement>(null);
    let timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveDropdown(item.name);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150); // slight delay to prevent flickering
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={cn(
                    'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent',
                    isOpen && 'bg-gray-100 text-accent',
                )}
                onClick={() => setActiveDropdown(isOpen ? null : item.name)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {item.name}
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isOpen && 'rotate-180',
                    )}
                />
            </button>
            <AnimatePresence>
                {isOpen && item.children && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 z-50 mt-2 w-64 -translate-x-1/2 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5"
                    >
                        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
                        <div className="relative flex flex-col gap-1">
                            {item.children.map((child) => (
                                <Link
                                    key={child.name}
                                    href={child.href}
                                    className="group flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/5"
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    <span className="font-medium text-primary group-hover:text-accent">
                                        {child.name}
                                    </span>
                                    {child.description && (
                                        <span className="text-xs text-gray-500">
                                            {child.description}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Header() {
    const { contactInfo, firm } = siteConfig;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

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
            // Focus trap logic can be extensive, simplified here for length
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);

    const toggleMobileExpand = (name: string) => {
        setExpandedMobileItems((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name],
        );
    };

    return (
        <>
            <header
                className={cn(
                    'fixed top-4 left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-[100vw] -translate-x-1/2 transform rounded-full px-4 py-3 text-primary transition-all duration-300 sm:top-6 sm:w-[calc(100vw-2rem)] md:top-8 md:container md:mx-auto md:w-full md:px-6',
                    'bg-white/90 backdrop-blur-xl shadow-lg ring-1 ring-black/5 supports-[backdrop-filter]:bg-white/60',
                    isScrolled && 'py-2.5 shadow-xl sm:py-2.5',
                )}
            >
                <div className="flex items-center justify-between gap-2">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2 object-contain transition-opacity hover:opacity-80 sm:gap-2.5"
                    >
                        <Image
                            src="/assets/logo.png"
                            alt={`${firm.name} Logo`}
                            width={64}
                            height={64}
                            className="h-9 w-9 object-contain sm:h-10 sm:w-10 md:h-11 md:w-11"
                        />
                        <span className="text-base font-bold sm:text-lg md:text-xl">
                            {firm.name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) =>
                            item.children ? (
                                <NavDropdown
                                    key={item.name}
                                    item={item}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                                >
                                    {item.name}
                                </Link>
                            ),
                        )}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
                        {/* Desktop Phone Number */}
                        <Link
                            href={`tel:${contactInfo.phoneHref}`}
                            className="hidden text-sm font-semibold text-gray-700 transition-colors hover:text-accent lg:block"
                        >
                            {contactInfo.phoneDisplay}
                        </Link>

                        {/* Desktop CTA Button */}
                        <Link
                            href="/lead-form"
                            className="hidden rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent/90 hover:shadow-md active:scale-95 lg:inline-flex"
                        >
                            Get Started
                        </Link>

                        {/* Phone CTA: mobile shows icon */}
                        <Link
                            href={`tel:${contactInfo.phoneHref}`}
                            className="inline rounded-full p-2 text-primary transition-colors hover:bg-accent/10 lg:hidden"
                            aria-label={`Call us at ${contactInfo.phoneDisplay}`}
                        >
                            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
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
                                <X className="h-6 w-6 transition-transform duration-200 sm:h-7 sm:w-7" />
                            ) : (
                                <Menu className="h-6 w-6 transition-transform duration-200 sm:h-7 sm:w-7" />
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
                        className="fixed inset-0 top-0 z-[100] h-screen w-screen overflow-y-auto bg-white p-5 lg:hidden"
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
                            <X className="h-6 w-6" />
                        </motion.button>
                        {/* Header space */}
                        <div className="h-20"></div>
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-1 flex-col px-2 pb-48"
                        >
                            <nav className="flex w-full flex-col gap-1">
                                {mobileNavItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        variants={itemVariants}
                                    >
                                        {item.children ? (
                                            <div className="flex flex-col">
                                                <button
                                                    ref={
                                                        index === 0
                                                            ? (el) => {
                                                                  if (el)
                                                                      firstMobileLinkRef.current =
                                                                          el as unknown as HTMLAnchorElement;
                                                               }
                                                            : undefined
                                                    }
                                                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-lg font-bold text-primary transition-all hover:bg-accent/10 focus:bg-accent/10 focus-visible:outline-2 focus-visible:outline-accent"
                                                    onClick={() =>
                                                        toggleMobileExpand(
                                                            item.name,
                                                        )
                                                    }
                                                    aria-expanded={expandedMobileItems.includes(
                                                        item.name,
                                                    )}
                                                >
                                                    {item.name}
                                                    <ChevronDown
                                                        className={cn(
                                                            'h-5 w-5 transition-transform duration-200',
                                                            expandedMobileItems.includes(
                                                                item.name,
                                                            ) && 'rotate-180',
                                                        )}
                                                    />
                                                </button>
                                                <AnimatePresence>
                                                    {expandedMobileItems.includes(
                                                        item.name,
                                                    ) && (
                                                        <motion.div
                                                            initial={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                height: 'auto',
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="flex flex-col gap-1 py-1 pl-4">
                                                                <Link
                                                                    href={item.href}
                                                                    className="flex flex-col gap-0.5 rounded-lg px-4 py-2.5 transition-colors hover:bg-accent/5"
                                                                    onClick={() =>
                                                                        setIsMobileMenuOpen(
                                                                            false,
                                                                        )
                                                                    }
                                                                >
                                                                    <span className="font-semibold text-accent">
                                                                        View All {item.name}
                                                                    </span>
                                                                </Link>
                                                                {item.children.map(
                                                                    (child) => (
                                                                        <Link
                                                                            key={
                                                                                child.name
                                                                            }
                                                                            href={
                                                                                child.href
                                                                            }
                                                                            className="flex flex-col gap-0.5 rounded-lg px-4 py-2.5 transition-colors hover:bg-accent/5"
                                                                            onClick={() =>
                                                                                setIsMobileMenuOpen(
                                                                                    false,
                                                                                )
                                                                            }
                                                                        >
                                                                            <span className="font-medium text-primary">
                                                                                {
                                                                                    child.name
                                                                                }
                                                                            </span>
                                                                            {child.description && (
                                                                                <span className="text-xs text-gray-500">
                                                                                    {
                                                                                        child.description
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                        </Link>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                ref={
                                                    item.name === 'Home'
                                                        ? firstMobileLinkRef
                                                        : undefined
                                                }
                                                className="flex w-full items-center rounded-xl px-4 py-3.5 text-lg font-bold text-primary transition-all hover:bg-accent/10 focus:bg-accent/10 focus-visible:outline-2 focus-visible:outline-accent active:scale-95"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.2, duration: 0.25 }}
                            className="fixed right-0 bottom-0 left-0 z-50 flex w-full flex-col gap-3 border-t border-gray-100 bg-white px-5 pt-4 pb-8 shadow-lg"
                        >
                            <Link
                                href="/contact"
                                className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:bg-accent/90 active:scale-95"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                            <Link
                                href={`tel:${contactInfo.phoneHref}`}
                                className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-primary transition-all hover:bg-gray-50 active:scale-95"
                            >
                                <Phone className="h-5 w-5" />
                                {contactInfo.phoneDisplay}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
