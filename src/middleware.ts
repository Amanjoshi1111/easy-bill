import { NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"

const publicRoutes = [
    "/",
]

const authRoutes = [
    "/login",
    "/verify"
]

const { auth } = NextAuth(authConfig)
export default auth(async (req) => {

    const { nextUrl } = req;
    const pathname = nextUrl.pathname;
    const isLoggedIn = !!req.auth;
    const isAuthRoute = authRoutes.includes(pathname);

    console.log({ pathname, isLoggedIn, isAuthRoute });

    if (!isLoggedIn) {
        if (isAuthRoute || publicRoutes.includes(pathname) || pathname.includes("/api/auth")) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/login", nextUrl.origin));
        }
    }
    if (isLoggedIn) {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/", nextUrl.origin));
        } else {
            return NextResponse.next();
        }
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ]
}

