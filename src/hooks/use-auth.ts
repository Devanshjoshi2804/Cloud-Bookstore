"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * A custom hook for handling authentication in components
 * @param redirectTo - Where to redirect unauthenticated users
 * @param redirectIfAuthenticated - Where to redirect authenticated users
 */
export function useAuth({
  redirectTo = "",
  redirectIfAuthenticated = "",
}: {
  redirectTo?: string
  redirectIfAuthenticated?: string
} = {}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip if we're still loading the auth state
    if (status === "loading") return

    // Handle client-side redirects based on auth state
    if (redirectTo && status === "unauthenticated") {
      router.replace(`/auth?redirectedFrom=${encodeURIComponent(redirectTo)}`)
    } else if (redirectIfAuthenticated && status === "authenticated") {
      router.replace(redirectIfAuthenticated)
    }

    // Auth check complete
    setIsLoading(false)
  }, [status, router, redirectTo, redirectIfAuthenticated])

  return {
    session,
    status,
    isLoading,
    isAuthenticated: status === "authenticated",
  }
} 