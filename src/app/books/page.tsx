"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SlidersHorizontal, Search, Loader2, BookOpen, ChevronDown, X, Filter, Book } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Database } from "@/types/supabase"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"

type Book = Database["public"]["Tables"]["books"]["Row"] & {
  categories: {
    id: string
    name: string
    description: string | null
  }[]
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("")
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [totalBooks, setTotalBooks] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    loadBooks()
    loadCategories()
  }, [selectedCategory, sortBy, currentPage])

  const loadBooks = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from("books")
        .select(`
          *,
          categories:book_categories(
            category:categories(
              id,
              name,
              description
            )
          )
        `, { count: 'exact' })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)

      if (selectedCategory) {
        query = query.eq("book_categories.categories.name", selectedCategory)
      }

      if (sortBy) {
        switch (sortBy) {
          case "price-asc":
            query = query.order("price", { ascending: true })
            break
          case "price-desc":
            query = query.order("price", { ascending: false })
            break
          case "rating":
            query = query.order("rating", { ascending: false })
            break
          case "title":
            query = query.order("title", { ascending: true })
            break
          default:
            query = query.order("title", { ascending: true })
        }
      } else {
        query = query.order("title", { ascending: true })
      }

      const { data, error, count } = await query
      if (error) throw error
      
      setBooks(data || [])
      if (count !== null) setTotalBooks(count)
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

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })
      if (error) throw error
      setCategories(data || [])
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleSearch = () => {
    setCurrentPage(1) // Reset to first page when searching
    loadBooks()
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSortBy("")
    setCurrentPage(1)
  }

  const filteredBooks = books.filter((book) =>
    searchQuery === "" || 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate total pages
  const totalPages = Math.ceil(totalBooks / itemsPerPage)

  // Generate page numbers for pagination
  const pageNumbers = []
  const maxPageButtons = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1)
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  const pageControls = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }

  const pageItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="container py-8 space-y-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white mb-8"
        >
          <div className="absolute inset-0 bg-grid-white/10 mix-blend-overlay" />
          <div className="relative z-10 flex flex-col items-start max-w-3xl space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                <BookOpen className="w-3 h-3 mr-1" /> Our Collection
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover Your Next Favorite Book
            </motion.h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Explore our vast collection of books from various genres and authors, 
              perfect for every reader and occasion.
            </motion.p>
          </div>

          {/* Floating books decoration */}
          <motion.div 
            className="absolute -bottom-8 -right-8 opacity-20 pointer-events-none hidden md:block"
            initial={{ opacity: 0, y: 50, rotate: -10 }}
            animate={{ opacity: 0.2, y: 0, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Book className="w-64 h-64" />
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search books by title or author..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-9"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch()
                }}
              />
            </div>
            <div className="flex gap-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden md:inline">Filters</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filter Books</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant={selectedCategory === "" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setSelectedCategory("")}
                        >
                          All
                        </Button>
                        {categories.map((category) => (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.name ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category.name)}
                          >
                            {category.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">Sort By</h3>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose sorting option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Default</SelectItem>
                          <SelectItem value="title">Title (A-Z)</SelectItem>
                          <SelectItem value="price-asc">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Rating (High to Low)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DrawerFooter className="flex flex-row justify-between">
                    <Button variant="outline" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                    <DrawerClose asChild>
                      <Button onClick={() => loadBooks()}>Apply Filters</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>
          </div>

          {/* Applied filters */}
          {(selectedCategory || sortBy) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2 mt-2"
            >
              <span className="text-sm text-muted-foreground">Applied filters:</span>
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {selectedCategory}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0" 
                    onClick={() => setSelectedCategory("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {sortBy && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Sorting: {
                    sortBy === "price-asc" ? "Price (Low to High)" :
                    sortBy === "price-desc" ? "Price (High to Low)" :
                    sortBy === "rating" ? "Rating" : "Title"
                  }
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 p-0" 
                    onClick={() => setSortBy("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-xs">
                Clear all
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Books Grid */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="flex h-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading books...</p>
              </div>
            </div>
          ) : (
            <>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              >
                <AnimatePresence>
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <motion.div
                        key={book.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ 
                          duration: 0.3,
                          layout: { duration: 0.3 }
                        }}
                        className="flex"
                      >
                        <BookCard
                          id={book.id}
                          title={book.title}
                          author={book.author}
                          coverImage={book.cover_image || ""}
                          rating={book.rating}
                          price={book.price}
                          className="w-full h-full flex-1"
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="bg-muted rounded-full p-5 mb-4">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No books found</h3>
                      <p className="text-muted-foreground max-w-md">
                        We couldn't find any books matching your search criteria. Try adjusting your filters or search query.
                      </p>
                      <Button variant="outline" onClick={handleResetFilters} className="mt-4">
                        Reset filters
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {filteredBooks.length > 0 && totalPages > 1 && (
                <motion.div 
                  className="flex justify-center mt-12 gap-1"
                  variants={pageControls}
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>

                  {startPage > 1 && (
                    <>
                      <motion.div variants={pageItem}>
                        <Button
                          variant={currentPage === 1 ? "default" : "outline"}
                          size="icon"
                          onClick={() => setCurrentPage(1)}
                        >
                          1
                        </Button>
                      </motion.div>
                      {startPage > 2 && (
                        <motion.div variants={pageItem} className="flex items-center justify-center px-2">
                          <span className="text-muted-foreground">...</span>
                        </motion.div>
                      )}
                    </>
                  )}
                  
                  {pageNumbers.map((number) => (
                    <motion.div key={number} variants={pageItem}>
                      <Button
                        variant={currentPage === number ? "default" : "outline"}
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </Button>
                    </motion.div>
                  ))}
                  
                  {endPage < totalPages && (
                    <>
                      {endPage < totalPages - 1 && (
                        <motion.div variants={pageItem} className="flex items-center justify-center px-2">
                          <span className="text-muted-foreground">...</span>
                        </motion.div>
                      )}
                      <motion.div variants={pageItem}>
                        <Button
                          variant={currentPage === totalPages ? "default" : "outline"}
                          size="icon"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </motion.div>
                    </>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </MotionConfig>
  )
} 