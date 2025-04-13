"use client"

import { useAuth } from "@/hooks/use-auth"
import { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

/**
 * A component wrapper that redirects to login if the user is not authenticated
 */
export function ProtectedRoute({ 
  children, 
  redirectTo 
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useAuth({ 
    redirectTo: redirectTo || window.location.pathname 
  })

  // Show loading state
  if (isLoading) {
    return (
      <div className="container flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // If authenticated, render children
  if (isAuthenticated) {
    return <>{children}</>
  }

  // For server-side rendered content
  return null
} 