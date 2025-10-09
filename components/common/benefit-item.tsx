import React, { ReactNode } from 'react';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

interface BenefitItemProps {
    benefit: string | ReactNode;
    icon?: ReactNode;
    iconVariant?: 'check' | 'custom';
    iconColor?: string;
    className?: string;
}

/**
 * Reusable Benefit Item Component
 * Used in benefits lists across multiple pages
 *
 * @example
 * <BenefitItem
 *   benefit="Save 40+ hours monthly on bookkeeping tasks"
 *   iconVariant="check"
 * />
 */
export default function BenefitItem({
    benefit,
    icon,
    iconVariant = 'check',
    iconColor = 'accent',
    className,
}: BenefitItemProps) {
    const renderIcon = () => {
        if (icon) return icon;
        if (iconVariant === 'check') {
            return (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Check className={cn('h-4 w-4', `fill-${iconColor}`)} />
                </div>
            );
        }
        return null;
    };

    return (
        <div className={cn('flex items-start gap-3', className)}>
            <div className="mt-1 flex-shrink-0">{renderIcon()}</div>
            <span className="text-sm leading-relaxed text-gray-700 sm:text-base">
                {benefit}
            </span>
        </div>
    );
}
