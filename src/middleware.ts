import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define paths that don't require authentication
const publicPaths = [
  '/auth',
  '/api/auth',
  '/',  // Landing page
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )

  // Get the authentication token - if it exists, the user is logged in
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  
  // If the user is not logged in and trying to access a protected route, redirect to login
  if (!token && !isPublicPath) {
    const url = new URL('/auth', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // If the user is logged in and trying to access the login page, redirect to the dashboard
  if (token && pathname === '/auth') {
    return NextResponse.redirect(new URL('/library', request.url))
  }

  return NextResponse.next()
}

// Configure which paths this middleware applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
} 