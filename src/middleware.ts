import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // If the user is authenticated
    if (token) {
      // If trying to access the root page or auth pages, redirect to dashboard
      if (pathname === '/' || pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // If companyId is not present on the token for dashboard routes, redirect to sign-in (potential session issue)
      if (pathname.startsWith("/dashboard") && !token.companyId) {
        console.warn("User token is missing companyId in middleware for /dashboard path. Redirecting to signin.");
        return NextResponse.redirect(new URL("/auth/signin?error=SessionInvalid", req.url));
      }
    }
    // If not authenticated and trying to access a protected route, 
    // withAuth will handle redirection to signIn page based on `pages` config.

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // If there is a token, the user is authorized
    },
    pages: {
      signIn: "/auth/signin", // Redirect to this page if not authorized
      // error: "/auth/error", // Optional error page
    },
  }
);

// Configure which paths are protected by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication routes like signin, signup)
     * - public assets (if you have any directly served, e.g., /images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|auth).*)", // Excluded /auth paths
    // The matcher includes '/' and now excludes '/auth/*' paths from this rule.
    // The logic within the middleware function itself handles authenticated users on '/' or '/auth/*'.
    // Unauthenticated users trying to access other protected paths will be redirected by withAuth's default behavior.
    // Add specific paths if the general matcher is too broad or if you want to protect the root explicitly
    // "/dashboard/:path*",
    // "/profile/:path*",
  ],
}; 