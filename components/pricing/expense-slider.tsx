'use client';

import React from 'react';

interface ExpenseSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    isRecommended?: boolean;
}

const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `$${Math.round(value / 1000)}K`;
    }
    return `$${value}`;
};

export default function ExpenseSlider({
    value,
    onChange,
    min = 10000,
    max = 200000,
    step = 10000,
    isRecommended = false,
}: ExpenseSliderProps) {
    // Slider goes from min to max + step (for Custom position)
    const sliderMax = max + step;
    
    // Check if at Custom pricing (value > max)
    const isCustom = value > max;
    
    // Calculate percentage for visual fill (cap at 100% for display)
    const range = sliderMax - min;
    const percentage = ((value - min) / range) * 100;
    
    // Handle slider change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        // Round to nearest step
        const rounded = Math.round(newValue / step) * step;
        const clamped = Math.max(min, Math.min(sliderMax, rounded));
        onChange(clamped);
    };

    // For non-recommended cards, text changes to light colors on parent hover
    const textColorClass = isRecommended 
        ? 'text-gray-600' 
        : 'text-gray-600 group-hover:text-gray-100';
    
    const labelColorClass = isRecommended 
        ? 'text-gray-500' 
        : 'text-gray-500 group-hover:text-gray-200';
    
    const valueColorClass = isRecommended 
        ? 'text-gray-900' 
        : 'text-gray-900 group-hover:text-white';
    
    const suffixColorClass = isRecommended 
        ? 'text-gray-500' 
        : 'text-gray-500 group-hover:text-gray-300';

    const trackBgClass = isRecommended
        ? 'bg-gray-200'
        : 'bg-gray-200 group-hover:bg-white/20';

    return (
        <div className="w-full">
            {/* Label */}
            <p className={`mb-3 text-center text-sm font-medium transition-colors duration-300 ${textColorClass}`}>
                What are your monthly expenses?
            </p>

            {/* Slider Container */}
            <div className="relative h-12 w-full">
                {/* Track Background */}
                <div
                    className={`absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full transition-colors duration-300 ${trackBgClass}`}
                />

                {/* Active Track Fill */}
                <div
                    className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-accent transition-all duration-150"
                    style={{ width: `${percentage}%` }}
                />

                {/* Range Input - goes to max + step for Custom */}
                <input
                    type="range"
                    min={min}
                    max={sliderMax}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    className="absolute inset-0 top-1/2 h-2 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent focus:outline-none
                        [&::-webkit-slider-thumb]:h-6
                        [&::-webkit-slider-thumb]:w-6
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-accent
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:active:scale-95
                        [&::-moz-range-thumb]:h-6
                        [&::-moz-range-thumb]:w-6
                        [&::-moz-range-thumb]:appearance-none
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-accent
                        [&::-moz-range-thumb]:bg-white
                        [&::-moz-range-thumb]:shadow-lg
                        [&::-moz-range-thumb]:transition-transform
                        [&::-moz-range-thumb]:hover:scale-110"
                    aria-label="Monthly expenses slider"
                />
            </div>

            {/* Labels: Only Min and Max shown (no Custom label) */}
            <div className={`mt-2 flex justify-between text-xs font-medium transition-colors duration-300 ${labelColorClass}`}>
                <span>{formatCurrency(min)}</span>
                <span>{formatCurrency(max)}</span>
            </div>

            {/* Current Value Display */}
            <div className={`mt-4 text-center transition-colors duration-300 ${valueColorClass}`}>
                {isCustom ? (
                    <span className="text-lg font-bold text-accent">
                        {'>'} $200K / month
                    </span>
                ) : (
                    <span className="text-lg font-semibold">
                        {formatCurrency(value)}
                        <span className={`ml-1 text-sm font-normal transition-colors duration-300 ${suffixColorClass}`}>
                            /month
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
}
