'use client';

import { useState } from 'react';

import { Add, Remove } from '@/ui/icons/google-icons';

import cn from '@/utils/cn';

export default function FrequentlyAskedQuestion({
    question,
    answer,
}: Readonly<{
    question: string;
    answer: string;
}>) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex w-full cursor-pointer gap-4 rounded-xl bg-secondary p-5 shadow-sm transition-all duration-300 hover:bg-secondary/80 hover:shadow-md sm:gap-5 sm:p-6"
        >
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 transition-all group-hover:bg-accent/20 sm:h-8 sm:w-8">
                <div className="transition-all">
                    {isOpen ? (
                        <Remove className="h-5 w-5 fill-accent transition-all sm:h-6 sm:w-6" />
                    ) : (
                        <Add className="h-5 w-5 fill-accent transition-all sm:h-6 sm:w-6" />
                    )}
                </div>
            </div>
            <div className="flex-1 text-left">
                <div className="flex w-full flex-col gap-3 sm:gap-4">
                    <h3 className="text-base leading-tight font-bold transition-colors sm:text-lg lg:text-xl">
                        {question}
                    </h3>
                </div>
                <div
                    className={cn(
                        'overflow-hidden transition-all duration-300 ease-in-out',
                        isOpen
                            ? 'mt-3 max-h-96 opacity-100 sm:mt-4'
                            : 'max-h-0 opacity-0',
                    )}
                >
                    <p className="text-sm leading-relaxed text-gray-700 transition-all sm:text-base">
                        {answer}
                    </p>
                </div>
            </div>
        </button>
    );
}
