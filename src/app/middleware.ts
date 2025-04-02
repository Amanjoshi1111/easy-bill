export { auth as middleware } from "@/auth"



// export default auth((req) => {
//     console.log(req);
//     // if (!req.auth && req.nextUrl.pathname !== 'login') { 
//     console.log({pathName: req.nextUrl.pathname});
//         const newUrl = new URL("/login", req.nextUrl.origin);
//         return Response.redirect(newUrl);
//     // }
// })

// export const config = {
//     matcher: [
//         // Skip Next.js internals and all static files, unless found in search params
//         '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//         // Always run for API routes
//         '/(api|trpc)(.*)',
//     ],
// }