import { Metadata } from "next"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"

export const metadata: Metadata = {
  title: "Cloud Bookstore - Your Digital Reading Companion",
  description: "Discover and read your favorite books online with our cloud-based bookstore platform.",
}

export default function HomePage() {
  return (
    <div className="flex-1">
      <Hero />
      <Features />
    </div>
  )
}
