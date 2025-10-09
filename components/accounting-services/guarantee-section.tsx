import React from 'react';

import { Check } from '@/ui/icons/google-icons';

import ScheduleMyCallButton from '@/components/ui/schedule-my-call-button';

import cn from '@/utils/cn';

const guaranteePoints = [
    {
        title: 'The Right Fit',
        description:
            '93% of clients are matched perfectly the first time — and if not, we will fix it fast.',
    },
    {
        title: 'Guarantee',
        description:
            'If it is not a fit, we will rematch you at no additional cost. No firing, searching, or stressing. We handle everything.',
    },
    {
        title: 'Peace of Mind',
        description:
            'You are not locked into a long-term contract. We listen, adjust, and stay proactive — so you feel good about letting go.',
    },
];

export default function GuaranteeSection() {
    return (
        <section
            className={cn(
                'flex w-full flex-col items-center justify-center gap-12 bg-white px-4 py-16 sm:gap-16 sm:px-6 md:px-12 lg:px-16 xl:container xl:mx-auto',
            )}
        >
            <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
                <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    You're Protected By{' '}
                    <span className="text-accent">
                        Robust Accounts' Right-Fit Guarantee
                    </span>
                </h2>
            </div>

            <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                {guaranteePoints.map((point, index) => (
                    <div
                        key={index}
                        className="group flex flex-col gap-4 rounded-2xl bg-secondary p-8 text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-lg"
                    >
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-sm transition-transform group-hover:scale-110">
                            <Check className="h-8 w-8 fill-white" />
                        </div>
                        <h3 className="text-xl font-bold text-primary">
                            {point.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-700">
                            {point.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <p className="mb-6 text-lg font-medium text-gray-700">
                    Over 1,000+ leaders have trusted us to find their match.
                    You're in good hands.
                </p>
                <ScheduleMyCallButton size="lg" showSubtext={false} />
            </div>
        </section>
    );
}
