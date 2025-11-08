import Script from 'next/script';
import React from 'react';

/**
 * Botpress Webchat Integration
 * 
 * According to Botpress docs (https://botpress.com/docs/webchat/get-started/quick-start),
 * the scripts should be added to the <head> section of the HTML.
 * 
 * Using Next.js Script component with strategy="beforeInteractive" ensures
 * scripts are loaded in the <head> before the page becomes interactive.
 */
export default function BotpressChat() {
    return (
        <>
            {/* Botpress Webchat Inject Script - Loads first */}
            <Script
                src="https://cdn.botpress.cloud/webchat/v3.3/inject.js"
                strategy="beforeInteractive"
            />
            {/* Botpress Bot Configuration Script - With defer attribute */}
            <Script
                src="https://files.bpcontent.cloud/2025/11/01/19/20251101190531-EGLDI0K5.js"
                strategy="beforeInteractive"
                defer
            />
        </>
    );
}
