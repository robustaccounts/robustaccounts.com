/**
 * Logger Utility
 *
 * Structured logging for API routes and cron jobs.
 * Provides consistent log formatting across the application.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
    [key: string]: unknown;
}

function formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
}

function log(level: LogLevel, message: string, context?: LogContext) {
    const formatted = formatMessage(level, message, context);
    switch (level) {
        case 'error':
            console.error(formatted);
            break;
        case 'warn':
            console.warn(formatted);
            break;
        default:
            console.log(formatted);
    }
}

function logWithError(
    level: LogLevel,
    message: string,
    error?: unknown,
    context?: LogContext,
) {
    const errorContext = error
        ? {
              error: error instanceof Error ? error.message : String(error),
              ...context,
          }
        : context;
    log(level, message, errorContext);
}

export const logger = {
    debug: (message: string, context?: LogContext) =>
        log('debug', message, context),
    info: (message: string, context?: LogContext) =>
        log('info', message, context),
    warn: (message: string, errorOrContext?: unknown, context?: LogContext) => {
        if (
            errorOrContext &&
            typeof errorOrContext === 'object' &&
            !('error' in (errorOrContext as object)) &&
            !(errorOrContext instanceof Error)
        ) {
            // Second arg is context
            log('warn', message, errorOrContext as LogContext);
        } else {
            // Second arg is error
            logWithError('warn', message, errorOrContext, context);
        }
    },
    error: (
        message: string,
        errorOrContext?: unknown,
        context?: LogContext,
    ) => {
        if (
            errorOrContext &&
            typeof errorOrContext === 'object' &&
            !('error' in (errorOrContext as object)) &&
            !(errorOrContext instanceof Error)
        ) {
            // Second arg is context
            log('error', message, errorOrContext as LogContext);
        } else {
            // Second arg is error
            logWithError('error', message, errorOrContext, context);
        }
    },

    // API-specific logging
    apiStart: (method: string, path: string, context?: LogContext) =>
        log('info', `API ${method} ${path} started`, context),
    apiSuccess: (
        method: string,
        path: string,
        status: number,
        duration: number,
        context?: LogContext,
    ) =>
        log('info', `API ${method} ${path} completed`, {
            status,
            duration: `${duration}ms`,
            ...context,
        }),
    apiError: (
        method: string,
        path: string,
        error: unknown,
        status: number,
        context?: LogContext,
    ) =>
        log('error', `API ${method} ${path} failed`, {
            status,
            error: error instanceof Error ? error.message : String(error),
            ...context,
        }),

    // Cron job-specific logging
    cronStart: (jobName: string, context?: LogContext) =>
        log('info', `Cron job [${jobName}] started`, context),
    cronSuccess: (jobName: string, duration: number, context?: LogContext) =>
        log('info', `Cron job [${jobName}] completed`, {
            duration: `${duration}ms`,
            ...context,
        }),
    cronError: (jobName: string, error: unknown, context?: LogContext) =>
        log('error', `Cron job [${jobName}] failed`, {
            error: error instanceof Error ? error.message : String(error),
            ...context,
        }),
};

export type Logger = typeof logger;
