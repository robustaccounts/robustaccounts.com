// Global type declarations

interface Window {
    gtag?: (
        command: 'config' | 'consent' | 'event' | 'set',
        targetId: string | object,
        config?: object,
    ) => void;
    dataLayer?: any[];
}

declare function gtag(
    command: 'config' | 'consent' | 'event' | 'set',
    targetId: string | object,
    config?: object,
): void;

// Provide a fallback module declaration for 'nodemailer' to appease TS when dynamically importing it.
// This is safe because we treat the imported value as 'any' at runtime.
declare module 'nodemailer';
