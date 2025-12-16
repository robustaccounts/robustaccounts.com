'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';
import { ArrowIcon, ChevronDownIcon, CloseIcon, MenuIcon } from '@/lib/icons';
import { NAV_LINKS, SERVICES_MEGA_MENU_ITEMS } from '@/lib/layout-constants';

import HeaderDropdown from '@/components/layout/header-dropdown';
import ServicesMegaMenu from '@/components/layout/services-mega-menu';
import { useLenis } from '@/components/providers/smooth-scroll';

const Header = () => {
    const lenisRef = useLenis();
    const prefersReducedMotion = usePrefersReducedMotion();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [closingDropdownId, setClosingDropdownId] = useState<string | null>(
        null,
    );
    const [transparentTextTone, setTransparentTextTone] = useState<
        'light' | 'dark'
    >('dark');

    const headerRef = useRef<HTMLElement>(null);
    const dropdownCloseTimeoutRef = useRef<number | null>(null);
    const headerInteractionRef = useRef(false);
    const isHiddenRef = useRef(false);
    const lockTransparentOnInitialHideRef = useRef(false);

    useEffect(() => {
        isHiddenRef.current = isHidden;
    }, [isHidden]);

    useEffect(() => {
        const lastYRef = { current: window.scrollY || 0 };
        const lastDirectionRef = { current: 'up' as 'up' | 'down' };
        const accumulatedRef = { current: 0 };
        const rafRef = { current: null as number | null };

        const update = () => {
            rafRef.current = null;

            const prevY = lastYRef.current;
            const currentY = window.scrollY || 0;
            const delta = currentY - prevY;

            lastYRef.current = currentY;

            // Always show header at the very top
            if (currentY <= 4) {
                lockTransparentOnInitialHideRef.current = false;
                accumulatedRef.current = 0;
                lastDirectionRef.current = 'up';
                setIsScrolled(false);
                isHiddenRef.current = false;
                setIsHidden(false);
                return;
            }

            const nextIsScrolled = currentY > 50;

            if (!headerInteractionRef.current && prevY <= 4 && delta > 0) {
                lockTransparentOnInitialHideRef.current = true;
            }

            const lockTransparent =
                lockTransparentOnInitialHideRef.current &&
                !headerInteractionRef.current &&
                !isHiddenRef.current;

            if (!isHiddenRef.current) {
                setIsScrolled(nextIsScrolled && !lockTransparent);
            }

            if (headerInteractionRef.current) {
                accumulatedRef.current = 0;
                lastDirectionRef.current = 'up';
                return;
            }

            // Ignore tiny scroll deltas to avoid jitter
            if (Math.abs(delta) < 0.5) return;

            const direction: 'up' | 'down' = delta > 0 ? 'down' : 'up';
            if (direction !== lastDirectionRef.current) {
                accumulatedRef.current = 0;
                lastDirectionRef.current = direction;
            }

            accumulatedRef.current += delta;

            const toggleDistance = 10;
            const hideAfterY = 40;

            if (direction === 'down') {
                if (
                    currentY > hideAfterY &&
                    accumulatedRef.current > toggleDistance
                ) {
                    lockTransparentOnInitialHideRef.current = false;
                    isHiddenRef.current = true;
                    setIsHidden(true);
                }
            } else if (accumulatedRef.current < -toggleDistance) {
                lockTransparentOnInitialHideRef.current = false;
                isHiddenRef.current = false;
                setIsScrolled(nextIsScrolled);
                setIsHidden(false);
            }
        };

        const onScroll = () => {
            if (rafRef.current !== null) return;
            rafRef.current = window.requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current !== null)
                window.cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        const isInteractive =
            isHovered ||
            isMobileMenuOpen ||
            openDropdownId !== null ||
            closingDropdownId !== null;
        headerInteractionRef.current = isInteractive;
    }, [closingDropdownId, isHovered, isMobileMenuOpen, openDropdownId]);

    useEffect(() => {
        const lenis = lenisRef?.current;
        if (!lenis) return;
        if (isMobileMenuOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [isMobileMenuOpen, lenisRef]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
                setOpenDropdownId(null);
                setClosingDropdownId(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        return () => {
            if (dropdownCloseTimeoutRef.current !== null) {
                window.clearTimeout(dropdownCloseTimeoutRef.current);
                dropdownCloseTimeoutRef.current = null;
            }
        };
    }, []);

    useGSAP(
        () => {
            if (prefersReducedMotion) return;
            if (!headerRef.current) return;

            gsap.fromTo(
                headerRef.current,
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                    clearProps: 'opacity,visibility',
                },
            );
        },
        { dependencies: [prefersReducedMotion] },
    );

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((open) => {
            const next = !open;
            if (next) {
                headerInteractionRef.current = true;
                setOpenDropdownId(null);
                setClosingDropdownId(null);
                setIsHidden(false);
            }
            return next;
        });
    };

    const openDropdown = (id: string) => {
        if (dropdownCloseTimeoutRef.current !== null) {
            window.clearTimeout(dropdownCloseTimeoutRef.current);
            dropdownCloseTimeoutRef.current = null;
        }
        headerInteractionRef.current = true;
        setIsHidden(false);
        setClosingDropdownId(null);
        setOpenDropdownId(id);
    };

    const closeDropdown = (id: string) => {
        if (openDropdownId !== id) return;

        setOpenDropdownId(null);
        setClosingDropdownId(id);

        if (dropdownCloseTimeoutRef.current !== null) {
            window.clearTimeout(dropdownCloseTimeoutRef.current);
        }

        dropdownCloseTimeoutRef.current = window.setTimeout(() => {
            setClosingDropdownId((current) =>
                current === id ? null : current,
            );
            dropdownCloseTimeoutRef.current = null;
        }, 320);
    };

    const isDropdownVisible =
        openDropdownId !== null || closingDropdownId !== null;
    const isServicesDropdownVisible =
        openDropdownId === 'services' || closingDropdownId === 'services';
    const isServicesDropdownOpen = openDropdownId === 'services';
    const isHeaderSolid =
        isScrolled || isMobileMenuOpen || isHovered || isDropdownVisible;
    const isHeaderForcedVisible =
        isMobileMenuOpen || isHovered || isDropdownVisible;
    const headerMotionClass = prefersReducedMotion
        ? ''
        : 'duration-300 ease-[var(--ease-custom)]';
    const headerBorderClass = isHeaderSolid
        ? isDropdownVisible
            ? 'border-b border-transparent'
            : 'border-b border-gray-100'
        : 'border-b border-transparent';

    const headerClasses = `fixed top-0 left-0 right-0 z-50 transform-gpu will-change-transform transition-[transform,background-color,border-color,box-shadow] ${headerMotionClass} ${
        isHidden && !isHeaderForcedVisible
            ? '-translate-y-full'
            : 'translate-y-0'
    } ${
        isHeaderSolid ? 'bg-white py-3' : 'bg-white lg:bg-transparent py-3'
    } ${headerBorderClass}`;

    const textColorClass = isHeaderSolid
        ? 'text-[var(--color-theme-black)]'
        : transparentTextTone === 'light'
          ? 'text-[var(--color-theme-black)] lg:text-white'
          : 'text-[var(--color-theme-black)]';
    const navItemClass = `text-base font-medium hover:text-primary transition-colors ${
        headerMotionClass || 'duration-300'
    } ${textColorClass}`;

    useEffect(() => {
        if (isHeaderSolid) return;
        if (!headerRef.current) return;

        const compute = () => {
            const headerEl = headerRef.current;
            if (!headerEl) return;

            const rect = headerEl.getBoundingClientRect();
            const x = Math.round(rect.left + rect.width / 2);
            const y = Math.round(rect.top + rect.height / 2);

            const elements = document.elementsFromPoint(x, y);
            const underHeader = elements.find(
                (el) => !headerEl.contains(el),
            ) as HTMLElement | undefined;

            if (!underHeader) {
                setTransparentTextTone('dark');
                return;
            }

            const marked =
                underHeader.closest<HTMLElement>('[data-header-tone]');
            if (marked?.dataset.headerTone === 'dark') {
                setTransparentTextTone('light');
                return;
            }
            if (marked?.dataset.headerTone === 'light') {
                setTransparentTextTone('dark');
                return;
            }

            const inferred = inferToneFromElement(underHeader);
            setTransparentTextTone(inferred === 'dark' ? 'light' : 'dark');
        };

        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, [isHeaderSolid]);

    return (
        <header
            id="site-header"
            ref={headerRef}
            className={headerClasses}
            onPointerEnter={() => {
                headerInteractionRef.current = true;
                setIsHovered(true);
                setIsHidden(false);
            }}
            onPointerLeave={() => setIsHovered(false)}
        >
            <div className="cust-container relative z-70 flex h-full items-center justify-between">
                {/* LEFT: LOGO */}
                <div className="shrink-0">
                    <Link href="/" className="flex items-center gap-1">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Robust Accounts Logo"
                                    width={64}
                                    height={64}
                                    className="h-9 w-9 object-contain sm:h-10 sm:w-10 md:h-11 md:w-11"
                                />
                                <span
                                    className={`text-xl font-extrabold tracking-tight transition-colors ${textColorClass}`}
                                >
                                    Robust Accounts
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* CENTER: NAVIGATION */}
                <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
                    {NAV_LINKS.map((link) =>
                        link.label === 'Services' ? (
                            <HeaderDropdown
                                key={link.href}
                                open={openDropdownId === 'services'}
                                onOpen={() => openDropdown('services')}
                                onClose={() => closeDropdown('services')}
                                className="py-4"
                                trigger={
                                    <Link
                                        href={link.href}
                                        className={`${navItemClass} flex items-center gap-1`}
                                        aria-haspopup="menu"
                                        aria-expanded={
                                            openDropdownId === 'services'
                                                ? 'true'
                                                : 'false'
                                        }
                                    >
                                        {link.label}
                                        <ChevronDownIcon
                                            className={`transition-transform ${headerMotionClass} ${
                                                openDropdownId === 'services'
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </Link>
                                }
                            >
                                {/* COMPONENT: SERVICES DROPDOWN */}
                                {isServicesDropdownVisible ? (
                                    <div
                                        {...(isServicesDropdownOpen
                                            ? {}
                                            : { 'aria-hidden': 'true' })}
                                        className={`absolute top-full right-0 left-0 z-40 origin-top transform-gpu border-b border-gray-100 bg-white transition-[opacity,transform] ${headerMotionClass} ${
                                            isServicesDropdownOpen
                                                ? 'pointer-events-auto translate-y-0 opacity-100'
                                                : 'pointer-events-none -translate-y-2 opacity-0'
                                        }`}
                                    >
                                        <ServicesMegaMenu
                                            onNavigate={() =>
                                                setOpenDropdownId(null)
                                            }
                                        />
                                    </div>
                                ) : null}
                            </HeaderDropdown>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={navItemClass}
                            >
                                {link.label}
                            </Link>
                        ),
                    )}
                </nav>

                {/* RIGHT: CONTACT BUTTON */}
                <div className="hidden items-center lg:flex">
                    <Link
                        href="/contact"
                        className={`flex cursor-pointer items-center gap-2 px-5 py-2 text-base font-medium transition-[color,border-color,background-color] ${headerMotionClass} ${
                            isHeaderSolid || transparentTextTone === 'dark'
                                ? 'text-theme-black hover:text-primary'
                                : 'text-white'
                        }`}
                    >
                        <span>Contact</span>
                        <span className="flex h-6 w-6 items-center justify-center bg-primary">
                            <ArrowIcon size={16} className="text-white" />
                        </span>
                    </Link>
                </div>

                {/* MOBILE MENU TOGGLE */}
                <button
                    onClick={toggleMobileMenu}
                    className={`relative z-70 p-2 lg:hidden ${
                        isMobileMenuOpen ? 'text-theme-black' : textColorClass
                    }`}
                    aria-label="Toggle Menu"
                    {...{
                        'aria-expanded': isMobileMenuOpen ? 'true' : 'false',
                    }}
                    aria-controls="mobile-menu"
                >
                    {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* MOBILE MENU OVERLAY */}
            {isMobileMenuOpen && (
                <div
                    id="mobile-menu"
                    className="fixed top-0 right-0 bottom-0 left-0 z-[60] flex flex-col bg-white lg:hidden"
                    style={{ minHeight: '100vh' }}
                >
                    {/* Spacer for header */}
                    <div className="h-20" />

                    {/* Navigation Links */}
                    <nav className="flex flex-1 flex-col gap-0 overflow-y-auto px-8">
                        {NAV_LINKS.map((link) =>
                            link.label === 'Services' ? (
                                <div
                                    key={link.href}
                                    className="border-b border-gray-100"
                                >
                                    {/* Services Accordion Header */}
                                    <button
                                        onClick={() =>
                                            setIsMobileServicesOpen(
                                                !isMobileServicesOpen,
                                            )
                                        }
                                        className="flex w-full items-center justify-between py-5 text-xl font-bold text-theme-black transition-colors hover:text-primary"
                                    >
                                        <span>{link.label}</span>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </button>
                                    {/* Services Sub-items */}
                                    {isMobileServicesOpen && (
                                        <div className="pb-4">
                                            {SERVICES_MEGA_MENU_ITEMS.map(
                                                (item) => (
                                                    <Link
                                                        key={item.id}
                                                        href={item.href}
                                                        onClick={() => {
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            );
                                                            setIsMobileServicesOpen(
                                                                false,
                                                            );
                                                        }}
                                                        className="block py-3 pl-4 text-base text-gray-600 transition-colors hover:text-primary"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="border-b border-gray-100 py-5 text-xl font-bold text-theme-black transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ),
                        )}
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="border-b border-gray-100 py-5 text-xl font-bold text-theme-black transition-colors hover:text-primary"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Bottom CTA */}
                    <div className="p-8 pb-12">
                        <Link
                            href="/lead-form/schedule"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="btn-div w-full justify-center uppercase"
                        >
                            <span className="text-box w-full">Get Started</span>
                            <span className="icon-box">
                                <ArrowIcon size={14} className="text-white" />
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

function inferToneFromElement(el: HTMLElement) {
    let current: HTMLElement | null = el;
    for (let i = 0; i < 12 && current; i += 1) {
        const styles = window.getComputedStyle(current);
        if (
            styles.backgroundImage &&
            styles.backgroundImage !== 'none' &&
            styles.backgroundImage.includes('url(')
        ) {
            return 'dark';
        }

        const bg = styles.backgroundColor;
        const rgba = parseRgb(bg);
        if (rgba && rgba.a > 0.02) {
            const luminance = relativeLuminance(rgba.r, rgba.g, rgba.b);
            return luminance >= 0.62 ? 'light' : 'dark';
        }

        current = current.parentElement;
    }

    return 'light';
}

function parseRgb(input: string) {
    if (!input) return null;
    if (input === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };

    const match = input.match(/rgba?\(([^)]+)\)/);
    if (!match) return null;

    const parts = match[1]?.split(',').map((s) => s.trim());
    if (!parts || parts.length < 3) return null;

    const r = Number(parts[0]);
    const g = Number(parts[1]);
    const b = Number(parts[2]);
    const a = parts.length >= 4 ? Number(parts[3]) : 1;

    if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
    return { r, g, b, a };
}

function relativeLuminance(r: number, g: number, b: number) {
    const srgb = [r, g, b].map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0]! + 0.7152 * srgb[1]! + 0.0722 * srgb[2]!;
}
