'use client';

import Link from 'next/link';

import { Check } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

interface Step {
    id: number;
    name: string;
    href: string;
}

const steps: Step[] = [
    { id: 1, name: 'Select Date & Time', href: '/lead-form/schedule' },
    { id: 2, name: 'Your Details', href: '/lead-form/contact' },
];

interface ProgressStepsProps {
    currentStep: number;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
    return (
        <nav aria-label="Progress" className="w-full">
            <ol className="flex items-center justify-between">
                {steps.map((step, stepIdx) => (
                    <li
                        key={step.name}
                        className={cn(
                            stepIdx !== steps.length - 1 ? 'flex-1' : '',
                            'relative',
                        )}
                    >
                        {step.id < currentStep ? (
                            <>
                                <Link
                                    href={step.href}
                                    className="group flex items-center"
                                >
                                    <span className="flex items-center px-2 py-4 text-sm font-medium sm:px-6">
                                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent transition-colors group-hover:bg-accent/90 sm:h-10 sm:w-10">
                                            <Check className="h-4 w-4 fill-white sm:h-6 sm:w-6" />
                                        </span>
                                        <span className="ml-2 hidden text-sm font-medium text-gray-900 sm:ml-4 sm:inline-block">
                                            {step.name}
                                        </span>
                                    </span>
                                </Link>
                                {stepIdx !== steps.length - 1 && (
                                    <div
                                        className="absolute top-0 right-0 hidden h-full w-5 md:block"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            className="h-full w-full text-gray-300"
                                            viewBox="0 0 22 80"
                                            fill="none"
                                            preserveAspectRatio="none"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                vectorEffect="non-scaling-stroke"
                                                stroke="currentcolor"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </>
                        ) : step.id === currentStep ? (
                            <>
                                <div
                                    className="flex items-center px-2 py-4 text-sm font-medium sm:px-6"
                                    aria-current="step"
                                >
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white sm:h-10 sm:w-10">
                                        <span className="text-sm font-semibold text-accent sm:text-base">
                                            {step.id}
                                        </span>
                                    </span>
                                    <span className="ml-2 text-sm font-medium text-accent sm:ml-4 sm:text-base">
                                        {step.name}
                                    </span>
                                </div>
                                {stepIdx !== steps.length - 1 && (
                                    <div
                                        className="absolute top-0 right-0 hidden h-full w-5 md:block"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            className="h-full w-full text-gray-300"
                                            viewBox="0 0 22 80"
                                            fill="none"
                                            preserveAspectRatio="none"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                vectorEffect="non-scaling-stroke"
                                                stroke="currentcolor"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="group flex items-center">
                                    <span className="flex items-center px-2 py-4 text-sm font-medium sm:px-6">
                                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white sm:h-10 sm:w-10">
                                            <span className="text-sm text-gray-500 sm:text-base">
                                                {step.id}
                                            </span>
                                        </span>
                                        <span className="ml-2 hidden text-sm font-medium text-gray-500 sm:ml-4 sm:inline-block">
                                            {step.name}
                                        </span>
                                    </span>
                                </div>
                                {stepIdx !== steps.length - 1 && (
                                    <div
                                        className="absolute top-0 right-0 hidden h-full w-5 md:block"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            className="h-full w-full text-gray-300"
                                            viewBox="0 0 22 80"
                                            fill="none"
                                            preserveAspectRatio="none"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                vectorEffect="non-scaling-stroke"
                                                stroke="currentcolor"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
