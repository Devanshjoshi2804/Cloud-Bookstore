"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  Star, 
  BookOpen, 
  Clock, 
  Calendar, 
  Globe, 
  Heart, 
  ShoppingCart, 
  Share2, 
  ArrowLeft, 
  ChevronRight, 
  Bookmark, 
  Eye 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"
import { supabase } from "@/lib/supabase-client"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Book = {
  id: string
  title: string
  author: string
  description: string | null
  cover_image: string | null
  price: number
  rating: number
  published_date: string | null
  page_count: number | null
  genre: string | null
  language: string | null
}

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInLibrary, setIsInLibrary] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const [similarBooks, setSimilarBooks] = useState<any[]>([])
  const { toast } = useToast()
  const { dispatch } = useCart()

  // Function to validate and fix image URLs
  const getValidImageUrl = (url: string | null): string => {
    if (!url) return "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop";
    
    // For Amazon URLs, extract ISBN and use Open Library instead
    if (url.includes('images.amazon.com/images/P')) {
      // Extract ISBN from Amazon URL
      const isbnMatch = url.match(/P\/([0-9X]+)\.01/);
      if (isbnMatch && isbnMatch[1]) {
        const isbn = isbnMatch[1];
        return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      }
    }
    
    return url;
  }

  useEffect(() => {
    loadBook()
    checkLibraryStatus()
  }, [id])

  useEffect(() => {
    if (book) {
      console.log("Book in component:", book);
      console.log("Book cover image in component:", book.cover_image);
    }
  }, [book]);

  const loadBook = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("books")
        .select(`
          *
        `)
        .eq("id", id)
        .single()

      if (error) throw error
      
      console.log("Book data loaded:", data);
      console.log("Cover image URL:", data?.cover_image);
      
      setBook(data as Book)

      // Load similar books
      if (data) {
        const { data: similarData, error: similarError } = await supabase
          .from("books")
          .select("id, title, author, cover_image, rating, price")
          .neq("id", id)
          .limit(4)

        if (!similarError && similarData) {
          setSimilarBooks(similarData)
        }
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
    
    setAddingToCart(true)
    
    // Add animation delay
    setTimeout(() => {
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
      
      setAddingToCart(false)
    }, 600)
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container py-12">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Book not found</h1>
          <p className="text-muted-foreground">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="mt-4">
            <Link href="/books">Browse Books</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      {/* Breadcrumb */}
      <div 
        className="flex items-center text-sm text-muted-foreground mb-8"
      >
        <Link href="/books" className="flex items-center hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="font-medium truncate">{book.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column - Book Cover */}
        <div
          className="lg:col-span-1"
        >
          <div className="sticky top-24 space-y-6">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-xl group">
              {book.cover_image ? (
                <Image
                  src={getValidImageUrl(book.cover_image)}
                  alt={book.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error(`Failed to load image: "${book.cover_image}"`);
                    console.error("Error loading image. Trying fallback...");
                    
                    // If the current URL is from Open Library and failed, try Unsplash
                    if (target.src.includes('covers.openlibrary.org')) {
                      console.log("Open Library image failed. Using Unsplash fallback.");
                      target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop";
                    } else if (book.cover_image?.includes("images.amazon.com")) {
                      // If Amazon URL failed, try Open Library with a different size
                      const isbnMatch = book.cover_image.match(/P\/([0-9X]+)\.01/);
                      if (isbnMatch && isbnMatch[1]) {
                        console.log("Trying Open Library with different size for ISBN:", isbnMatch[1]);
                        target.src = `https://covers.openlibrary.org/b/isbn/${isbnMatch[1]}-M.jpg`;
                      } else {
                        // If no ISBN found or Open Library fails, use Unsplash
                        target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop";
                      }
                    } else {
                      // For any other failure, use Unsplash
                      target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop";
                    }
                    
                    target.onerror = null; // Prevent infinite error loop
                  }}
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <BookOpen className="h-20 w-20 text-muted-foreground/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex gap-2">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                size="lg" 
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleAddToLibrary}
                      className={`h-12 w-12 rounded-lg ${isInLibrary ? "text-primary border-primary" : ""}`}
                    >
                      <Heart className={`h-5 w-5 ${isInLibrary ? "fill-current" : ""}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isInLibrary ? "Saved to library" : "Add to library"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-lg"
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
                  </TooltipTrigger>
                  <TooltipContent>
                    Share this book
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Right column - Book Details */}
        <div
          className="lg:col-span-2 space-y-8"
        >
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{book.title}</h1>
                <p className="text-xl text-muted-foreground mt-2">{book.author}</p>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary">${book.price.toFixed(2)}</div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.round(book.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{book.rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{book.page_count || 0} pages</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{Math.ceil((book.page_count || 0) / 250)} hours</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Published</div>
                <div className="font-medium">{new Date(book.published_date || "").getFullYear()}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Language</div>
                <div className="font-medium">{book.language || 'English'}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bookmark className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Format</div>
                <div className="font-medium">Ebook</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Description</h2>
            <div 
              className="text-muted-foreground prose prose-sm max-w-none"
            >
              <p>{book.description || "No description available for this book."}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {book.genre && (
                <Badge 
                  key={book.genre}
                  variant="secondary"
                  className="px-3 py-1 text-sm rounded-full hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  {book.genre}
                </Badge>
              )}
            </div>
          </div>

          {similarBooks.length > 0 && (
            <div className="space-y-5 mt-10">
              <h2 className="text-xl font-semibold">Similar Books</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {similarBooks.map((similarBook) => (
                  <Link 
                    key={similarBook.id} 
                    href={`/books/${similarBook.id}`}
                    className="group"
                  >
                    <div className="rounded-lg overflow-hidden aspect-[2/3] relative">
                      <Image
                        src={getValidImageUrl(similarBook.cover_image)}
                        alt={similarBook.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 200px"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.error(`Failed to load similar book image: "${similarBook.cover_image}"`);
                          console.error("Error loading similar book image. Trying fallback...");
                          
                          // If the current URL is from Open Library and failed, try Unsplash
                          if (target.src.includes('covers.openlibrary.org')) {
                            console.log("Open Library image failed. Using Unsplash fallback.");
                            target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop";
                          } else if (similarBook.cover_image?.includes("images.amazon.com")) {
                            // If Amazon URL failed, try Open Library with a different size
                            const isbnMatch = similarBook.cover_image.match(/P\/([0-9X]+)\.01/);
                            if (isbnMatch && isbnMatch[1]) {
                              console.log("Trying Open Library with different size for ISBN:", isbnMatch[1]);
                              target.src = `https://covers.openlibrary.org/b/isbn/${isbnMatch[1]}-M.jpg`;
                            } else {
                              // If no ISBN found or Open Library fails, use Unsplash
                              target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop";
                            }
                          } else {
                            // For any other failure, use Unsplash
                            target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=750&fit=crop";
                          }
                          
                          target.onerror = null; // Prevent infinite error loop
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">{similarBook.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{similarBook.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 