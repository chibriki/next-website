import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('userRole')?.value;
  const isPublicPath = request.nextUrl.pathname === '/login';

  if (isPublicPath && userRole) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicPath && !userRole) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.svg).*)',
  ],
};
