'use client';

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

type ConsentState = 'accepted' | 'rejected' | 'unset';

type ConsentContextType = {
    state: ConsentState;
    ready: boolean; // true once we checked stored preference
    accept: () => void;
    reject: () => void;
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'cookie-consent';

export function ConsentProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<ConsentState>('unset');
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'accepted' || stored === 'rejected') {
                setState(stored as ConsentState);
            } else {
                // Default to accepted for opt-out approach
                setState('accepted');
            }
        } catch {
            // Default to accepted if localStorage fails
            setState('accepted');
        }
        setReady(true);
    }, []);

    const accept = () => {
        try {
            localStorage.setItem(STORAGE_KEY, 'accepted');
        } catch {}
        setState('accepted');
    };

    const reject = () => {
        try {
            localStorage.setItem(STORAGE_KEY, 'rejected');
        } catch {}
        setState('rejected');
    };

    const value = useMemo(
        () => ({ state, ready, accept, reject }),
        [state, ready],
    );

    return (
        <ConsentContext.Provider value={value}>
            {children}
        </ConsentContext.Provider>
    );
}

export function useConsent() {
    const ctx = useContext(ConsentContext);
    if (!ctx) {
        throw new Error('useConsent must be used within a ConsentProvider');
    }
    return ctx;
}
