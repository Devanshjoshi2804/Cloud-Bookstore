"use client"

import { Database } from "@/types/supabase"

type Book = Database["public"]["Tables"]["books"]["Insert"]
type Category = Database["public"]["Tables"]["categories"]["Insert"]

const authors = [
  "John Smith", "Emma Wilson", "Michael Brown", "Sarah Davis", "David Lee",
  "Lisa Anderson", "James Wilson", "Jennifer Taylor", "Robert Martin", "Emily Johnson",
  "William Clark", "Olivia White", "Daniel Harris", "Sophia Chen", "Matthew Turner",
  "Isabella Martinez", "Christopher Lee", "Ava Thompson", "Andrew Wright", "Mia Garcia",
  "Joseph Rodriguez", "Charlotte Kim", "Thomas Moore", "Amelia Park", "Ryan Anderson",
  "Harper Lee", "Kevin Chen", "Evelyn Wang", "Brian Taylor", "Victoria Chang",
  "Steven Kim", "Luna Patel", "Richard White", "Aria Singh", "Patrick Brown",
  "Zoe Chen", "George Wilson", "Maya Patel", "Edward Lee", "Lily Zhang",
  "Henry Davis", "Nina Kumar", "Charles Thompson", "Sophie Chen", "Peter Anderson",
  "Hannah Kim", "Alexander Wright", "Grace Lee", "Benjamin Taylor", "Rachel Park"
]

const categories: Category[] = [
  { name: "Fiction", description: "Imaginative and creative stories" },
  { name: "Non-Fiction", description: "Factual and informative books" },
  { name: "Mystery", description: "Thrilling detective and crime stories" },
  { name: "Romance", description: "Love stories and romantic fiction" },
  { name: "Science Fiction", description: "Futuristic and speculative fiction" },
  { name: "Fantasy", description: "Magical and supernatural stories" },
  { name: "Biography", description: "Life stories of notable people" },
  { name: "History", description: "Books about historical events and periods" },
  { name: "Self-Help", description: "Personal development and growth" },
  { name: "Business", description: "Business and entrepreneurship books" }
]

const generateTitle = (category: string): string => {
  const prefixes = [
    "The", "A", "In", "On", "At", "Through", "Beyond", "Within", "Without", "Between",
    "Among", "Around", "Across", "Along", "Against", "Behind", "Beneath", "Beside",
    "Inside", "Outside", "Under", "Over", "Above", "Below", "Near", "Far", "Deep",
    "High", "Low", "Long", "Short", "Fast", "Slow", "Bright", "Dark", "Light",
    "Heavy", "Strong", "Weak", "Rich", "Poor", "Happy", "Sad", "Angry", "Calm",
    "Wild", "Quiet", "Loud", "Soft", "Hard", "Easy", "Simple", "Complex"
  ]

  const nouns = [
    "Journey", "Path", "Road", "Way", "Trail", "Pathway", "Route", "Course", "Track",
    "Adventure", "Quest", "Mission", "Voyage", "Expedition", "Pilgrimage", "Odyssey",
    "Story", "Tale", "Narrative", "Account", "Chronicle", "History", "Record", "Report",
    "Life", "World", "Universe", "Cosmos", "Space", "Time", "Place", "Realm",
    "Heart", "Soul", "Mind", "Spirit", "Body", "Life", "Death", "Love", "Hate",
    "Hope", "Fear", "Dream", "Nightmare", "Reality", "Fantasy", "Truth", "Lie"
  ]

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const categoryWord = category.split(" ")[0]

  return `${prefix} ${categoryWord} ${noun}`
}

const generateDescription = (title: string, author: string): string => {
  return `A compelling ${title.toLowerCase()} by ${author}. This book takes readers on an unforgettable journey through its pages, offering unique insights and perspectives that will leave a lasting impression.`
}

const generateBooks = (count: number = 100): { books: Book[], bookCategories: { book_id: string, category_id: string }[] } => {
  const books: Book[] = []
  const bookCategories: { book_id: string, category_id: string }[] = []

  // Generate books for each category
  categories.forEach((category, categoryIndex) => {
    for (let i = 0; i < count; i++) {
      const author = authors[Math.floor(Math.random() * authors.length)]
      const title = generateTitle(category.name)
      const bookId = `${category.name.toLowerCase()}-${i + 1}`
      
      const book: Book = {
        id: bookId,
        title,
        author,
        description: generateDescription(title, author),
        cover_image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=400&h=600&fit=crop`,
        price: Math.floor(Math.random() * 50) + 10,
        rating: Number((Math.random() * 2 + 3).toFixed(1)),
        published_date: new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString(),
        page_count: Math.floor(Math.random() * 400) + 100,
        genre: category.name,
        language: "English",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      books.push(book)
      bookCategories.push({
        book_id: bookId,
        category_id: category.id || `category-${categoryIndex + 1}`
      })
    }
  })

  return { books, bookCategories }
}

export { generateBooks, categories } 