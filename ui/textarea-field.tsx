'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

export interface TextAreaFieldProps {
    label: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    textareaClassName?: string;
    rows?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
    label,
    value = '',
    placeholder = '',
    onChange,
    name,
    required = false,
    disabled = false,
    className,
    textareaClassName,
    rows = 4,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="relative h-full w-full">
            <div
                className={`flex min-h-[120px] w-full flex-col gap-2 rounded-xl border-2 px-4 py-3 transition-colors ${
                    isFocused ? 'border-primary' : 'border-secondary'
                } ${className}`}
            >
                <label
                    htmlFor={name}
                    className={`text-xs leading-4 transition-colors duration-150 ${
                        isFocused && 'text-primary'
                    }`}
                >
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>

                <textarea
                    id={name}
                    name={name}
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={rows}
                    className={`w-full resize-none bg-transparent text-base font-medium outline-none ${textareaClassName}`}
                    aria-label={label}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    );
};

export default TextAreaField;
