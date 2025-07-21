'use client';

import * as React from 'react';

import cn from '@/utils/cn';

import { Check } from './icons/google-icons';

export interface CheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    name?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked = false,
    onChange,
    name,
    disabled = false,
    error,
    className,
}) => {
    const handleChange = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleChange();
        }
    };

    const inputId = name
        ? `${name}-input`
        : `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={cn('group flex items-start gap-3 sm:gap-4', className)}>
            <div
                className={cn(
                    'relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 transition-all group-hover:border-accent',
                    checked
                        ? 'border-accent bg-accent'
                        : error
                          ? 'border-red-500'
                          : 'border-gray-300 group-hover:border-accent',
                    disabled && 'cursor-not-allowed opacity-50',
                )}
                onClick={handleChange}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
            >
                {checked && <Check className="h-4 w-4 fill-white" />}
                <input
                    type="checkbox"
                    id={inputId}
                    name={name}
                    checked={checked}
                    onChange={() => {}} // Handled by div onClick
                    className="sr-only"
                    disabled={disabled}
                    aria-label={label}
                />
            </div>

            <label
                htmlFor={inputId}
                className={cn(
                    'cursor-pointer text-sm leading-relaxed select-none sm:text-base',
                    disabled && 'cursor-not-allowed opacity-50',
                )}
                style={{
                    color: error
                        ? 'var(--red-600, #dc2626)'
                        : 'var(--color-foreground, #1a4d3a)',
                }}
                onClick={handleChange}
            >
                {label}
            </label>

            {error && (
                <p
                    className="mt-1 text-sm"
                    style={{ color: 'var(--red-600, #dc2626)' }}
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default Checkbox;
