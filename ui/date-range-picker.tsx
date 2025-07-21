'use client';

import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    isBefore,
    isSameDay,
    isSameMonth,
    isToday,
    isWithinInterval,
    startOfMonth,
    subMonths,
} from 'date-fns';
import { useState } from 'react';

import { ChevronRight } from '@/ui/icons/google-icons';

interface DateRange {
    start: Date | null;
    end: Date | null;
}

interface DateRangePickerProps {
    selectedRange?: DateRange;
    onRangeSelect?: (range: DateRange) => void;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
}

// Single calendar component
interface CalendarProps {
    month: Date;
    selectedRange?: DateRange;
    hoverDate?: Date | null;
    onDateClick: (date: Date) => void;
    onDateHover: (date: Date | null) => void;
    isDateDisabled: (date: Date) => boolean;
    getDateClassName: (date: Date, month: Date) => string;
}

const SingleCalendar = ({
    month,
    selectedRange, // eslint-disable-line @typescript-eslint/no-unused-vars
    hoverDate, // eslint-disable-line @typescript-eslint/no-unused-vars
    onDateClick,
    onDateHover,
    isDateDisabled,
    getDateClassName,
}: CalendarProps) => {
    const days = eachDayOfInterval({
        start: startOfMonth(month),
        end: endOfMonth(month),
    });

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day) => (
                        <div key={day} className="font-medium text-black">
                            {day}
                        </div>
                    ),
                )}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => (
                    <button
                        key={day.toString()}
                        onClick={() => onDateClick(day)}
                        onMouseEnter={() => onDateHover(day)}
                        onMouseLeave={() => onDateHover(null)}
                        disabled={isDateDisabled(day)}
                        className={getDateClassName(day, month)}
                    >
                        {format(day, 'd')}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default function DateRangePicker({
    selectedRange,
    onRangeSelect,
    minDate,
    maxDate,
    className = '',
}: Readonly<DateRangePickerProps>) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    // Get both months for dual calendar view
    const leftMonth = currentMonth;
    const rightMonth = addMonths(currentMonth, 1);

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

    const handleDateClick = (date: Date) => {
        if (isDateDisabled(date)) return;

        if (
            !selectedRange?.start ||
            (selectedRange.start && selectedRange.end)
        ) {
            // Start new selection
            onRangeSelect?.({ start: date, end: null });
        } else if (selectedRange.start && !selectedRange.end) {
            // Complete the range
            if (isBefore(date, selectedRange.start)) {
                // If clicked date is before start, make it the new start
                onRangeSelect?.({ start: date, end: selectedRange.start });
            } else {
                // Normal case: clicked date becomes end
                onRangeSelect?.({ start: selectedRange.start, end: date });
            }
        }
    };

    const isDateInRange = (date: Date) => {
        if (!selectedRange?.start) return false;

        if (selectedRange.end) {
            return isWithinInterval(date, {
                start: selectedRange.start,
                end: selectedRange.end,
            });
        }

        // If only start is selected, show preview range with hover
        if (hoverDate && !isBefore(hoverDate, selectedRange.start)) {
            return isWithinInterval(date, {
                start: selectedRange.start,
                end: hoverDate,
            });
        }

        return false;
    };

    const isRangeStart = (date: Date) => {
        return selectedRange?.start
            ? isSameDay(date, selectedRange.start)
            : false;
    };

    const isRangeEnd = (date: Date) => {
        if (selectedRange?.end) {
            return isSameDay(date, selectedRange.end);
        }
        // Show preview end on hover
        if (selectedRange?.start && hoverDate && !selectedRange.end) {
            return (
                isSameDay(date, hoverDate) &&
                !isBefore(hoverDate, selectedRange.start)
            );
        }
        return false;
    };

    const getDateClassName = (date: Date, month: Date) => {
        const isCurrentMonth = isSameMonth(date, month);
        const disabled = isDateDisabled(date);
        const inRange = isDateInRange(date);
        const rangeStart = isRangeStart(date);
        const rangeEnd = isRangeEnd(date);
        const todayDate = isToday(date);

        let className = 'h-8 w-full cursor-pointer text-sm relative ';

        if (!isCurrentMonth) {
            className += 'text-primary/50 ';
        }

        if (disabled) {
            className += 'cursor-not-allowed opacity-50 ';
        } else {
            if (rangeStart || rangeEnd) {
                className += 'bg-primary text-white rounded-full z-10 ';
            } else if (inRange) {
                className += 'bg-secondary text-primary rounded-full ';
            } else if (todayDate) {
                className += 'bg-secondary text-primary rounded-full ';
            } else {
                className +=
                    'hover:bg-primary hover:text-white hover:rounded-full ';
            }
        }

        return className;
    };

    const handleDateHover = (date: Date | null) => {
        setHoverDate(date);
    };

    return (
        <div className={`w-full max-w-2xl space-y-4 ${className}`}>
            {/* Navigation Header */}
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={previousMonth}
                    className="group hover:bg-primary cursor-pointer rounded-full p-2"
                    aria-label="Previous month"
                >
                    <ChevronRight className="h-6 w-6 rotate-180 fill-black group-hover:fill-white" />
                </button>
                <div className="flex flex-1 justify-center gap-24">
                    <h2 className="text-center text-lg font-semibold">
                        {format(leftMonth, 'MMMM yyyy')}
                    </h2>
                    <h2 className="text-center text-lg font-semibold">
                        {format(rightMonth, 'MMMM yyyy')}
                    </h2>
                </div>
                <button
                    onClick={nextMonth}
                    className="group hover:bg-primary cursor-pointer rounded-full p-2"
                    aria-label="Next month"
                >
                    <ChevronRight className="h-6 w-6 fill-black group-hover:fill-white" />
                </button>
            </div>

            {/* Dual Calendar Grid */}
            <div className="grid grid-cols-2 gap-8">
                <SingleCalendar
                    month={leftMonth}
                    selectedRange={selectedRange}
                    hoverDate={hoverDate}
                    onDateClick={handleDateClick}
                    onDateHover={handleDateHover}
                    isDateDisabled={isDateDisabled}
                    getDateClassName={getDateClassName}
                />
                <SingleCalendar
                    month={rightMonth}
                    selectedRange={selectedRange}
                    hoverDate={hoverDate}
                    onDateClick={handleDateClick}
                    onDateHover={handleDateHover}
                    isDateDisabled={isDateDisabled}
                    getDateClassName={getDateClassName}
                />
            </div>

            {/* Selected Range Display */}
            {selectedRange?.start && (
                <div className="text-primary text-center text-sm">
                    {selectedRange.end ? (
                        <span>
                            {format(selectedRange.start, 'MMM d')} -{' '}
                            {format(selectedRange.end, 'MMM d, yyyy')}
                        </span>
                    ) : (
                        <span>Select return date</span>
                    )}
                </div>
            )}
        </div>
    );
}
