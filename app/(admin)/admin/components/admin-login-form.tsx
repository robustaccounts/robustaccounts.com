'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { authenticateAdmin } from '../actions';

const initialState = { ok: false, error: undefined as string | undefined };

export default function AdminLoginForm() {
    const router = useRouter();
    const [state, formAction] = useFormState(authenticateAdmin, initialState);

    useEffect(() => {
        if (state?.ok) {
            router.refresh();
        }
    }, [router, state?.ok]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 p-4">
                        <Image
                            src="/assets/logo.png"
                            alt="Robust Accounts Logo"
                            width={64}
                            height={64}
                            className="h-16 w-16 object-contain"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your password to manage blog content and settings
                    </p>
                </div>

                <form action={formAction} className="mt-8 space-y-5">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                            placeholder="Enter your admin password"
                        />
                    </div>

                    {state?.error && (
                        <div className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-sm font-medium text-red-700">
                                {state.error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-accent px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
                    >
                        Access Dashboard
                    </button>
                </form>

                <div className="mt-6 border-t border-gray-200 pt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Protected by secure authentication
                    </p>
                </div>
            </div>
        </div>
    );
}
