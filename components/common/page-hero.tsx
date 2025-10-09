'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

import ScheduleMyCallButton from '../ui/schedule-my-call-button';

interface PageHeroProps {
    title: string | ReactNode;
    subtitle?: string;
    badge?: string;
    trustIndicators?: string[];
    stats?: Array<{ number: string; label: string }>;
    showCTA?: boolean;
    ctaText?: string;
    ctaHref?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    textColor?: 'light' | 'dark';
    minHeight?: string;
    children?: ReactNode;
}

/**
 * Reusable Page Hero Component
 * Consolidates 28+ hero sections into one flexible component
 *
 * @example
 * <PageHero
 *   badge="Professional Services"
 *   title="Expert Bookkeeping & Accounting"
 *   subtitle="Keep your financial records accurate and up-to-date"
 *   trustIndicators={['U.S.-Based', 'Certified', 'Secure']}
 *   stats={[{ number: '500+', label: 'Clients' }]}
 *   showCTA
 * />
 */
export default function PageHero({
    title,
    subtitle,
    badge,
    trustIndicators,
    stats,
    showCTA = true,
    ctaText = 'Get Started',
    ctaHref,
    backgroundImage = '/assets/images/hero-section-bg-2.png',
    backgroundColor,
    textColor = 'light',
    minHeight = 'min-h-screen',
    children,
}: PageHeroProps) {
    const hasBackground = Boolean(backgroundImage || backgroundColor);
    const textColorClass =
        textColor === 'light' ? 'text-white' : 'text-gray-900';

    return (
        <section
            className={cn(
                'hero-section relative flex w-full flex-col items-center justify-center',
                minHeight,
                !hasBackground && 'bg-white',
            )}
            style={
                backgroundColor && !backgroundImage
                    ? { backgroundColor }
                    : undefined
            }
        >
            {/* Background Image */}
            {backgroundImage && (
                <>
                    <Image
                        src={backgroundImage}
                        alt=""
                        fill
                        priority={false}
                        className="object-cover"
                        aria-hidden="true"
                    />
                    {/* Overlay for better text contrast */}
                    <div
                        className="absolute inset-0 z-10 bg-black/70"
                        aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                </>
            )}

            {/* Content Container */}
            <div
                className={cn(
                    'relative z-20 flex w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
                    minHeight,
                )}
            >
                {badge && (
                    <div className="flex flex-col items-center gap-8 pt-8">
                        <div className="mt-8 inline-flex w-max items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                            <span className="text-gray-700">{badge}</span>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex flex-col justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4xl">
                    <h1
                        className={cn(
                            'text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl',
                            textColorClass,
                        )}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            className={cn(
                                'text-center text-base leading-relaxed sm:text-lg lg:text-xl',
                                textColor === 'light'
                                    ? 'text-white/90'
                                    : 'text-gray-600',
                            )}
                        >
                            {subtitle}
                        </p>
                    )}

                    {/* CTA Buttons */}
                    {showCTA && (
                        <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
                            {ctaHref ? (
                                <a
                                    href={ctaHref}
                                    className="inline-flex w-xs cursor-pointer items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent/90"
                                >
                                    {ctaText}
                                </a>
                            ) : (
                                <ScheduleMyCallButton
                                    className="w-xs"
                                    size="lg"
                                    showSubtext={false}
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Trust Indicators */}
                {trustIndicators && trustIndicators.length > 0 && (
                    <div className="grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
                        {trustIndicators.map((indicator, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-2"
                            >
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                                    <Check className="h-3 w-3 fill-white" />
                                </div>
                                <span
                                    className={cn(
                                        'text-sm font-medium',
                                        textColorClass,
                                    )}
                                >
                                    {indicator}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats */}
                {stats && stats.length > 0 && (
                    <div className="flex flex-col items-center gap-4 py-12">
                        <div
                            className={cn(
                                'grid gap-8 text-center',
                                stats.length === 3 && 'grid-cols-3',
                                stats.length === 4 &&
                                    'grid-cols-2 sm:grid-cols-4',
                                stats.length === 2 && 'grid-cols-2',
                            )}
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <div
                                        className={cn(
                                            'text-2xl font-bold sm:text-3xl',
                                            textColor === 'light'
                                                ? 'text-accent'
                                                : 'text-primary',
                                        )}
                                    >
                                        {stat.number}
                                    </div>
                                    <div
                                        className={cn(
                                            'text-sm sm:text-base',
                                            textColor === 'light'
                                                ? 'text-white/80'
                                                : 'text-gray-600',
                                        )}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Custom Children */}
                {children}
            </div>
        </section>
    );
}
