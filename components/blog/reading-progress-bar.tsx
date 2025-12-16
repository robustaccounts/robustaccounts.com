'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface ReadingProgressBarProps {
    contentId?: string;
}

export default function ReadingProgressBar({
    contentId = 'article-content',
}: ReadingProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<ScrollTrigger | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const progressBar = progressRef.current;
        if (!progressBar) return;

        // Reset progress bar immediately on route change
        progressBar.style.transform = 'scaleX(0)';

        // Kill any existing ScrollTrigger
        if (triggerRef.current) {
            triggerRef.current.kill();
            triggerRef.current = null;
        }

        // Delay to ensure DOM is hydrated and Lenis is initialized
        const initTimer = setTimeout(() => {
            const contentElement = document.getElementById(contentId);

            if (!contentElement) {
                console.warn(
                    `Reading progress: element #${contentId} not found`,
                );
                return;
            }

            // Create scroll-linked animation
            triggerRef.current = ScrollTrigger.create({
                trigger: contentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (progressBar) {
                        // Clamp progress between 0 and 1
                        const progress = Math.min(
                            1,
                            Math.max(0, self.progress),
                        );
                        progressBar.style.transform = `scaleX(${progress})`;
                    }
                },
            });

            // Refresh ScrollTrigger to ensure it calculates positions correctly with Lenis
            ScrollTrigger.refresh();
        }, 300);

        return () => {
            clearTimeout(initTimer);
            if (triggerRef.current) {
                triggerRef.current.kill();
                triggerRef.current = null;
            }
        };
    }, [contentId, pathname]); // Re-run when pathname changes

    // Always render the bar - it starts at 0 scale
    return (
        <div className="fixed top-0 right-0 left-0 z-[100] h-1 bg-gray-100">
            <div
                ref={progressRef}
                className="h-full w-full origin-left bg-primary will-change-transform"
                style={{ transform: 'scaleX(0)' }}
            />
        </div>
    );
}
