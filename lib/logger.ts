/**
 * Structured logging utility for backend APIs
 * Provides consistent logging format with timestamps and context
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    [key: string]: unknown;
}

class Logger {
    private formatMessage(
        level: LogLevel,
        message: string,
        context?: LogContext,
    ): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` ${JSON.stringify(context)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
    }

    private log(level: LogLevel, message: string, context?: LogContext) {
        const formattedMessage = this.formatMessage(level, message, context);

        switch (level) {
            case 'error':
                console.error(formattedMessage);
                break;
            case 'warn':
                console.warn(formattedMessage);
                break;
            case 'debug':
                if (
                    process.env.NODE_ENV === 'development' ||
                    process.env.EMAIL_DEBUG === '1'
                ) {
                    console.debug(formattedMessage);
                }
                break;
            case 'info':
            default:
                console.log(formattedMessage);
                break;
        }
    }

    info(message: string, context?: LogContext) {
        this.log('info', message, context);
    }

    warn(message: string, context?: LogContext) {
        this.log('warn', message, context);
    }

    error(message: string, error?: unknown, context?: LogContext) {
        const errorContext: LogContext = {
            ...context,
        };

        if (error instanceof Error) {
            errorContext.error = {
                message: error.message,
                name: error.name,
                stack: error.stack,
            };
        } else if (error) {
            errorContext.error = error;
        }

        this.log('error', message, errorContext);
    }

    debug(message: string, context?: LogContext) {
        this.log('debug', message, context);
    }

    /**
     * Log API request start
     */
    apiStart(method: string, path: string, context?: LogContext) {
        this.info(`API ${method} ${path} - Started`, {
            method,
            path,
            ...context,
        });
    }

    /**
     * Log API request success
     */
    apiSuccess(
        method: string,
        path: string,
        statusCode: number,
        duration?: number,
        context?: LogContext,
    ) {
        this.info(`API ${method} ${path} - Success`, {
            method,
            path,
            statusCode,
            duration: duration ? `${duration}ms` : undefined,
            ...context,
        });
    }

    /**
     * Log API request error
     */
    apiError(
        method: string,
        path: string,
        error: unknown,
        statusCode?: number,
        context?: LogContext,
    ) {
        this.error(`API ${method} ${path} - Error`, error, {
            method,
            path,
            statusCode,
            ...context,
        });
    }

    /**
     * Log cron job start
     */
    cronStart(jobName: string, context?: LogContext) {
        this.info(`Cron Job: ${jobName} - Started`, {
            jobName,
            ...context,
        });
    }

    /**
     * Log cron job success
     */
    cronSuccess(jobName: string, duration?: number, results?: LogContext) {
        this.info(`Cron Job: ${jobName} - Completed`, {
            jobName,
            duration: duration ? `${duration}ms` : undefined,
            ...results,
        });
    }

    /**
     * Log cron job error
     */
    cronError(jobName: string, error: unknown, context?: LogContext) {
        this.error(`Cron Job: ${jobName} - Failed`, error, {
            jobName,
            ...context,
        });
    }
}

// Export singleton instance
export const logger = new Logger();
