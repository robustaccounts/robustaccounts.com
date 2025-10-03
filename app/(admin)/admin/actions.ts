'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
    ADMIN_AUTH_COOKIE,
    getAdminAuthHash,
    isCookieAuthorized,
    isPasswordValid,
} from '@/lib/admin-auth';

interface AdminAuthState {
    ok: boolean;
    error?: string;
}

const ADMIN_LOGIN_PATH = '/admin/blog/cms';

export async function authenticateAdmin(
    _prevState: AdminAuthState,
    formData: FormData,
): Promise<AdminAuthState> {
    try {
        const password = String(formData.get('password') ?? '');

        if (!isPasswordValid(password)) {
            return {
                ok: false,
                error: 'Incorrect password. Please try again.',
            };
        }

        const cookieStore = await cookies();
        cookieStore.set(ADMIN_AUTH_COOKIE, getAdminAuthHash(), {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        });

        revalidatePath(ADMIN_LOGIN_PATH);

        return { ok: true };
    } catch (error) {
        console.error('Failed to authenticate admin:', error);
        return {
            ok: false,
            error: 'Admin password is not configured. Set ADMIN_DASHBOARD_PASSWORD.',
        };
    }
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

    if (token && isCookieAuthorized(token)) {
        cookieStore.delete(ADMIN_AUTH_COOKIE);
    }

    revalidatePath(ADMIN_LOGIN_PATH);
    redirect(ADMIN_LOGIN_PATH);
}
