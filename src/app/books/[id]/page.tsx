"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, BookOpen, Clock, Calendar, Globe, Heart, ShoppingCart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"
import { supabase } from "@/lib/supabase"
import { Database } from "@/types/supabase"

type Book = Database["public"]["Tables"]["books"]["Row"] & {
  book_categories: {
    category: {
      name: string
      description: string | null
    }
  }[]
}

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInLibrary, setIsInLibrary] = useState(false)
  const { toast } = useToast()
  const { dispatch } = useCart()

  useEffect(() => {
    loadBook()
    checkLibraryStatus()
  }, [id])

  const loadBook = async () => {
    try {
      const { data, error } = await supabase
        .from("books")
        .select(`
          *,
          book_categories (
            category (
              name,
              description
            )
          )
        `)
        .eq("id", id)
        .single()

      if (error) throw error
      setBook(data)
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

  const checkLibraryStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("user_library")
        .select("*")
        .eq("user_id", user.id)
        .eq("book_id", id)
        .single()

      if (error && error.code !== "PGRST116") throw error
      setIsInLibrary(!!data)
    } catch (error: any) {
      console.error("Error checking library status:", error)
    }
  }

  const handleAddToLibrary = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add books to your library.",
          variant: "destructive",
        })
        return
      }

      await supabase.from("user_library").insert({
        user_id: user.id,
        book_id: id,
      })

      setIsInLibrary(true)
      toast({
        title: "Success!",
        description: "Book added to your library.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleAddToCart = () => {
    if (!book) return

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.cover_image || "",
        price: book.price,
        quantity: 1,
      },
    })

    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Book not found</h1>
          <p className="text-muted-foreground mt-2">
            The book you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Book Cover */}
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
          <Image
            src={book.cover_image || ""}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{book.author}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{book.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="h-5 w-5" />
              <span>{book.page_count || 0} pages</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span>{Math.ceil((book.page_count || 0) / 250)} hours</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-5 w-5" />
              <span>{new Date(book.published_date || "").getFullYear()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-5 w-5" />
              <span>{book.language}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {book.book_categories.map(({ category }) => (
                <span
                  key={category.name}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-2xl font-bold">${book.price.toFixed(2)}</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddToLibrary}
                className={isInLibrary ? "text-primary" : ""}
              >
                <Heart className={`h-5 w-5 ${isInLibrary ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast({
                    title: "Link copied",
                    description: "Book link copied to clipboard.",
                  })
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 