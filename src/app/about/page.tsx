"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Cloud,
  Globe,
  Heart,
  Shield,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: Cloud,
    title: "Cloud-Based Reading",
    description:
      "Access your books from any device, anywhere in the world. Your reading progress is automatically synced across all your devices.",
  },
  {
    icon: Globe,
    title: "Vast Collection",
    description:
      "Explore our extensive library of books from various genres, authors, and publishers. New titles are added regularly.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your reading data and personal information are protected with industry-standard security measures.",
  },
  {
    icon: Users,
    title: "Community Features",
    description:
      "Join book clubs, share recommendations, and connect with fellow readers from around the world.",
  },
  {
    icon: Heart,
    title: "Personalized Experience",
    description:
      "Get personalized book recommendations based on your reading history and preferences.",
  },
  {
    icon: BookOpen,
    title: "Offline Reading",
    description:
      "Download books for offline reading and continue your journey even without an internet connection.",
  },
]

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight mb-6"
        >
          About Cloud Bookstore
        </motion.h1>
        
        <motion.section 
          className="prose dark:prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Our Mission</h2>
          <p>
            At Cloud Bookstore, we believe that knowledge and stories should be accessible to everyone,
            anywhere, at any time. Our mission is to create a seamless digital reading experience that
            brings the joy of books to readers worldwide.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-start p-4 rounded-lg border bg-card"
                >
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2>Our Technology</h2>
            <p>
              We&apos;ve built Cloud Bookstore using cutting-edge technology to ensure a smooth and
              enjoyable reading experience. Our platform features:
            </p>
            <ul>
              <li>Fast and responsive design that works on any device</li>
              <li>Secure cloud storage for your library and reading data</li>
              <li>Advanced search and filtering capabilities</li>
              <li>Seamless integration with popular e-readers</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2>Join Our Community</h2>
            <p>
              Whether you&apos;re an avid reader or just getting started, Cloud Bookstore is here to
              enhance your reading journey. Join our growing community of book lovers and discover
              your next favorite read.
            </p>

            <div className="mt-8">
              <Button asChild>
                <Link href="/signup">Create Your Account</Link>
              </Button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
} 