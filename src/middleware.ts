import { auth } from "@/auth"
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const pathname = req.nextUrl.pathname

  // Skip authentication check for the /share route
  if (pathname.startsWith('/share')) {
    return NextResponse.next();
  }

  // If the user is not authenticated and not on the signin page, redirect to signin
  if (!isAuthenticated && !pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If the user is authenticated and on the signin page or root, redirect to home
  if (isAuthenticated && (pathname === '/signin' || pathname === '/')) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // For all other cases, allow the req to proceed
  return NextResponse.next();
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/", "/home", "/signin"],
}