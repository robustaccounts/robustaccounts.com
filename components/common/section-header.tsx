import React from 'react';

import cn from '@/utils/cn';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    align?: 'left' | 'center' | 'right';
    showAccent?: boolean;
}

/**
 * Reusable Section Header Component
 * Used across all pages for consistent section titles and descriptions
 *
 * @example
 * <SectionHeader
 *   badge="Our Services"
 *   title="Complete Accounting Solutions"
 *   subtitle="Everything you need to manage your business finances"
 *   align="center"
 * />
 */
export default function SectionHeader({
    title,
    subtitle,
    badge,
    titleClassName,
    subtitleClassName,
    align = 'center',
    showAccent = true,
}: SectionHeaderProps) {
    const alignmentClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    };

    return (
        <div
            className={cn(
                'flex flex-col gap-6 sm:gap-8',
                alignmentClasses[align],
            )}
        >
            {badge && (
                <div
                    className={cn(
                        'inline-flex w-max items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium backdrop-blur-sm',
                        align !== 'center' && 'self-start',
                    )}
                >
                    {showAccent && (
                        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    )}
                    <span className="text-gray-700">{badge}</span>
                </div>
            )}

            <h2
                className={cn(
                    'text-2xl font-bold sm:text-3xl lg:text-4xl',
                    titleClassName,
                )}
            >
                {title}
            </h2>

            {subtitle && (
                <p
                    className={cn(
                        'max-w-3xl text-base leading-relaxed sm:text-lg',
                        subtitleClassName || 'text-gray-600',
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
