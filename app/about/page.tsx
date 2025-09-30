import React from 'react';
import type { Metadata } from 'next';

import HeroSection from '@/components/about/hero-section';
import MissionVisionSection from '@/components/about/mission-vision-section';
import OurStorySection from '@/components/about/our-story-section';
import ValuesSection from '@/components/about/values-section';
import ComparisonSection from '@/components/about/comparison-section';

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <OurStorySection />
            <ValuesSection />
            <MissionVisionSection />
            <ComparisonSection />
        </main>
    );
}

export const metadata: Metadata = {
    title: 'About Us',
    description:
        'Learn about Robust Accounts — our mission, values, and track record helping businesses with accurate, compliant accounting.',
    alternates: { canonical: '/about' },
};
