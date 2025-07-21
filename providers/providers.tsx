'use client';

import React, { useEffect } from 'react';

import { initializeAmplitude } from '@/lib/amplitude';


export function Providers({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        initializeAmplitude();
    }, []);

    return children;
}
