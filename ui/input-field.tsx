'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import cn from '@/utils/cn';

export interface InputFieldProps {
    label: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    name?: string;
    required?: boolean;
    type?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    className?: string;
    inputClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    value = '',
    placeholder = '',
    onChange,
    name,
    required = false,
    type = 'text',
    disabled = false,
    icon,
    className,
    inputClassName,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="relative w-full">
            <div
                className={cn(
                    'flex h-[60px] w-full items-center gap-2 rounded-xl border-2 px-4 py-2.5 transition-colors',
                    isFocused ? 'border-primary' : 'border-slate-200',
                    className,
                )}
            >
                {icon && (
                    <div
                        className={cn(
                            'flex items-center gap-2 transition-colors',
                            isFocused && 'text-primary',
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
                            isFocused && 'text-primary',
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
                        value={inputValue}
                        onChange={handleChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={cn(
                            'w-full bg-transparent text-base font-medium outline-none',
                            inputClassName,
                        )}
                        aria-label={label}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputField;
