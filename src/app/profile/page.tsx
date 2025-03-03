"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/components/ui/use-toast"
import { BookCard } from "@/components/book-card"
import { BookOpen, Clock, Star, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  created_at: string
}

interface ReadingStats {
  totalBooks: number
  totalPages: number
  averageRating: number
  readingTime: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<ReadingStats>({
    totalBooks: 0,
    totalPages: 0,
    averageRating: 0,
    readingTime: 0,
  })
  const [recentBooks, setRecentBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("No user found")

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError
        setProfile(profile)

        // Load user's library
        const { data: library, error: libraryError } = await supabase
          .from("user_library")
          .select(`
            *,
            books (*)
          `)
          .eq("user_id", user.id)
          .order("last_read", { ascending: false })
          .limit(5)

        if (libraryError) throw libraryError
        setRecentBooks(library)

        // Calculate stats
        const totalBooks = library.length
        const totalPages = library.reduce(
          (acc, item) => acc + item.books.page_count,
          0
        )
        const averageRating = library.reduce(
          (acc, item) => acc + item.books.rating,
          0
        ) / totalBooks
        const readingTime = Math.ceil(totalPages / 200) // Assuming 200 pages per hour

        setStats({
          totalBooks,
          totalPages,
          averageRating,
          readingTime,
        })
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

    loadProfile()
  }, [toast])

  if (loading) {
    return (
      <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Please sign in to view your profile</h2>
          <Button className="mt-4" asChild>
            <a href="/auth">Sign In</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {profile.full_name[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.full_name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            <Button className="mt-4 w-full" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          {/* Reading Stats */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Reading Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Books Read</span>
                </div>
                <span className="font-medium">{stats.totalBooks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Reading Time</span>
                </div>
                <span className="font-medium">{stats.readingTime} hours</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Avg. Rating</span>
                </div>
                <span className="font-medium">
                  {stats.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Books */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2"
        >
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-6">Recently Read</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBooks.map((item) => (
                <BookCard
                  key={item.books.id}
                  id={item.books.id}
                  title={item.books.title}
                  author={item.books.author}
                  coverImage={item.books.cover_image}
                  rating={item.books.rating}
                  price={item.books.price}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 