import React from 'react';

import cn from '@/utils/cn';

interface Stat {
    number: string;
    label: string;
}

interface StatsGridProps {
    stats: Stat[];
    columns?: 2 | 3 | 4;
    variant?: 'default' | 'accent' | 'outlined';
    className?: string;
}

/**
 * Reusable Stats Grid Component
 * Used for displaying statistics across multiple pages
 *
 * @example
 * <StatsGrid
 *   stats={[
 *     { number: '500+', label: 'Satisfied Clients' },
 *     { number: '15+', label: 'Years Experience' },
 *     { number: '99.9%', label: 'Accuracy Rate' }
 *   ]}
 *   columns={3}
 *   variant="accent"
 * />
 */
export default function StatsGrid({
    stats,
    columns = 4,
    variant = 'default',
    className,
}: StatsGridProps) {
    const colClasses = {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-4',
    };

    const variantClasses = {
        default: {
            number: 'text-accent',
            label: 'text-gray-600',
        },
        accent: {
            number: 'text-accent',
            label: 'text-gray-600',
        },
        outlined: {
            number: 'text-primary',
            label: 'text-gray-600',
        },
    };

    return (
        <div
            className={cn(
                'grid gap-8 text-center',
                colClasses[columns],
                className,
            )}
        >
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={cn(
                        'flex flex-col items-center justify-center',
                        variant === 'outlined' &&
                            'rounded-xl bg-white p-6 shadow-sm',
                    )}
                >
                    <div
                        className={cn(
                            'text-2xl font-bold sm:text-3xl',
                            variantClasses[variant].number,
                        )}
                    >
                        {stat.number}
                    </div>
                    <div
                        className={cn(
                            'text-sm sm:text-base',
                            variantClasses[variant].label,
                        )}
                    >
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
