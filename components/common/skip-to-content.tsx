'use client';

import React from 'react';

import cn from '@/utils/cn';

/**
 * Skip to Content Link for Accessibility
 * Allows keyboard users to skip navigation and jump directly to main content
 *
 * @example
 * <SkipToContent />
 */
export default function SkipToContent() {
    return (
        <a
            href="#main-content"
            className={cn(
                'fixed top-4 left-4 z-[9999] -translate-y-20 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0',
                'focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none',
            )}
            aria-label="Skip to main content"
        >
            Skip to content
        </a>
    );
}
