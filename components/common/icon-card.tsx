import React, { ReactNode } from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

interface IconCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    iconBgColor?: string;
    variant?: 'default' | 'rounded' | 'square';
    hoverEffect?: boolean;
    className?: string;
}

/**
 * Reusable Icon Card Component
 * Used for "Why Choose Us" cards, expertise cards, and similar patterns
 *
 * @example
 * <IconCard
 *   title="Expert Team"
 *   description="Access a global team of certified professionals"
 *   icon={<Check />}
 *   variant="rounded"
 *   hoverEffect
 * />
 */
export default function IconCard({
    title,
    description,
    icon,
    iconBgColor = 'bg-accent/10',
    variant = 'rounded',
    hoverEffect = true,
    className,
}: IconCardProps) {
    const shapeClasses = {
        default: 'rounded-xl',
        rounded: 'rounded-full',
        square: 'rounded-lg',
    };

    const defaultIcon = <Check className="h-6 w-6 fill-accent sm:h-7 sm:w-7" />;

    return (
        <div
            className={cn(
                'group flex items-start gap-4 p-4 sm:gap-5 sm:p-5',
                hoverEffect &&
                    'rounded-xl transition-all duration-300 hover:bg-secondary/30',
                className,
            )}
        >
            <div className="mt-1 flex-shrink-0">
                <div
                    className={cn(
                        'flex h-12 w-12 items-center justify-center shadow-sm sm:h-14 sm:w-14',
                        shapeClasses[variant],
                        iconBgColor,
                        hoverEffect &&
                            'transition-all group-hover:scale-110 group-hover:bg-accent/20',
                    )}
                >
                    {icon || defaultIcon}
                </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-lg font-bold text-primary sm:text-xl lg:text-2xl">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}
