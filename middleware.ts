import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Log the request path for debugging
  console.log('Middleware processing:', request.nextUrl.pathname);

  const userRole = request.cookies.get('userRole')?.value;
  const isPublicPath = request.nextUrl.pathname === '/login';

  // Redirect authenticated users from /login to /
  if (isPublicPath && userRole) {
    console.log('Redirecting authenticated user from /login to /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users from non-public paths to /login
  if (!isPublicPath && !userRole) {
    console.log('Redirecting unauthenticated user to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static assets, API routes, and server action endpoints
    '/((?!_next/static|_next/image|_next/server-action|api/|favicon.ico|images|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.svg).*)',
  ],
};