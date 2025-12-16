'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect, useCallback } from 'react';

/**
 * Botpress Webchat Integration
 *
 * According to Botpress docs (https://botpress.com/docs/webchat/get-started/quick-start),
 * the scripts should be added to the <head> section of the HTML.
 *
 * Using Next.js Script component with strategy="afterInteractive" ensures
 * scripts are loaded after the page becomes interactive.
 *
 * Note: Hidden on lead-form routes to avoid interference with the scheduling flow.
 */
export default function BotpressChat() {
    const pathname = usePathname();
    const isHiddenRoute = pathname?.startsWith('/lead-form') || pathname?.startsWith('/reschedule');

    // Function to hide all Botpress elements
    const hideBotpressElements = useCallback(() => {
        // Target all possible Botpress selectors
        const selectors = [
            '#bp-web-widget-container',
            '#bp-widget',
            '.bpw-widget-btn',
            '.bpw-chat-container',
            '[class*="botpress"]',
            '[id*="botpress"]',
            '[id*="bp-widget"]',
            '[id*="bp-web"]',
            '[class*="bp-widget"]',
            'iframe[src*="botpress"]',
        ];

        selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                (el as HTMLElement).style.setProperty('display', 'none', 'important');
                (el as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
                (el as HTMLElement).style.setProperty('opacity', '0', 'important');
            });
        });
    }, []);

    // Hide/show Botpress widget based on route
    useEffect(() => {
        if (!isHiddenRoute) {
            // Remove hide style and show widget
            const style = document.getElementById('botpress-hide-style');
            if (style) style.remove();
            return;
        }

        // Add CSS to hide Botpress widget
        let style = document.getElementById('botpress-hide-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'botpress-hide-style';
            style.textContent = `
                #bp-web-widget-container,
                #bp-widget,
                .bpw-widget-btn,
                .bpw-chat-container,
                [class*="botpress"],
                [id*="botpress"],
                [id*="bp-widget"],
                [id*="bp-web"],
                [class*="bp-widget"],
                iframe[src*="botpress"] {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    width: 0 !important;
                    height: 0 !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Immediately hide any existing elements
        hideBotpressElements();

        // Use MutationObserver to catch dynamically added Botpress elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                hideBotpressElements();
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Also run periodically for the first few seconds (Botpress may load slowly)
        const intervals = [100, 300, 500, 1000, 2000, 3000];
        const timeouts = intervals.map((ms) =>
            setTimeout(hideBotpressElements, ms)
        );

        return () => {
            observer.disconnect();
            timeouts.forEach(clearTimeout);
        };
    }, [isHiddenRoute, hideBotpressElements]);

    // Don't render Botpress scripts on hidden routes
    if (isHiddenRoute) {
        return null;
    }

    return (
        <>
            {/* Botpress Webchat Inject Script - Loads first */}
            <Script
                src="https://cdn.botpress.cloud/webchat/v3.3/inject.js"
                strategy="afterInteractive"
            />
            {/* Botpress Bot Configuration Script - With defer attribute */}
            <Script
                src="https://files.bpcontent.cloud/2025/11/01/19/20251101190531-EGLDI0K5.js"
                strategy="afterInteractive"
                defer
            />
        </>
    );
}
