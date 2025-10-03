import Link from 'next/link';
import contactInfo from '@/data/contact-info';

export default function NotFound() {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-white px-4"
            style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
            }}
        >
            <div className="w-full max-w-md text-center">
                <div className="mb-8">
                    <h1
                        className="mb-4 text-9xl font-bold"
                        style={{ color: 'var(--primary)' }}
                    >
                        404
                    </h1>
                    <h2
                        className="mb-4 text-2xl font-semibold"
                        style={{ color: 'var(--foreground)' }}
                    >
                        Page Not Found
                    </h2>
                    <p
                        className="mb-8"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        Sorry, the page you're looking for doesn't exist or has
                        been moved.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link href="/" passHref>
                        <button className="w-auto cursor-pointer rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:bg-primary/90">
                            Go Back Home
                        </button>
                    </Link>
                </div>

                <div
                    className="mt-12 text-sm"
                    style={{ color: 'var(--color-accent)' }}
                >
                    <p>Need help? Our team is here to assist you.</p>
                    <p className="mt-1">
                        Call us at{' '}
                        <a
                            href={`tel:${contactInfo.phoneHref}`}
                            style={{ color: 'var(--primary)' }}
                            className="hover:underline"
                        >
                            {contactInfo.phoneDisplay}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
