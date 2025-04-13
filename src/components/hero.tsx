import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Search, ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
<section className="relative overflow-hidden flex flex-col justify-center mt-[0px]">
{/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background z-0">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" /></div>
      
  {/* Main content */}
  <div className="container relative z-10 px-4 py-10 sm:py-10 lg:py-10">
    <div className="mx-auto max-w-3xl lg:max-w-5xl flex flex-col items-center">

  <div className="relative mb-2">
  <Image
    src="https://images.unsplash.com/photo-1719310469053-8c5c0c6803d3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Books or Reading"
    width={3000}
    height={1000}
    className="rounded-lg shadow-lg"
    style={{ filter: 'blur(5px)' }} 
  />
  <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center rounded-lg px-4 py-8">
    <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4 text-sm font-medium text-primary shadow-inner shadow-primary/5 animate-fadeIn">
      <Sparkles className="h-4 w-4" />
      <span>Your journey into a world of books begins here</span>
    </div>

    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white bg-clip-text text-white bg-gradient-to-r from-primary to-primary-foreground animate-slideUpFade">
      Your Digital Reading Haven
    </h1>

    <p className="mt-4 text-xl md:text-2xl text-white leading-relaxed text-muted-foreground max-w-2xl mx-auto animate-slideUpFade opacity-0" style={{ animationDelay: '0.2s' }}>
      Discover a vast collection of books in our cloud-based bookstore. 
      Access your favorite reads anytime, anywhere, on any device.
    </p>

    <div 
      className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-slideUpFade opacity-0"
      style={{ animationDelay: '0.4s' }}
    >
      <Button size="lg" asChild className="group relative overflow-hidden rounded-full px-8 text-lg h-12">
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
  </div>
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse" style={{ animationDuration: '2s' }}>
  <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
  <ChevronDown className="h-6 w-6 text-primary" />
</div>
  </div>
  </div>
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
