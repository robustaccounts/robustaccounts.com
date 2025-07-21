'use client';

import * as React from 'react';
import { useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';

import cn from '@/utils/cn';

import { ChevronRight } from './icons/google-icons';

export interface DropdownOption {
    value: string;
    label: string;
}

export interface DropdownProps {
    label: string;
    value?: string;
    placeholder?: string;
    options: DropdownOption[];
    onChange?: (value: string) => void;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    label,
    value = '',
    placeholder = 'Select an option',
    options,
    onChange,
    name,
    required = false,
    disabled = false,
    error,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(dropdownRef, () => {
        setIsOpen(false);
        setIsFocused(false);
    });

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (optionValue: string) => {
        if (onChange) {
            onChange(optionValue);
        }
        setIsOpen(false);
        setIsFocused(false);
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
                    'flex h-[60px] w-full cursor-pointer items-center gap-2 rounded-xl border-2 bg-white px-4 py-2.5 transition-colors',
                    isFocused || isOpen
                        ? 'border-accent'
                        : error
                          ? 'border-red-500'
                          : 'border-gray-200',
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

                    <div className="w-full bg-transparent text-base font-medium outline-none">
                        {selectedOption ? selectedOption.label : placeholder}
                    </div>
                </div>

                <ChevronRight
                    className={cn(
                        'h-7 w-7 transition-transform duration-200',
                        isOpen ? 'rotate-90' : 'rotate-0',
                        isFocused || isOpen ? 'fill-accent' : 'fill-gray-200',
                    )}
                />
            </div>

            {isOpen && (
                <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                    {options.map((option, idx) => (
                        <div
                            key={option.value}
                            className={cn(
                                'cursor-pointer px-4 py-3 transition-colors',
                                value === option.value && 'bg-secondary',
                                hoveredIndex === idx && 'bg-gray-100',
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(option.value);
                            }}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            <input type="hidden" name={name} value={value} />
        </div>
    );
};

export default Dropdown;
