import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // Auth gate disabled: the app is now open, so visiting "/" goes
  // straight to the dashboard without requiring a login cookie first.
  // This also avoids the iframe/third-party-cookie problem seen on
  // preview platforms (e.g. Envato) — see explanation below.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/users/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/attributes/:path*",
  ],
};