'use client';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface WorkflowStep {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
}

const steps: WorkflowStep[] = [
    {
        number: '01',
        title: 'GET',
        subtitle: 'Understanding Your Business',
        description:
            'We get an understanding of your business, its bookkeeping, accounting and reconciliation status. Then, we discuss future business plans, the scope of work and other deliverables.',
        details: [
            'Comprehensive business assessment',
            'Current financial status review',
            'Future goals and objectives discussion',
            'Scope of work definition',
            'Deliverables planning',
            'Timeline establishment',
        ],
    },
    {
        number: '02',
        title: 'SET',
        subtitle: 'Setting Up Your Success',
        description:
            'We mutually set a process for data access, query resolution and reporting. Upon contract agreement, we set up a dedicated accounting team for you.',
        details: [
            'Data access protocols establishment',
            'Query resolution process setup',
            'Reporting framework creation',
            'Contract agreement finalization',
            'Dedicated team assignment',
            'Communication channels setup',
        ],
    },
    {
        number: '03',
        title: 'GO',
        subtitle: 'Focus on Growth',
        description:
            'You can focus on your business and leave the rest to us as we manage your end-to-end accounting, bookkeeping, payroll, sales tax and tax return function.',
        details: [
            'End-to-end accounting management',
            'Comprehensive bookkeeping services',
            'Payroll processing and management',
            'Sales tax handling and compliance',
            'Tax return preparation and filing',
            'Ongoing support and optimization',
        ],
    },
];

export function ProcessStepsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const totalSteps = steps.length;

    // Calculate dot positions around circle (starting from top, going clockwise)
    const getDotPosition = (index: number, total: number, radius: number) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return { x, y };
    };

    useGSAP(() => {
        // Header animation
        gsap.from('.workflow-header-anim', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
        });

        // Scroll-driven step changes
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 20%',
            end: 'bottom 80%',
            scrub: 0.5,
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
        // Animate center number
        gsap.fromTo(
            '.center-number',
            { opacity: 0, scale: 0.8, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        );
    }, [activeStep]);

    // Larger circle dimensions
    const circleRadius = 180;
    const dotRadius = circleRadius + 30;
    const containerSize = (circleRadius + 80) * 2;

    return (
        <section
            ref={sectionRef}
            className="relative bg-theme-offwhite py-32 lg:py-48"
            style={{ minHeight: `${totalSteps * 80 + 200}vh` }}
        >
            {/* Sticky Container */}
            <div className="sticky top-0 flex h-screen items-center">
                <div className="cust-container">
                    {/* Header */}
                    <div className="workflow-header-anim mb-12 lg:mb-16">
                        <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-primary uppercase">
                            Our 3-Step Process
                        </span>
                        <h2 className="text-3xl leading-[1.1] font-light tracking-tight text-theme-black md:text-4xl lg:text-5xl">
                            From understanding your needs
                            <br />
                            to delivering exceptional results
                        </h2>
                    </div>

                    {/* Main Content: Circle + Steps */}
                    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                        {/* Left: Large Circular Indicator - CENTERED */}
                        <div className="flex items-center justify-center">
                            <div
                                className="relative"
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
                                    {steps.map((_, index) => {
                                        const pos = getDotPosition(
                                            index,
                                            totalSteps,
                                            dotRadius,
                                        );
                                        const isActive = index === activeStep;
                                        const isPast = index < activeStep;

                                        return (
                                            <g key={index}>
                                                {/* Outer dot (larger when active) */}
                                                <circle
                                                    cx={pos.x}
                                                    cy={pos.y}
                                                    r={isActive ? 18 : 10}
                                                    fill={
                                                        isActive
                                                            ? 'var(--primary)'
                                                            : isPast
                                                              ? 'var(--primary)'
                                                              : 'white'
                                                    }
                                                    stroke={
                                                        isActive
                                                            ? 'var(--primary)'
                                                            : isPast
                                                              ? 'var(--primary)'
                                                              : '#d1d5db'
                                                    }
                                                    strokeWidth="2"
                                                    className="transition-all duration-500"
                                                />
                                                {/* Step number inside active dot */}
                                                {isActive && (
                                                    <text
                                                        x={pos.x}
                                                        y={pos.y}
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                        fill="white"
                                                        fontSize="12"
                                                        fontWeight="bold"
                                                    >
                                                        {steps[index].number}
                                                    </text>
                                                )}
                                            </g>
                                        );
                                    })}
                                </svg>

                                {/* Center Number - Large */}
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <span
                                        key={activeStep}
                                        className="center-number font-light tracking-tight"
                                        style={{
                                            fontSize:
                                                'clamp(100px, 15vw, 180px)',
                                            color: 'var(--primary)',
                                            fontVariantNumeric: 'tabular-nums',
                                        }}
                                    >
                                        {steps[activeStep]?.number || '01'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Steps List */}
                        <div className="flex flex-col gap-4">
                            {steps.map((step, index) => {
                                const isActive = index === activeStep;

                                return (
                                    <div
                                        key={index}
                                        className={`border-b border-gray-200 py-4 transition-all duration-500 ${
                                            isActive
                                                ? 'opacity-100'
                                                : 'opacity-30'
                                        }`}
                                    >
                                        <h3
                                            className={`mb-1 text-base font-semibold transition-colors duration-500 md:text-lg ${
                                                isActive
                                                    ? 'text-theme-black'
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            {step.title}: {step.subtitle}
                                        </h3>
                                        <p
                                            className={`text-sm leading-relaxed transition-colors duration-500 ${
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

                    {/* Primary Color Indicator Bar */}
                    <div className="absolute top-1/2 right-0 hidden h-20 w-1 -translate-y-1/2 bg-primary lg:block" />
                </div>
            </div>
        </section>
    );
}
