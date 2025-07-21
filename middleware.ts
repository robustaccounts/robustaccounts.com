import { NextRequest, NextResponse } from 'next/server';
import { captureEvent } from '@/lib/amplitude';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    captureEvent('page_view', {
        path: pathname,
    });
    return NextResponse.next();
}