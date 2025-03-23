"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    content: "Cloud Bookstore has revolutionized my reading experience. The interface is intuitive, and having all my books accessible from anywhere is a game-changer for my busy lifestyle.",
    author: "Sarah Johnson",
    role: "Marketing Executive",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    content: "As an avid reader, I've tried many digital bookstores, but none compare to the seamless experience provided here. The recommendations are spot-on and have introduced me to authors I now love.",
    author: "Michael Chen",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
  },
  {
    id: 3,
    content: "The cloud synchronization works flawlessly across all my devices. I can start reading on my tablet and continue on my phone without missing a beat. Simply brilliant!",
    author: "Rebecca Torres",
    role: "College Professor",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&h=200&fit=crop"
  },
  {
    id: 4,
    content: "I appreciate how easy it is to discover new books based on my reading habits. The personalized recommendations feel like they truly understand my taste in literature.",
    author: "David Wilson",
    role: "Graphic Designer",
    avatar: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=200&h=200&fit=crop"
  }
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Readers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why readers around the world choose Cloud Bookstore for their digital reading needs.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="px-6 md:px-12">
            <div className="relative">
              <Quote className="absolute -top-10 -left-10 h-20 w-20 text-primary/10 rotate-180" />
              
              <div className="relative overflow-hidden" style={{ height: '280px' }}>
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={cn(
                      "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
                      {
                        "translate-x-0 opacity-100": index === activeIndex,
                        "translate-x-full opacity-0": index > activeIndex,
                        "-translate-x-full opacity-0": index < activeIndex
                      }
                    )}
                  >
                    <div className="bg-card rounded-xl p-8 shadow-sm">
                      <p className="text-lg mb-6 text-muted-foreground italic leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center">
                        <div className="mr-4 relative w-12 h-12 rounded-full overflow-hidden">
                          <Image 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{testimonial.author}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                  )}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background shadow-md hover:bg-background"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background shadow-md hover:bg-background"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
} 