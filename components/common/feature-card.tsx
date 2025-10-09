import React, { ReactNode } from 'react';

import cn from '@/utils/cn';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    variant?: 'default' | 'hover-accent' | 'filled';
    className?: string;
}

/**
 * Reusable Feature Card Component
 * Used in features sections across bookkeeping, payroll, financial-advisory, etc.
 *
 * @example
 * <FeatureCard
 *   title="Daily Transaction Recording"
 *   description="Accurate recording of all business transactions"
 *   variant="hover-accent"
 * />
 */
export default function FeatureCard({
    title,
    description,
    icon,
    variant = 'hover-accent',
    className,
}: FeatureCardProps) {
    const variantClasses = {
        default:
            'bg-secondary hover:bg-secondary/80 text-gray-900 hover:shadow-md',
        'hover-accent':
            'bg-secondary hover:bg-accent text-gray-900 hover:text-white hover:shadow-lg',
        filled: 'bg-accent text-white shadow-md hover:shadow-lg hover:scale-[1.02]',
    };

    return (
        <div
            className={cn(
                'group cursor-pointer rounded-2xl p-6 transition-all duration-300 sm:p-8',
                variantClasses[variant],
                className,
            )}
        >
            {icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-transform group-hover:scale-110">
                    {icon}
                </div>
            )}
            <h3
                className={cn(
                    'mb-3 text-lg font-semibold sm:text-xl',
                    variant === 'hover-accent' &&
                        'text-gray-900 group-hover:text-white',
                    variant === 'default' && 'text-gray-900',
                    variant === 'filled' && 'text-white',
                )}
            >
                {title}
            </h3>
            <p
                className={cn(
                    'text-sm leading-relaxed sm:text-base',
                    variant === 'hover-accent' &&
                        'text-gray-600 group-hover:text-white',
                    variant === 'default' && 'text-gray-600',
                    variant === 'filled' && 'text-white/90',
                )}
            >
                {description}
            </p>
        </div>
    );
}
