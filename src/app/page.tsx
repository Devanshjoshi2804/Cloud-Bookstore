"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { BookCarousel } from "@/components/book-carousel"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { CategoryPreview } from "@/components/category-preview"

export default function HomePage() {
  return (
    <div className="flex-1">
      <Hero />
      <CategoryPreview />
      <Features />
      <BookCarousel title="New Releases" category="new" />
      <Testimonials />
      <BookCarousel title="Popular Picks" category="popular" />
      <CTA />
    </div>
  )
}
