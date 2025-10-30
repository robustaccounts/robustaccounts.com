export interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
    timezone: string;
    timezoneAbbrev: string;
    startDateUtc: string;
}

// Generate dates from current day for the next 2 weeks (14 days)
export const getAvailableDates = (): Date[] => {
    const dates = [];
    const today = new Date();

    // Generate dates for the next 14 days
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        // Skip weekends (Saturday = 6, Sunday = 0)
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            dates.push(date);
        }
    }

    return dates;
};

// Helper: build a UTC Date for a given local time in a specific IANA timezone
// Takes a local time (e.g., 1:00 PM ET) and returns the corresponding UTC Date
// Automatically handles EST/EDT conversion based on the date
export const getUtcForTimeZone = (
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    timeZone: string,
): Date => {
    // Start with an estimate: treat the input as if it were UTC
    let utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

    // Check what this UTC time displays as in the target timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const parts = formatter.formatToParts(utcDate);
    const displayHour = parseInt(
        parts.find((p) => p.type === 'hour')?.value || '0',
    );
    const displayMinute = parseInt(
        parts.find((p) => p.type === 'minute')?.value || '0',
    );

    // Calculate the difference between what we want (hour:minute) and what we got
    const targetMinutes = hour * 60 + minute;
    const displayMinutes = displayHour * 60 + displayMinute;
    const diffMinutes = targetMinutes - displayMinutes;

    // Adjust the UTC date by this difference
    // This gives us the UTC time that will display as hour:minute in the target timezone
    utcDate = new Date(utcDate.getTime() + diffMinutes * 60 * 1000);

    return utcDate;
};

// Convert an ET time (HH:MM) to UTC date and display format
// Everything is in Eastern Time, so this converts ET time to UTC for storage
export const convertETTimeToUTC = (
    date: Date,
    etTime: string,
): { displayTime: string; utcDate: Date } => {
    // Parse the ET time (24-hour format)
    const [h, m] = etTime.split(':').map(Number);

    // Extract date components directly from the Date object to preserve the calendar date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
    const day = date.getDate();

    // Convert ET time to UTC for storage
    const utcDate = getUtcForTimeZone(
        year,
        month,
        day,
        h,
        m,
        'America/New_York',
    );

    // Format the ET time in 12-hour format for display (e.g., 10:00am)
    const ampm = h >= 12 ? 'pm' : 'am';
    const displayHours = h % 12 || 12;
    const displayTime = `${displayHours}:${m.toString().padStart(2, '0')}${ampm}`;

    return {
        displayTime,
        utcDate,
    };
};

const getTimeZoneAbbreviation = (): string => {
    // Always return "ET" (Eastern Time) for consistency
    // This covers both EST and EDT without confusing users
    return 'ET';
};

// Generate time slots for selected date (9:30 AM to 6:30 PM ET, 30-minute intervals)
// Automatically handles EST (winter) and EDT (summer) conversion
export const getTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const now = new Date();
    const timeZone = 'America/New_York';

    // ET time slots from 9:30 AM to 6:30 PM (30-minute intervals)
    const etTimeSlots = [
        '09:30', // 9:30 AM
        '10:00', // 10:00 AM
        '10:30', // 10:30 AM
        '11:00', // 11:00 AM
        '11:30', // 11:30 AM
        '12:00', // 12:00 PM
        '12:30', // 12:30 PM
        '13:00', // 1:00 PM
        '13:30', // 1:30 PM
        '14:00', // 2:00 PM
        '14:30', // 2:30 PM
        '15:00', // 3:00 PM
        '15:30', // 3:30 PM
        '16:00', // 4:00 PM
        '16:30', // 4:30 PM
        '17:00', // 5:00 PM
        '17:30', // 5:30 PM
        '18:00', // 6:00 PM
        '18:30', // 6:30 PM
    ];

    etTimeSlots.forEach((etTime, index) => {
        const { displayTime, utcDate } = convertETTimeToUTC(
            date,
            etTime,
        );

        // Check if this time slot has passed based on current time
        // utcDate represents the actual moment in time for the ET slot
        // now is the current time - comparing these correctly filters past slots
        const isPast = utcDate < now;

        // Only add slots that haven't passed
        if (!isPast) {
            const timezoneAbbrev = getTimeZoneAbbreviation();
            slots.push({
                id: `${date.toISOString().split('T')[0]}-${index}`,
                time: displayTime,
                available: true,
                timezone: timeZone,
                timezoneAbbrev,
                startDateUtc: utcDate.toISOString(),
            });
        }
    });

    return slots;
};

/**
 * Format a date using only the date components (year, month, day)
 * This preserves the calendar date regardless of timezone
 */
export const formatDate = (date: Date): string => {
    // Extract date components directly to avoid timezone issues
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    // Create a new date at noon local time to avoid timezone shifts
    const dateAtNoon = new Date(year, month, day, 12, 0, 0);
    
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    }).format(dateAtNoon);
};
