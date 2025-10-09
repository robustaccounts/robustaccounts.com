import { useEffect, useRef } from 'react';

interface UseKeyboardNavOptions {
    onEscape?: () => void;
    onEnter?: () => void;
    trapFocus?: boolean;
}

/**
 * Custom hook for enhanced keyboard navigation
 * Handles common keyboard interactions and focus management
 *
 * @example
 * const modalRef = useKeyboardNav({
 *   onEscape: closeModal,
 *   trapFocus: true
 * });
 */
export function useKeyboardNav(options: UseKeyboardNavOptions = {}) {
    const { onEscape, onEnter, trapFocus = false } = options;
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Handle Escape key
            if (event.key === 'Escape' && onEscape) {
                onEscape();
                return;
            }

            // Handle Enter key
            if (event.key === 'Enter' && onEnter) {
                onEnter();
                return;
            }

            // Handle focus trapping
            if (trapFocus && event.key === 'Tab' && containerRef.current) {
                const focusableElements =
                    containerRef.current.querySelectorAll<HTMLElement>(
                        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
                    );

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement =
                    focusableElements[focusableElements.length - 1];

                if (event.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onEscape, onEnter, trapFocus]);

    return containerRef;
}
