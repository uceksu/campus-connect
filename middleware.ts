import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = [
  "/portal-admin/login",
  "/api/auth",
  "/_next",
  "/favicon.ico",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  if (isPublicPath) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token || !token?.role) {
    const signInUrl = new URL("/portal-admin/login", request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (!["ADMIN", "SUPER_ADMIN"].includes(token.role as string)) {
    return NextResponse.redirect(new URL("/portal-admin/login", request.url));
  }

  // RBAC for ADMINs (Sub-admins)
  if (token.role === "ADMIN" && pathname.startsWith("/admin/")) {
    const permissions = (token.permissions as string[]) || [];
    
    // Sub-admins can NEVER access the sub-admins management page
    if (pathname.startsWith("/admin/sub-admins")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Extract the section from the pathname, e.g. "/admin/hostels/add" -> "hostels"
    const pathParts = pathname.split("/");
    const section = pathParts[2]; // e.g. "hostels"

    // If it's a specific section (not just "/admin"), check permissions
    if (section && section !== "sub-admins") {
      if (!permissions.includes(section)) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*", "/portal-admin/:path*"],
};
