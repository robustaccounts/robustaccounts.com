import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import {
    ADMIN_AUTH_COOKIE,
    getAdminPassword,
    isCookieAuthorized,
} from '@/lib/admin-auth';

import AdminLoginForm from './admin-login-form';

interface AdminAuthGateProps {
    children: ReactNode;
}

export default async function AdminAuthGate({ children }: AdminAuthGateProps) {
    let passwordConfigured = true;

    try {
        getAdminPassword();
    } catch {
        passwordConfigured = false;
    }

    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
    const isAuthenticated =
        passwordConfigured && isCookieAuthorized(cookieValue);

    if (!passwordConfigured) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-md rounded-2xl border-2 border-red-200 bg-white p-8 text-center shadow-xl">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <svg
                            className="h-8 w-8 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Admin Access Misconfigured
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                        Set{' '}
                        <code className="rounded-lg bg-gray-100 px-2 py-1 font-mono text-xs font-semibold text-red-600">
                            ADMIN_DASHBOARD_PASSWORD
                        </code>{' '}
                        in your environment variables to enable the admin
                        dashboard.
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <AdminLoginForm />;
    }

    return <>{children}</>;
}
