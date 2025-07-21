import React from 'react';

import HeroSection from '@/components/getting-started/hero-section';
import ProcessStepsSection from '@/components/getting-started/process-steps-section';

export default function GettingStartedPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <ProcessStepsSection />
            {/* <TrustSection /> */}
        </main>
    );
}
