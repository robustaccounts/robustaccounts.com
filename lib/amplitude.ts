import * as amplitude from '@amplitude/analytics-browser';

export const initializeAmplitude = () => {
    if (typeof window === 'undefined') return;

    try {
        amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY as string, {
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
    amplitude.track(eventName, eventProperties);
};

export const setUserId = (userId: string) => {
    if (typeof window === 'undefined') return;
    amplitude.setUserId(userId);
};

export const setUserProperties = (userProperties: Record<string, string | number | boolean>) => {
    if (typeof window === 'undefined') return;
    const identify = new amplitude.Identify();
    Object.entries(userProperties).forEach(([key, value]) => {
        identify.set(key, value);
    });
    amplitude.identify(identify);
};
