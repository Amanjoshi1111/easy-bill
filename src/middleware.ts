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

    //If route is public, return
    if (publicRoutes.includes(pathname) || authRoutes.includes(pathname)) {
        return NextResponse.next();
    }
    //If it's auth api
    if (pathname.includes("/api/auth")) {
        return NextResponse.next();
    }
    const isLoggedIn = !!req.auth;
    const isAuthRoute = authRoutes.includes(pathname);

    console.log({ pathname, isLoggedIn, isAuthRoute });

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl.origin));
    }

    //If logged in and it's authRoute(page), redirect to '/' page 
    // No need to show /login, /verify
    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }

    //if logged in and not a authRoute(page), good to go
    if (isLoggedIn && !isAuthRoute) {
        // const session = await auth();
        //if user is not onboarded just allow him "/" screen
        // if(!session?.user.isOnboarded && (!publicRoutes.includes(pathname)))
        // if (!session?.user.isOnboarded && !(pathname === "/onboarding" || pathname === "/")) {
        //     return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
        // }
        return NextResponse.next();
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

