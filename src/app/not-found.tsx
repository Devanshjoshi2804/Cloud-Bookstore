import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground">
          The page you were looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center mt-6">
          <Button size="lg" asChild>
            <Link href="/">
              <BookOpen className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 