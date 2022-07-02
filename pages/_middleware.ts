import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

// list of protected routes
const protectedRoutes: string[] = ["/all", "/create", "/profile"];

export default async function middleware(req: NextRequest) {
  const { cookies } = req;
  const authToken = cookies.aToken;
  const { pathname: url, origin } = req.nextUrl;

  const isProtectedPage = protectedRoutes.includes(url);
  console.log("isProtectedPage", url, isProtectedPage);

  if (isProtectedPage) {
    if (!authToken) {
      return NextResponse.redirect(`${origin}/login`);
    }

    try {
      const jwtData = await jose.jwtVerify(
        authToken,
        new TextEncoder().encode(process.env.ACCESSTOKEMKEY)
      );
      console.log("jwtData", jwtData);

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  return NextResponse.next();
}
