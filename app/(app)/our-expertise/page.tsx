import React from 'react';

import HeroSection from '@/components/our-expertise/hero-section';
import IndustriesSection from '@/components/our-expertise/industries-section';
import TechnicalCapabilitiesSection from '@/components/our-expertise/technical-capabilities-section';
import GlobalReachSection from '@/components/our-expertise/global-reach-section';
import CertificationsSoftwareSection from '@/components/our-expertise/certifications-software-section';

export default function OurExpertisePage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <IndustriesSection />
            <TechnicalCapabilitiesSection />
            <GlobalReachSection />
            <CertificationsSoftwareSection />
        </main>
    );
}
