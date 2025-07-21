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
            className="flex w-full cursor-pointer gap-4 rounded-lg bg-secondary p-4 transition-all duration-500 hover:bg-secondary/80"
        >
            <div className="flex h-6 w-6 items-center justify-center">
                <div className="transition-all">
                    {isOpen ? (
                        <Remove className="h-6 w-6 fill-black transition-all" />
                    ) : (
                        <Add className="h-6 w-6 fill-black transition-all" />
                    )}
                </div>
            </div>
            <div className="flex-1">
                <div className="flex w-full flex-col gap-4">
                    <h3 className="text-left text-lg font-semibold transition-colors">
                        {question}
                    </h3>
                    {/* <ExpandMore
                    className={cn(
                        'h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200',
                        isOpen && 'rotate-180',
                    )}
                /> */}
                </div>
                <div
                    className={cn(
                        'overflow-hidden transition-all ease-in-out',
                        isOpen
                            ? 'mt-4 max-h-96 opacity-100'
                            : 'max-h-0 opacity-0',
                    )}
                >
                    <p className="text-left leading-relaxed transition-all">
                        {answer}
                    </p>
                </div>
            </div>
        </button>
    );
}
