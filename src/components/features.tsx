import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Search, Bookmark } from 'lucide-react'

export function Features() {
  return (
    <>
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vast Library</h3>
              <p className="text-muted-foreground">
                Access thousands of books from various genres and authors.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <Search className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Find your next favorite book with our advanced search and recommendations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <Bookmark className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Progress</h3>
              <p className="text-muted-foreground">
                Never lose your place with cloud-synced reading progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary/5">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Reading?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our community of readers and discover your next favorite book.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </section>
    </>
  )
} 