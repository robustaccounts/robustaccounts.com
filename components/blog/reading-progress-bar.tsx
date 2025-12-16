'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

interface ReadingProgressBarProps {
    contentId?: string;
}

export default function ReadingProgressBar({
    contentId = 'article-content',
}: ReadingProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const progressBar = progressRef.current;
        if (!progressBar) return;

        // Delay to ensure DOM is hydrated
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
                start: 'top 10%',
                end: 'bottom 70%',
                scrub: 0.5,
                onUpdate: (self) => {
                    if (progressBar) {
                        progressBar.style.transform = `scaleX(${self.progress})`;
                    }
                },
            });
        }, 200);

        return () => {
            clearTimeout(initTimer);
            if (triggerRef.current) {
                triggerRef.current.kill();
                triggerRef.current = null;
            }
        };
    }, [contentId]);

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
