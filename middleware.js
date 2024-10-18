// middleware is a function by default a code run after request and before response
// there is only one middleware.js in the project root
// used for authentication, authorization, server-side analytics, redirect based on geolocation,
// internationalization, A/B testing, read/set incoming cookies and headers based on the response etc
// runs every single route by default but use matcher to specify which routes it runs
// only one exception case that the middleware can bypass the app route and directly to the client - a JSON like API response
/* export function middleware(request) {
  console.log(request) // properties of incoming request
  // redirect from the following matcher routes /account or /cabins to about page
  return NextResponse.redirect(new URL('/about', request.url))
}*/

import { auth } from './app/_lib/auth';
import { NextResponse } from 'next/server';

// export const middleware = auth; // auth returns session object and middleware

export async function middleware(request) {
  const session = await auth();
  const { pathname } = request.nextUrl;
 
  if (pathname === "/login" && session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
 
  if (pathname.startsWith("/account") && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  } 
 
  return NextResponse.next();
}

// specify which routes will be running this middleware to protect account page and sub segment
export const config = {
  matcher: ["/login", "/account/:path*"], 
};
