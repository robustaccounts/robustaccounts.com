'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import React from 'react';

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

    // Don't render Botpress on lead-form routes
    if (pathname?.startsWith('/lead-form')) {
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
