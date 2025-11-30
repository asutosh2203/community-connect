import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile"]; // Add any other routes here
export function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  // Check if the user is trying to access a protected route
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    // If no token, redirect to the login page
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("redirected", "true"); // tell login page why
      return NextResponse.redirect(loginUrl);
    }
  }

  // If they have a token, or it's not a protected route, let them continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
