"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  Cloud,
  Globe,
  Heart,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  Bookmark,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Book Enthusiast",
    content: "Cloud Bookstore has transformed how I read. I can switch between devices seamlessly, and the recommendations are spot-on!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    name: "Michael Chen",
    role: "Literature Professor",
    content: "As an educator, I appreciate the vast collection and organization. It's made discovering new titles for my courses much easier.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    name: "Emily Rodriguez",
    role: "Avid Reader",
    content: "The community features are fantastic! I've joined several book clubs and discovered genres I never would have tried otherwise.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  }
]

const team = [
  {
    name: "Alex Miller",
    role: "Founder & CEO",
    bio: "Book lover with a passion for technology. Founded Cloud Bookstore to make reading more accessible.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
  },
  {
    name: "Jamie Lee",
    role: "Head of Content",
    bio: "Former librarian with 15 years of experience curating diverse literary collections.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop"
  },
  {
    name: "Taylor Kim",
    role: "UX Designer",
    bio: "Creating beautiful reading experiences that put the focus on what matters most—the content.",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop"
  }
]

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <main className="relative">
      {/* Hero section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" />
              <span>Our story</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              About <span className="text-primary">Cloud Bookstore</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our mission is to create a seamless digital reading experience that brings 
              the joy of books to readers worldwide.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <Image 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=800&fit=crop"
                alt="Library with books" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white/90 text-lg font-medium">
                  Founded in 2023
                </div>
                <div className="text-white/70 text-sm">
                  Bringing books to digital life
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                At Cloud Bookstore, we believe that knowledge and stories should be accessible 
                to everyone, anywhere, at any time. We're passionate about making reading more 
                convenient, engaging, and connected in the digital age.
              </p>
              <p className="text-lg text-muted-foreground">
                Our platform combines the timeless joy of reading with modern technology, 
                creating an experience that adapts to your lifestyle while preserving the 
                immersive nature of a good book.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button className="rounded-full group" asChild>
                  <Link href="/books">
                    Explore Our Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/signup">Join Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">
              Our platform is designed with readers in mind, combining powerful features 
              with an intuitive interface for the best possible reading experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="flex flex-col p-6 rounded-xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
} 
