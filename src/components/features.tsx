import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Search, Bookmark, Cloud, Sparkles, Zap, Leaf, RefreshCw, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: BookOpen,
    title: "Vast Library",
    description: "Access thousands of books from various genres and authors."
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description: "Your library syncs across all your devices automatically."
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your next favorite book with our advanced search and recommendations."
  },
  {
    icon: Bookmark,
    title: "Save Progress",
    description: "Never lose your place with cloud-synced reading progress."
  },
  {
    icon: Sparkles,
    title: "Personalized",
    description: "Get recommendations based on your reading preferences."
  },
  {
    icon: Clock,
    title: "Read Offline",
    description: "Download books for reading without an internet connection."
  }
]

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <>
      {/* Features Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-96 bg-primary/5 -skew-y-3 -z-10" />
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Discover the <span className="text-primary">Cloud Bookstore</span> Experience
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Enjoy a seamless reading experience with our powerful features designed for book lovers.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                variants={item}
                className="group relative flex flex-col items-center text-center p-8 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-300 hover:shadow-lg"
              >
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/10 to-background rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-3 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits numbers section */}
      <section className="py-16 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
          <div className="absolute inset-0 bg-grid-white/[0.2] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Books Available</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Happy Readers</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Reader Support</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 [clip-path:polygon(0_0,100%_25%,100%_75%,0%_100%)] -z-10" />
        
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center relative z-10 bg-background/50 backdrop-blur-sm p-8 sm:p-12 rounded-xl border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6 text-sm font-medium text-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Zap className="h-4 w-4" />
              <span>Join thousands of happy readers</span>
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Join our community of book lovers today and discover your next favorite book. Unlimited access to thousands of titles.
            </p>
            
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button size="lg" className="rounded-full px-8 w-full sm:w-auto" asChild>
                <Link href="/signup">Create Free Account</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto" asChild>
                <Link href="/books">Explore Books</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
} 