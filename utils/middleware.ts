import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token"); 
  const url = req.nextUrl.clone();

  if (!token && url.pathname.startsWith("/admin/dashboard")) {
    url.pathname = "/admin/login"; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
