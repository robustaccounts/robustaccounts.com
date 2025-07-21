'use client';

import * as React from 'react';
import { useState } from 'react';

import cn from '@/utils/cn';

export interface InputProps {
    label: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    name?: string;
    required?: boolean;
    type?: 'text' | 'email' | 'tel' | 'password' | 'number';
    disabled?: boolean;
    error?: string;
    className?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    value = '',
    placeholder = '',
    onChange,
    name,
    required = false,
    type = 'text',
    disabled = false,
    error,
    className,
    icon,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="relative w-full">
            <div
                className={cn(
                    'flex h-[60px] w-full items-center gap-2 rounded-xl border-2 bg-white px-4 py-2.5 transition-colors',
                    isFocused
                        ? 'border-accent'
                        : error
                          ? 'border-red-500'
                          : 'border-gray-200',
                    disabled && 'cursor-not-allowed opacity-50',
                    className,
                )}
            >
                {icon && (
                    <div
                        className={cn(
                            'flex items-center gap-2 transition-colors',
                            isFocused && '',
                        )}
                    >
                        {icon}
                    </div>
                )}

                <div className="flex w-full flex-col">
                    <label
                        htmlFor={name}
                        className={cn(
                            'text-xs leading-4 transition-colors duration-150',
                            isFocused && '',
                            error && 'text-red-500',
                        )}
                    >
                        {label}
                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>

                    <input
                        type={type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full appearance-none bg-transparent text-base font-medium outline-none placeholder:text-gray-400 [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!text-foreground [&:-webkit-autofill]:!shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:!transition-[background-color_5000s_ease-in-out_0s]"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
