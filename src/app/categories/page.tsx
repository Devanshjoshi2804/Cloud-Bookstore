"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Filter, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Category = {
  id: string
  name: string
  description: string
  image: string
  bookCount: number
}

const categories: Category[] = [
  {
    id: "fiction",
    name: "Fiction",
    description: "Explore imaginary worlds, characters, and events.",
    image: "https://images.unsplash.com/photo-1531901599143-df5011edbce8?w=800&h=600&fit=crop",
    bookCount: 165
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    description: "Discover real stories, facts, and knowledge.",
    image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=800&h=600&fit=crop",
    bookCount: 142
  },
  {
    id: "mystery",
    name: "Mystery",
    description: "Follow clues and solve puzzles through intriguing narratives.",
    image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&h=600&fit=crop",
    bookCount: 87
  },
  {
    id: "romance",
    name: "Romance",
    description: "Experience love stories and relationships in various settings.",
    image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&h=600&fit=crop",
    bookCount: 93
  },
  {
    id: "science-fiction",
    name: "Science Fiction",
    description: "Venture into futures of advanced technology and space exploration.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop",
    bookCount: 78
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Journey through magical realms and supernatural elements.",
    image: "https://images.unsplash.com/photo-1507409613952-505ef646cae9?w=800&h=600&fit=crop",
    bookCount: 82
  },
  {
    id: "thriller",
    name: "Thriller",
    description: "Feel suspense and excitement with intense, thrilling narratives.",
    image: "https://images.unsplash.com/photo-1543237483-621fc0b6df36?w=800&h=600&fit=crop",
    bookCount: 64
  },
  {
    id: "horror",
    name: "Horror",
    description: "Experience fear and dread through terrifying stories.",
    image: "https://images.unsplash.com/photo-1518281361980-b26bfd556770?w=800&h=600&fit=crop",
    bookCount: 41
  },
  {
    id: "biography",
    name: "Biography",
    description: "Learn about significant people's lives and experiences.",
    image: "https://images.unsplash.com/photo-1529473814394-077eff70c933?w=800&h=600&fit=crop",
    bookCount: 56
  },
  {
    id: "historical",
    name: "Historical",
    description: "Explore stories set in the past with historical contexts.",
    image: "https://images.unsplash.com/photo-1562673005-7693bd6d6e54?w=800&h=600&fit=crop",
    bookCount: 72
  },
  {
    id: "self-help",
    name: "Self-Help",
    description: "Discover guides for personal improvement and growth.",
    image: "https://images.unsplash.com/photo-1552591464-c38a8851fb1e?w=800&h=600&fit=crop",
    bookCount: 48
  },
  {
    id: "poetry",
    name: "Poetry",
    description: "Experience emotional expression through verse and rhythm.",
    image: "https://images.unsplash.com/photo-1526121548504-55f319b740cf?w=800&h=600&fit=crop",
    bookCount: 37
  }
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [selectedView, setSelectedView] = useState<"grid" | "list">("grid")
  
  useEffect(() => {
    let results = categories
    
    if (searchQuery) {
      results = results.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (activeCategory) {
      results = results.filter(category => category.id === activeCategory)
    }
    
    setFilteredCategories(results)
  }, [searchQuery, activeCategory])
  
  const clearFilters = () => {
    setSearchQuery("")
    setActiveCategory(null)
  }

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Hero section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 to-background">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Book <span className="text-primary">Categories</span>
            </h1>
            
            <p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Explore our wide range of book categories and find your next great read. 
              From science fiction to romance, we have something for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div 
              className="relative flex-grow"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-9 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div
              className="flex gap-2"
            >
              <Button
                variant={selectedView === "grid" ? "default" : "outline"}
                size="sm"
                className="w-24"
                onClick={() => setSelectedView("grid")}
              >
                Grid
              </Button>
              <Button
                variant={selectedView === "list" ? "default" : "outline"}
                size="sm"
                className="w-24"
                onClick={() => setSelectedView("list")}
              >
                List
              </Button>
            </div>
          </div>

          {/* Active filters */}
          {(searchQuery || activeCategory) && (
            <div 
              className="flex flex-wrap gap-2 mb-6"
            >
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active filters:</span>
              </div>
              
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchQuery}"
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {activeCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {categories.find(c => c.id === activeCategory)?.name}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0 ml-1" 
                    onClick={() => setActiveCategory(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm h-7" 
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
          
          {/* Categories grid/list */}
          {filteredCategories.length === 0 ? (
            <div 
              className="text-center py-16"
            >
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          ) : selectedView === "grid" ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="mb-2">{category.bookCount} books</Badge>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <Button asChild variant="secondary" className="group/btn" size="sm">
                      <Link href={`/books?category=${category.id}`}>
                        Browse Books
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="space-y-4"
            >
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl border bg-card hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-full sm:w-48 aspect-video sm:aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <Badge>{category.bookCount} books</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Button asChild variant="secondary" className="group" size="sm">
                        <Link href={`/books?category=${category.id}`}>
                          Browse Books
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related collections */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 
            className="text-2xl font-bold mb-8"
          >
            Featured Collections
          </h2>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div
              className="group rounded-xl overflow-hidden relative aspect-[3/2]"
            >
              <Image
                src="https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=800&h=500&fit=crop"
                alt="New Releases"
                width={800}
                height={500}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">New Releases</h3>
                <p className="text-white/80 mb-3">The latest books added to our collection</p>
                <Button asChild variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 group/btn">
                  <Link href="/books?sort=newest">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div
              className="group rounded-xl overflow-hidden relative aspect-[3/2]"
            >
              <Image
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=500&fit=crop"
                alt="Best Sellers"
                width={800}
                height={500}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Best Sellers</h3>
                <p className="text-white/80 mb-3">The most popular books among our readers</p>
                <Button asChild variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 group/btn">
                  <Link href="/books?sort=popular">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div
              className="group rounded-xl overflow-hidden relative aspect-[3/2]"
            >
              <Image
                src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&h=500&fit=crop"
                alt="Staff Picks"
                width={800}
                height={500}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Staff Picks</h3>
                <p className="text-white/80 mb-3">Curated recommendations from our team</p>
                <Button asChild variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 group/btn">
                  <Link href="/books?collection=staff-picks">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 