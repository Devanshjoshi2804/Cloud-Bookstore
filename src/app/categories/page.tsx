"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"

const categories = [
  {
    id: "fiction",
    name: "Fiction",
    description: "Explore imaginative worlds and compelling stories",
    bookCount: 1250,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=400&fit=crop",
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    description: "Discover real-world knowledge and insights",
    bookCount: 980,
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=400&fit=crop",
  },
  {
    id: "mystery",
    name: "Mystery",
    description: "Unravel intriguing puzzles and suspenseful plots",
    bookCount: 750,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=400&fit=crop",
  },
  {
    id: "romance",
    name: "Romance",
    description: "Fall in love with heartwarming stories",
    bookCount: 850,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=400&fit=crop",
  },
  {
    id: "science-fiction",
    name: "Science Fiction",
    description: "Journey through futuristic worlds and technologies",
    bookCount: 600,
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=400&fit=crop",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Enter magical realms and epic adventures",
    bookCount: 700,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=400&fit=crop",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function CategoriesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Browse Categories</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore our collection of books by genre and category
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={item}
            className="group relative overflow-hidden rounded-lg border bg-card"
          >
            <Link href={`/categories/${category.id}`}>
              <div className="relative aspect-[2/1] overflow-hidden">
                <img
                  src={category.coverImage}
                  alt={category.name}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="mt-2 text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{category.bookCount} books</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 