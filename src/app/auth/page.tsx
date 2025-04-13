"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { signIn, useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { status } = useSession()
  
  // Client-side state
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState("/")
  
  // Handle the signup parameter and redirectedFrom
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get("signup") === "true") {
        setIsSignUp(true)
      }
      const redirect = params.get("redirectedFrom")
      if (redirect) {
        setRedirectUrl(redirect)
      }
      
      // Check for error parameter
      const error = params.get("error")
      if (error) {
        setErrorMsg(error === "CredentialsSignin" 
          ? "Invalid email or password" 
          : `Error: ${error}`)
      }
    }
  }, [])
  
  // Show error message if present
  useEffect(() => {
    if (errorMsg) {
      toast({
        title: "Authentication Error",
        description: errorMsg,
        variant: "destructive",
      })
      setErrorMsg(null)
    }
  }, [errorMsg, toast])
  
  // Redirect if authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/")
    }
  }, [status, router])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        // Use Supabase directly for signup
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })
        if (error) throw error
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account.",
        })
      } else {
        // Use NextAuth for sign in
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        })

        if (result?.error) {
          throw new Error(result.error)
        }

        // Redirect on successful login
        router.replace(redirectUrl)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-primary hover:underline"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        <form onSubmit={handleAuth} className="mt-8 space-y-6">
          {isSignUp && (
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-none"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-none"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-none"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Sign up" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  )
} 