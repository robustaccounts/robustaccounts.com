'use client';

import { ModalProvider, useModal } from '@/contexts/modal-context';

import React, { useEffect } from 'react';

import { initializeAmplitude } from '@/lib/amplitude';

import SchedulingModal from '@/components/scheduling-modal';

function ModalWrapper() {
    const { isSchedulingModalOpen, setSchedulingModalOpen } = useModal();

    return (
        <SchedulingModal
            isOpen={isSchedulingModalOpen}
            onClose={() => setSchedulingModalOpen(false)}
        />
    );
}

export function Providers({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        initializeAmplitude();
    }, []);

    return (
        <ModalProvider>
            {children}
            <ModalWrapper />
        </ModalProvider>
    );
}
