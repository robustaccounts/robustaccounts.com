import React, { ReactNode } from 'react';

interface AccessibleIconProps {
    icon: ReactNode;
    label: string;
    decorative?: boolean;
    className?: string;
}

/**
 * Accessible Icon Wrapper
 * Ensures icons have proper ARIA labels and can be hidden from screen readers when decorative
 *
 * @example
 * <AccessibleIcon
 *   icon={<CheckIcon />}
 *   label="Verified"
 * />
 *
 * <AccessibleIcon
 *   icon={<DecorativeIcon />}
 *   decorative
 * />
 */
export default function AccessibleIcon({
    icon,
    label,
    decorative = false,
    className,
}: AccessibleIconProps) {
    if (decorative) {
        return (
            <span aria-hidden="true" className={className}>
                {icon}
            </span>
        );
    }

    return (
        <span role="img" aria-label={label} className={className}>
            {icon}
        </span>
    );
}
