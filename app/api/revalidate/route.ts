import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Get secret from query params or body
        const secret =
            request.nextUrl.searchParams.get('secret') ||
            (await request.json().catch(() => ({})))?.secret;

        // Verify secret token
        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 },
            );
        }

        // Get optional path to revalidate
        const path =
            request.nextUrl.searchParams.get('path') ||
            (await request.json().catch(() => ({})))?.path;

        // Revalidate blog paths
        revalidatePath('/blog');
        revalidateTag('blog');

        // If a specific path is provided, revalidate it too
        if (path) {
            revalidatePath(path);
        }

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            paths: ['/blog', path].filter(Boolean),
        });
    } catch (error) {
        console.error('Error revalidating:', error);
        return NextResponse.json(
            {
                message: 'Error revalidating',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        );
    }
}
