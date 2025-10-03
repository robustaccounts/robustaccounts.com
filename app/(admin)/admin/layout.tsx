import type { ReactNode } from 'react';

import AdminAuthGate from './components/admin-auth-gate';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AdminAuthGate>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
                {children}
            </div>
        </AdminAuthGate>
    );
}
