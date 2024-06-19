import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const protectedRoutes = ["/", "/dashboard"];
  const next_url = request.nextUrl;
  const next_origin = next_url.origin;

  if (!protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");
  if (!token && request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(`${next_origin}/login`);
  }

  return NextResponse.next();
}
