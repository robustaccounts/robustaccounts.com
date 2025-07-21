import React from 'react';

import HeroSection from '@/components/services/hero-section';
import IndustriesSection from '@/components/services/industries-section';
import ServicesGridSection from '@/components/services/services-grid-section';

export default function ServicesPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <ServicesGridSection />
            <IndustriesSection />
        </main>
    );
}
