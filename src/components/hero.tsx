import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Search, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background z-0">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-10 w-40 h-40 bg-primary/40 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 -right-10 w-60 h-60 bg-primary-foreground/30 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s', animationDuration: '8s' }} />

      {/* Floating books decoration */}
      <div className="absolute -right-20 top-40 opacity-10 rotate-12">
        <div className="opacity-10">
          <BookOpen className="h-96 w-96" />
        </div>
      </div>
      
      {/* Animated circles */}
      <div className="absolute left-1/4 top-1/3 w-4 h-4 rounded-full bg-primary animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
      <div className="absolute right-1/3 bottom-1/4 w-3 h-3 rounded-full bg-primary-foreground animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute left-1/3 bottom-1/3 w-2 h-2 rounded-full bg-primary/60 animate-ping" style={{ animationDuration: '5s', animationDelay: '1.5s' }} />

      {/* Main content */}
      <div className="container relative z-10 px-4 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl lg:max-w-5xl flex flex-col items-center">
          <div
            className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-8 text-sm font-medium text-primary shadow-inner shadow-primary/5 animate-fadeIn"
          >
            <Sparkles className="h-4 w-4" />
            <span>Your journey into a world of books begins here</span>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold tracking-tight text-center sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground animate-slideUpFade"
          >
            Your Digital Reading Haven
          </h1>
          
          <p 
            className="mt-8 text-xl md:text-2xl text-center leading-relaxed text-muted-foreground max-w-2xl mx-auto animate-slideUpFade opacity-0"
            style={{ animationDelay: '0.2s' }}
          >
            Discover a vast collection of books in our cloud-based bookstore. 
            Access your favorite reads anytime, anywhere, on any device.
          </p>
          
          <div 
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 animate-slideUpFade opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            <Button size="lg" asChild className="group relative overflow-hidden rounded-full px-8 text-lg h-14">
              <Link href="/books">
                <BookOpen className="mr-3 h-5 w-5" />
                Browse Books
                <span 
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-40 transition-opacity"
                />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="group rounded-full px-8 text-lg h-14">
              <Link href="/about" className="flex items-center">
                Learn More
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Search preview */}
          <div 
            className="mt-16 w-full max-w-md mx-auto animate-slideUpFade opacity-0"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="relative rounded-full border shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-primary/60" />
              </div>
              <Link href="/books" passHref>
                <input 
                  type="text" 
                  placeholder="Search for books, authors, genres..."
                  className="block w-full rounded-full bg-transparent py-4 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                  readOnly
                />
              </Link>
              <div className="hidden sm:flex absolute right-1 top-1">
                <Button size="sm" variant="ghost" className="rounded-full hover:bg-primary/10 h-10 w-10" asChild>
                  <Link href="/books">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slideUpFade opacity-0" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground mt-1">Books</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">Authors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">120+</div>
              <div className="text-sm text-muted-foreground mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse" style={{ animationDuration: '2s' }}>
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <ChevronDown className="h-6 w-6 text-primary" />
      </div>

      {/* Bottom decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s forwards;
        }
        
        .animate-slideUpFade {
          animation: slideUpFade 1s forwards;
        }
      `}</style>
    </section>
  )
} 