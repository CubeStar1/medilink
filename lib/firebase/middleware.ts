import { NextResponse, type NextRequest } from "next/server";
import { protectedPaths, authPaths, DEFAULT_LOGIN_REDIRECT } from "@/lib/constants";

export async function updateSession(request: NextRequest) {
  // Get Firebase session token from cookie
  const sessionCookie = request.cookies.get('__session')?.value;
  const url = new URL(request.url);
  const next = url.searchParams.get("next");

  // Check if user is authenticated
  const isAuthenticated = !!sessionCookie;

  // Handle protected routes
  if (!isAuthenticated && protectedPaths.some(path => url.pathname.startsWith(path))) {
    const redirectUrl = new URL('/signin', request.url);
    if (next || url.pathname !== '/') {
      redirectUrl.searchParams.set('next', next || url.pathname);
    }
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.includes(url.pathname)) {
    const redirectUrl = new URL(next || DEFAULT_LOGIN_REDIRECT, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
} 