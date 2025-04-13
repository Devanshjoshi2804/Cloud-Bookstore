"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"

export function UserAuthStatus() {
  const { data: session, status } = useSession()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient || status === "loading") {
    return <div className="h-9 w-20 animate-pulse rounded-md bg-muted"></div>
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/profile">
            {session.user.name || session.user.email}
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href="/auth">Sign in</Link>
      </Button>
      <Button variant="default" size="sm" asChild>
        <Link href="/auth?signup=true">Sign up</Link>
      </Button>
    </div>
  )
} 