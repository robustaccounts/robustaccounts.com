'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

import usePrefersReducedMotion from '@/lib/hooks/use-prefers-reduced-motion';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import StickyCTA from '@/components/layout/sticky-cta';
import SmoothScroll from '@/components/providers/smooth-scroll';

// Routes that should not have header/footer
const MINIMAL_LAYOUT_ROUTES = ['/lead-form', '/reschedule'];

export default function SiteShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prefersReducedMotion = usePrefersReducedMotion();
    const contentRef = useRef<HTMLDivElement>(null);

    // Check if current route should have minimal layout (no header/footer)
    const isMinimalLayout = MINIMAL_LAYOUT_ROUTES.some((route) =>
        pathname.startsWith(route),
    );

    useGSAP(
        () => {
            if (prefersReducedMotion) return;
            if (!contentRef.current) return;

            gsap.fromTo(
                contentRef.current,
                { autoAlpha: 0, y: 14 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.65,
                    ease: 'power2.out',
                    clearProps: 'opacity,transform',
                },
            );
        },
        { dependencies: [pathname, prefersReducedMotion] },
    );

    // Minimal layout for lead-form pages - NO SmoothScroll (Lenis interferes with nested scrolling)
    if (isMinimalLayout) {
        return <>{children}</>;
    }

    // Full layout with header/footer
    return (
        <SmoothScroll>
            <Header key={pathname} />
            <div ref={contentRef}>{children}</div>
            <Footer />
        </SmoothScroll>
    );
}
