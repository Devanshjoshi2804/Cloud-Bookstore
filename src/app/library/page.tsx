"use client"

import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function LibraryPage() {
  return (
    <ProtectedRoute redirectTo="/library">
      <LibraryContent />
    </ProtectedRoute>
  )
}

function LibraryContent() {
  const { data: session } = useSession()

  return (
    <div className="container max-w-5xl py-12">
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">Your Library</h1>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Welcome to your personal library, {session?.user?.name || "Reader"}!
          </p>
          
          <div className="rounded-md bg-muted p-4">
            <p className="mb-4">You have access to this page because you are authenticated.</p>
            <p className="text-sm">User ID: <span className="font-mono">{session?.user?.id}</span></p>
          </div>
          
          <div className="pt-6 flex gap-4">
            <Button asChild variant="outline">
              <Link href="/books">Browse Books</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/profile">View Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 