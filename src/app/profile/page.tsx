"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"

export default function ProfilePage() {
  return (
    <ProtectedRoute redirectTo="/profile">
      <ProfileContent />
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const { data: session } = useSession()
  
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className="container max-w-5xl py-12">
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>
        
        <div className="space-y-6">
          <div className="grid gap-2">
            <div className="font-medium">Name</div>
            <div className="rounded-md bg-muted px-4 py-3">
              {session?.user?.name || "Not specified"}
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="font-medium">Email</div>
            <div className="rounded-md bg-muted px-4 py-3">
              {session?.user?.email}
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="font-medium">User ID</div>
            <div className="overflow-x-auto rounded-md bg-muted px-4 py-3 font-mono text-sm">
              {session?.user?.id}
            </div>
          </div>
          
          <div className="pt-6">
            <Button onClick={handleSignOut} variant="outline">
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 