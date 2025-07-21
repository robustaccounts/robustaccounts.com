'use client';

import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    subMonths,
} from 'date-fns';
import { useState } from 'react';

import { ChevronRight } from '@/ui/icons/google-icons';

interface CalendarProps {
    selectedDate?: Date;
    onDateSelect?: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
}

export default function Calendar({
    selectedDate,
    onDateSelect,
    minDate,
    maxDate,
    className = '',
}: Readonly<CalendarProps>) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const previousMonth = () => {
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    const nextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
    };

    const isDateDisabled = (date: Date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
    };

    return (
        <div className={`w-full max-w-sm space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
                <button
                    onClick={previousMonth}
                    className="hover:bg-primary cursor-pointer rounded-full p-2"
                    aria-label="Previous month"
                >
                    <ChevronRight className="fill-secondary h-6 w-6 rotate-180" />
                </button>
                <h2 className="font-semibold">
                    {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <button
                    onClick={nextMonth}
                    className="hover:bg-primary cursor-pointer rounded-full p-2"
                    aria-label="Next month"
                >
                    <ChevronRight className="fill-secondary h-6 w-6" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day) => (
                        <div key={day} className="text-primary font-medium">
                            {day}
                        </div>
                    ),
                )}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                    const isSelected = selectedDate
                        ? isSameDay(day, selectedDate)
                        : false;
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const disabled = isDateDisabled(day);
                    const todayDate = isToday(day);

                    let buttonClasses =
                        'h-8 w-full cursor-pointer rounded-full text-sm ';

                    if (!isCurrentMonth) {
                        buttonClasses += 'text-primary/50 ';
                    }

                    if (disabled) {
                        buttonClasses += 'cursor-not-allowed opacity-50 ';
                    } else {
                        if (isSelected) {
                            buttonClasses +=
                                'bg-primary text-white hover:bg-secondary ';
                        } else if (todayDate) {
                            buttonClasses +=
                                'bg-primary/20 text-primary font-semibold border border-primary ';
                        } else {
                            buttonClasses +=
                                'hover:bg-primary hover:text-white ';
                        }
                    }

                    return (
                        <button
                            key={day.toString()}
                            onClick={() => !disabled && onDateSelect?.(day)}
                            disabled={disabled}
                            className={buttonClasses}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
