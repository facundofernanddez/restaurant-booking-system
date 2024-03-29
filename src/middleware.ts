import { NextResponse, type NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  // const token = req.cookies.get("user-token")?.value;
  const token = cookies().get("user-token")?.value;

  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.log(err)));

  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
    return;
  }

  const url = req.url;

  if (url.includes("login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/login"],
};
