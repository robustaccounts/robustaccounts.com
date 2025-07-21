'use client';

import * as React from 'react';
import { useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';

import cn from '@/utils/cn';

import { Check, ChevronRight, Close } from './icons/google-icons';

export interface MultiSelectOption {
    value: string;
    label: string;
}

export interface MultiSelectProps {
    label: string;
    value?: string[];
    placeholder?: string;
    options: MultiSelectOption[];
    onChange?: (values: string[]) => void;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
    maxDisplay?: number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    label,
    value = [],
    placeholder = 'Select options',
    options,
    onChange,
    name,
    required = false,
    disabled = false,
    error,
    className,
    maxDisplay = 3,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOptions = options.filter((option) =>
        value.includes(option.value),
    );

    useOnClickOutside(dropdownRef, () => {
        setIsOpen(false);
        setIsFocused(false);
    });

    const handleSelect = (optionValue: string) => {
        if (!onChange) return;

        const newValue = value.includes(optionValue)
            ? value.filter((v) => v !== optionValue)
            : [...value, optionValue];

        onChange(newValue);
    };

    const handleRemove = (optionValue: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (onChange) {
            onChange(value.filter((v) => v !== optionValue));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(!isOpen);
        } else if (event.key === 'Escape') {
            setIsOpen(false);
            setIsFocused(false);
        }
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <div
                className={cn(
                    'bg-white flex min-h-[60px] w-full cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-2.5 transition-colors',
                    isFocused || isOpen
                        ? 'border-accent'
                        : error
                          ? 'border-red-500'
                            : 'border-secondary',
                    disabled && 'cursor-not-allowed opacity-50',
                    className,
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
            >
                <div className="flex w-full flex-col">
                    <label
                        className={cn(
                            'text-xs leading-4 transition-colors duration-150',
                            (isFocused || isOpen) && '',
                            error && 'text-red-500',
                        )}
                    >
                        {label}
                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>

                    <div className="flex flex-wrap gap-1 pt-1">
                        {selectedOptions.length > 0 ? (
                            selectedOptions
                                .slice(0, maxDisplay)
                                .map((option) => (
                                    <div
                                        key={option.value}
                                        className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm text-primary"
                                    >
                                        <span>{option.label}</span>
                                        <button
                                            type="button"
                                            className="flex h-3 w-3 cursor-pointer items-center justify-center hover:text-blue-600"
                                            onClick={(e) =>
                                                handleRemove(option.value, e)
                                            }
                                            aria-label={`Remove ${option.label}`}
                                            title={`Remove ${option.label}`}
                                        >
                                            <Close className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))
                        ) : (
                            <span className="text-base font-medium text-gray-500">
                                {placeholder}
                            </span>
                        )}
                        {selectedOptions.length > maxDisplay && (
                            <div className="flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600">
                                +{selectedOptions.length - maxDisplay} more
                            </div>
                        )}
                    </div>
                </div>

                <ChevronRight
                    className={cn(
                        'h-5 w-5 flex-shrink-0 transition-transform duration-200',
                        isOpen ? 'rotate-90' : 'rotate-0',
                        isFocused || isOpen ? '' : 'text-gray-400',
                    )}
                />
            </div>

            {isOpen && (
                <div className="bg-white absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-gray-200 shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={cn(
                                'hover: flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors',
                                value.includes(option.value) && 'bg-secondary',
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(option.value);
                            }}
                        >
                            <div
                                className={cn(
                                    'flex h-5 w-5 items-center justify-center rounded border-2 transition-all',
                                    value.includes(option.value)
                                        ? 'border-accent bg-secondary'
                                            : 'border-accent',
                                )}
                            >
                                {value.includes(option.value) && (
                                    <Check className="fill-accent" />
                                )}
                            </div>
                            <span
                                className={cn(
                                    'text-gray-700',
                                    value.includes(option.value) &&
                                        'font-medium',
                                )}
                            >
                                {option.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            {/* Hidden inputs for form submission */}
            {value.map((val) => (
                <input key={val} type="hidden" name={name} value={val} />
            ))}
        </div>
    );
};

export default MultiSelect;
