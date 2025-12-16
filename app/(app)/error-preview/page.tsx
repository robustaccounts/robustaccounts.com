import { redirect } from 'next/navigation';

// Development-only route to preview error page styling
export default function ErrorPreviewPage() {
    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
        redirect('/');
    }

    // Throw an error to trigger the error boundary
    throw new Error(
        'This is a preview of the error page styling. This error is intentional for development purposes.',
    );
}
