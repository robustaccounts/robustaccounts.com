import React from 'react';

import { BenefitsSection } from '@/components/how-it-works/benefits-section';
import { HeroSection } from '@/components/how-it-works/hero-section';
import { ProcessStepsSection } from '@/components/how-it-works/process-steps-section';
import { TimelineSection } from '@/components/how-it-works/timeline-section';

export default function HowItWorksPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <ProcessStepsSection />
            <TimelineSection />
            <BenefitsSection />
        </main>
    );
}
