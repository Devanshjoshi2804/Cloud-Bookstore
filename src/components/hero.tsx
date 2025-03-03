import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-b from-primary/10 to-background">
      <div className="container px-4 mx-auto text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Your Digital Reading Haven
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Discover a world of stories in our cloud-based bookstore. Access your favorite books anytime, anywhere.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" asChild>
            <Link href="/books">Browse Books</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 