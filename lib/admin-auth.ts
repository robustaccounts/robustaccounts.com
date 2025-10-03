import crypto from 'crypto';

export const ADMIN_AUTH_COOKIE = 'admin-auth';

export function getAdminPassword(): string {
    const password = process.env.ADMIN_DASHBOARD_PASSWORD;
    if (!password) {
        throw new Error('ADMIN_DASHBOARD_PASSWORD is not configured.');
    }
    return password;
}

export function getAdminAuthHash(): string {
    const password = getAdminPassword();
    return crypto.createHash('sha256').update(password).digest('hex');
}

export function isPasswordValid(input: string): boolean {
    if (typeof input !== 'string') {
        return false;
    }

    return input === getAdminPassword();
}

export function isCookieAuthorized(cookieValue: string | undefined): boolean {
    if (!cookieValue) {
        return false;
    }

    return cookieValue === getAdminAuthHash();
}
