import type { Metadata } from 'next';
import React from 'react';

import HeroSection from '@/components/our-expertise/hero-section';
import IndustriesSection from '@/components/our-expertise/industries-section';
import TechnicalCapabilitiesSection from '@/components/our-expertise/technical-capabilities-section';
import GlobalReachSection from '@/components/our-expertise/global-reach-section';
import CertificationsSoftwareSection from '@/components/our-expertise/certifications-software-section';

export const metadata: Metadata = {
    title: 'Our Expertise | Industries, Software & Certifications',
    description:
        "Robust Accounts' expertise across industries, accounting software (QuickBooks, Xero, NetSuite), and CPA/EA credentials. See where we add the most value for your business.",
    alternates: { canonical: '/our-expertise' },
    openGraph: {
        title: 'Our Expertise | Industries, Software & Certifications',
        description:
            'Industries we serve, accounting software we master, and the credentials behind our team.',
        url: '/our-expertise',
        type: 'website',
    },
};

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
