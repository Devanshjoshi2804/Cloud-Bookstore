"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase-client"
import { Badge } from "@/components/ui/badge"

type Book = {
  id: string
  title: string
  author: string
  cover_image: string
  rating: number
  price: number
}

interface BookCarouselProps {
  title: string
  category: string
}

export function BookCarousel({ title, category }: BookCarouselProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  
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
    const fetchBooks = async () => {
      setLoading(true)
      try {
        let query = supabase
          .from('books')
          .select('id, title, author, cover_image, rating, price')
          .limit(8)
        
        if (category === 'new') {
          query = query.order('created_at', { ascending: false })
        } else if (category === 'popular') {
          query = query.order('rating', { ascending: false })
        }
        
        const { data, error } = await query
        
        if (error) throw error
        setBooks(data || [])
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBooks()
  }, [category])
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === Math.floor(books.length / 4) * 4 ? 0 : prevIndex + 4
    )
  }
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.floor(books.length / 4) * 4 : prevIndex - 4
    )
  }
  
  const visibleBooks = books.slice(currentIndex, currentIndex + 4)
  
  if (loading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }
  
  if (books.length === 0) {
    return null
  }
  
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link href="/books" className="flex items-center gap-2">
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {visibleBooks.map((book) => (
              <Link href={`/books/${book.id}`} key={book.id} className="group">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  {book.cover_image ? (
                    <Image
                      src={getValidImageUrl(book.cover_image)}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error(`Failed to load carousel image: "${book.cover_image}"`);
                        console.error("Error loading carousel image. Trying fallback...");
                        
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
                      <BookOpen className="h-12 w-12 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center text-yellow-400 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.round(book.rating) ? 'fill-current' : 'fill-transparent'}`} 
                        />
                      ))}
                    </div>
                    <h3 className="text-white font-medium line-clamp-1 group-hover:text-primary-foreground transition-colors">{book.title}</h3>
                    <p className="text-white/80 text-sm">{book.author}</p>
                    <Badge className="mt-2 bg-primary/90 hover:bg-primary">${book.price.toFixed(2)}</Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {books.length > 4 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
} 