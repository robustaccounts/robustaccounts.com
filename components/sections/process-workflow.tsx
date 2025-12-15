'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';

interface WorkflowStep {
    number: string;
    title: string;
    description: string;
}

const PROCESS_STEPS: WorkflowStep[] = [
    {
        number: '01',
        title: 'Discovery Call',
        description:
            'We learn about your business, current financial processes, and pain points to understand your needs.',
    },
    {
        number: '02',
        title: 'Custom Plan',
        description:
            'We design a tailored financial operations plan with clear deliverables, timelines, and pricing.',
    },
    {
        number: '03',
        title: 'Team Assignment',
        description:
            'We assign a dedicated team of specialists matched to your industry and business requirements.',
    },
    {
        number: '04',
        title: 'Seamless Onboarding',
        description:
            'We integrate with your systems, set up secure access, and establish communication protocols.',
    },
    {
        number: '05',
        title: 'Ongoing Operations',
        description:
            'Your finance function runs smoothly with regular reporting, proactive insights, and continuous support.',
    },
];

const ProcessWorkflow = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const totalSteps = PROCESS_STEPS.length;

    // Calculate dot positions around circle (starting from top, going clockwise)
    const getDotPosition = (index: number, total: number, radius: number) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return { x, y };
    };

    useGSAP(() => {
        // Scroll-driven step changes
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            onUpdate: (self) => {
                const progress = self.progress;
                const stepIndex = Math.min(
                    Math.floor(progress * totalSteps),
                    totalSteps - 1,
                );
                setActiveStep(stepIndex);
            },
        });
    }, [totalSteps]);

    // Animation for step changes
    useEffect(() => {
        gsap.fromTo(
            '.center-number',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        );
    }, [activeStep]);

    // Larger circle with prominent center number
    const circleRadius = 200;
    const dotRadius = circleRadius + 30;
    const containerSize = (circleRadius + 70) * 2;

    return (
        <section
            ref={sectionRef}
            className="relative bg-white"
            style={{ height: `${totalSteps * 100}vh` }}
        >
            {/* Sticky Container */}
            <div className="sticky top-0 flex h-screen items-center py-8 lg:py-12">
                <div className="cust-container">
                    {/* Main Content: Circle + Steps side by side */}
                    <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
                        {/* Left: Header + Circular Indicator */}
                        <div className="flex flex-col">
                            {/* Header - Aligned with first step */}
                            <div className="mb-8 lg:mb-10">
                                <span className="mb-3 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
                                    Our Process
                                </span>
                                <h2 className="text-4xl leading-[1.1] font-light tracking-tight text-theme-black md:text-5xl">
                                    How We Work With You
                                </h2>
                                <p className="mt-3 max-w-md text-sm text-gray-600">
                                    A streamlined process designed to get your
                                    finance function running smoothly.
                                </p>
                            </div>

                            {/* Circle - Centered below header (hidden on mobile) */}
                            <div
                                className="relative mx-auto hidden lg:block"
                                style={{
                                    width: containerSize,
                                    height: containerSize,
                                }}
                            >
                                {/* SVG Circle with Dots */}
                                <svg
                                    className="absolute inset-0 h-full w-full"
                                    viewBox={`${-containerSize / 2} ${-containerSize / 2} ${containerSize} ${containerSize}`}
                                >
                                    {/* Main circle outline */}
                                    <circle
                                        cx="0"
                                        cy="0"
                                        r={circleRadius}
                                        fill="none"
                                        stroke="#e5e5e5"
                                        strokeWidth="1"
                                    />

                                    {/* Dots around the perimeter */}
                                    {PROCESS_STEPS.map((_, index) => {
                                        const pos = getDotPosition(
                                            index,
                                            totalSteps,
                                            dotRadius,
                                        );
                                        const isActive = index === activeStep;
                                        const isPast = index < activeStep;

                                        return (
                                            <g key={index}>
                                                <circle
                                                    cx={pos.x}
                                                    cy={pos.y}
                                                    r={isActive ? 16 : 8}
                                                    fill={
                                                        isActive
                                                            ? '#0f3d2e'
                                                            : isPast
                                                              ? '#0f3d2e'
                                                              : 'white'
                                                    }
                                                    stroke={
                                                        isActive
                                                            ? '#0f3d2e'
                                                            : isPast
                                                              ? '#0f3d2e'
                                                              : '#d1d5db'
                                                    }
                                                    strokeWidth="2"
                                                    className="transition-all duration-300"
                                                />
                                                {isActive && (
                                                    <text
                                                        x={pos.x}
                                                        y={pos.y}
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                        fill="white"
                                                        fontSize="10"
                                                        fontWeight="bold"
                                                    >
                                                        {
                                                            PROCESS_STEPS[index]
                                                                .number
                                                        }
                                                    </text>
                                                )}
                                            </g>
                                        );
                                    })}
                                </svg>

                                {/* Center Number - Larger and prominent */}
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <span
                                        key={activeStep}
                                        className="center-number font-light tracking-tight text-primary"
                                        style={{
                                            fontSize:
                                                'clamp(72px, 12vw, 120px)',
                                            fontVariantNumeric: 'tabular-nums',
                                        }}
                                    >
                                        {PROCESS_STEPS[activeStep]?.number ||
                                            '01'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Steps List - starts at same level as header */}
                        <div className="flex flex-col gap-4 lg:gap-5">
                            {PROCESS_STEPS.map((step, index) => {
                                const isActive = index === activeStep;

                                return (
                                    <div
                                        key={index}
                                        className={`border-b border-gray-200 py-4 transition-all duration-300 ${
                                            isActive
                                                ? 'opacity-100'
                                                : 'opacity-30'
                                        }`}
                                    >
                                        <h3
                                            className={`mb-1 text-sm font-semibold transition-colors duration-300 md:text-base ${
                                                isActive
                                                    ? 'text-theme-black'
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            STEP {step.number}: {step.title}
                                        </h3>
                                        <p
                                            className={`text-sm leading-relaxed transition-colors duration-300 ${
                                                isActive
                                                    ? 'text-gray-600'
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessWorkflow;
