import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
    // Redirect every request to /breve
    console.log(request.url)
    return NextResponse.redirect(new URL('/breve', request.url))
}

// Define the paths the middleware should run on
export const config = {
    matcher: ['/', '/historico'],
};