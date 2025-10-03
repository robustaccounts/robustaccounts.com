'use client';

import contactInfo from '@/data/contact-info';

import Link from 'next/link';
import React from 'react';

import { ArrowForward } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

interface ScheduleMyCallButtonProps {
    className?: string;
    showSubtext?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary';
    subTextClassName?: string;
}

export default function ScheduleMyCallButton({
    className,
    showSubtext = true,
    size = 'lg',
    variant = 'primary',
    subTextClassName,
}: ScheduleMyCallButtonProps) {
    const sizeClasses = {
        sm: 'pl-1 pr-3 py-1 text-xs sm:text-sm',
        md: 'pl-1 pr-3 py-1 text-sm sm:text-base',
        lg: 'pl-1 pr-3 py-1 text-sm sm:text-base md:text-lg',
    };

    const iconSizes = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };

    const iconPadding = {
        sm: 'p-1.5 sm:p-2',
        md: 'p-2 sm:p-2.5',
        lg: 'p-2 sm:p-2.5 md:p-3',
    };

    const variantClasses = {
        primary: 'bg-accent hover:bg-accent/80 text-white',
        secondary: 'bg-white hover:bg-gray-100 text-accent',
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <Link
                href="/lead-form/schedule"
                className={cn(
                    'flex cursor-pointer items-center justify-start gap-2 rounded-full font-semibold backdrop-blur-2xl transition-all sm:w-auto',
                    sizeClasses[size],
                    variantClasses[variant],
                    className,
                )}
            >
                <div
                    className={cn(
                        'rounded-full',
                        iconPadding[size],
                        variant === 'primary' ? 'bg-white' : 'bg-accent',
                    )}
                >
                    <ArrowForward
                        className={cn(
                            iconSizes[size],
                            variant === 'primary'
                                ? 'fill-accent'
                                : 'fill-white',
                        )}
                    />
                </div>
                <span className="font-semibold whitespace-nowrap">
                    Schedule My Free Consultation
                </span>
            </Link>
            {showSubtext && (
                <p
                    className={cn(
                        'text-center text-xs text-white sm:text-left sm:text-sm',
                        subTextClassName,
                    )}
                >
                    No credit card required • {contactInfo.consultationDuration}
                </p>
            )}
        </div>
    );
}
