"use client"

import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: "fiction",
    name: "Fiction",
    count: 165,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    count: 142,
    color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
  },
  {
    id: "mystery",
    name: "Mystery",
    count: 87,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
  },
  {
    id: "romance",
    name: "Romance",
    count: 93,
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20"
  },
  {
    id: "science-fiction",
    name: "Science Fiction",
    count: 78,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
  },
  {
    id: "fantasy",
    name: "Fantasy",
    count: 82,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
  },
  {
    id: "thriller",
    name: "Thriller",
    count: 64,
    color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
  },
  {
    id: "biography",
    name: "Biography",
    count: 56,
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
  }
]

export function CategoryPreview() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_50%,#f3f4f6_50%,#f3f4f6_75%,transparent_75%,transparent)] bg-[length:16px_16px]" />
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Explore Categories</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Discover books across a wide range of categories to match your interests and reading preferences.
            </p>
          </div>
          
          <Button asChild variant="outline" className="group md:self-end">
            <Link href="/categories" className="flex items-center">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/books?category=${category.id}`}
              className="relative group overflow-hidden rounded-xl border hover:shadow-md transition-all duration-300"
            >
              <div className="p-4 md:p-6">
                <Badge variant="outline" className={`mb-3 ${category.color}`}>
                  {category.count} books
                </Badge>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>Explore</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 