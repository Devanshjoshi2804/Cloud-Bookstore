"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Star, Heart, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { supabase } from "@/lib/supabase"
import { useCart } from "@/contexts/cart-context"

interface BookCardProps {
  id: string
  title: string
  author: string
  coverImage: string
  rating: number
  price: number
  className?: string
  isInLibrary?: boolean
}

export function BookCard({
  id,
  title,
  author,
  coverImage,
  rating,
  price,
  className,
  isInLibrary = false,
}: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { dispatch } = useCart()

  const handleAddToLibrary = async () => {
    try {
      setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id,
        title,
        author,
        coverImage,
        price,
        quantity: 1,
      },
    })
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <Link href={`/books/${id}`}>
        <div className="aspect-[2/3] relative overflow-hidden rounded-md">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold leading-none tracking-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{author}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              <span>${price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/95 to-transparent"
      >
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.preventDefault()
              handleAddToLibrary()
            }}
            disabled={isLoading || isInLibrary}
          >
            {isInLibrary ? (
              <Heart className="h-4 w-4 fill-primary text-primary" />
            ) : (
              <Heart className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.preventDefault()
              handleAddToCart()
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
} 