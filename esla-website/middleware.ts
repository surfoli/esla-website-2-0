import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect /admin routes with a simple session cookie check
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all admin pages
  if (pathname.startsWith('/admin')) {
    const session = req.cookies.get('esla_admin')?.value;
    if (session !== '1') {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
