import * as amplitude from '@amplitude/analytics-browser';

export const initializeAmplitude = () => {
    if (typeof window === 'undefined') return;

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    // Don't initialize if no API key is provided
    if (!apiKey || apiKey.trim() === '') {
        console.warn('Amplitude API key not found, skipping initialization');
        return;
    }

    try {
        amplitude.init(apiKey, {
            defaultTracking: {
                pageViews: true,
                sessions: true,
                formInteractions: true,
                fileDownloads: true,
            },
        });
        console.log('Amplitude initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Amplitude:', error);
    }
};

export const captureEvent = (
    eventName: string,
    eventProperties: Record<string, string | number | boolean>,
) => {
    if (typeof window === 'undefined') return;

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
        return; // Skip if no API key
    }

    amplitude.track(eventName, eventProperties);
};

export const setUserId = (userId: string) => {
    if (typeof window === 'undefined') return;

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
        return; // Skip if no API key
    }

    amplitude.setUserId(userId);
};

export const setUserProperties = (
    userProperties: Record<string, string | number | boolean>,
) => {
    if (typeof window === 'undefined') return;

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
        return; // Skip if no API key
    }

    const identify = new amplitude.Identify();
    Object.entries(userProperties).forEach(([key, value]) => {
        identify.set(key, value);
    });
    amplitude.identify(identify);
};
