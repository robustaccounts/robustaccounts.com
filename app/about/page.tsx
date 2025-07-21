import React from 'react';

import HeroSection from '@/components/about/hero-section';
import OurStorySection from '@/components/about/our-story-section';
import ValuesSection from '@/components/about/values-section';
import MissionVisionSection from '@/components/about/mission-vision-section';
import TeamSection from '@/components/about/team-section';

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <HeroSection />
            <OurStorySection />
            <ValuesSection />
            <MissionVisionSection />
            <TeamSection />
        </main>
    );
}
