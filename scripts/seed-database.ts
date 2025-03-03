import { createClient } from "@supabase/supabase-js"
import { join } from "path"
import * as dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: join(process.cwd(), ".env.local") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const categories = [
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

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age.",
    cover_image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    price: 9.99,
    rating: 4.5,
    published_date: "1925-04-10",
    page_count: 180,
    genre: "Fiction",
    language: "English"
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian masterpiece that explores totalitarianism and surveillance society.",
    cover_image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
    price: 12.99,
    rating: 4.8,
    published_date: "1949-06-08",
    page_count: 328,
    genre: "Science Fiction",
    language: "English"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A classic romance that explores love, marriage, and social class in Georgian-era England.",
    cover_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    price: 7.99,
    rating: 4.6,
    published_date: "1813-01-28",
    page_count: 432,
    genre: "Romance",
    language: "English"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy adventure following Bilbo Baggins on his journey to help reclaim a dwarf kingdom.",
    cover_image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
    price: 14.99,
    rating: 4.7,
    published_date: "1937-09-21",
    page_count: 310,
    genre: "Fantasy",
    language: "English"
  },
  {
    title: "The Art of War",
    author: "Sun Tzu",
    description: "Ancient Chinese text on military strategy and tactics.",
    cover_image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    price: 6.99,
    rating: 4.3,
    published_date: "1910-01-01",
    page_count: 273,
    genre: "Non-Fiction",
    language: "English"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description: "A fast-paced thriller involving art, religion, and conspiracy.",
    cover_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    price: 15.99,
    rating: 4.2,
    published_date: "2003-03-18",
    page_count: 454,
    genre: "Mystery",
    language: "English"
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    description: "The biography of Apple co-founder Steve Jobs.",
    cover_image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
    price: 19.99,
    rating: 4.4,
    published_date: "2011-10-24",
    page_count: 656,
    genre: "Biography",
    language: "English"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A brief history of humankind from ancient humans to the present.",
    cover_image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    price: 16.99,
    rating: 4.6,
    published_date: "2011-01-01",
    page_count: 443,
    genre: "History",
    language: "English"
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    description: "A guide to personal and professional effectiveness.",
    cover_image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    price: 13.99,
    rating: 4.5,
    published_date: "1989-08-15",
    page_count: 372,
    genre: "Self-Help",
    language: "English"
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    description: "Research on how companies transition from good to great performance.",
    cover_image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
    price: 17.99,
    rating: 4.4,
    published_date: "2001-10-16",
    page_count: 320,
    genre: "Business",
    language: "English"
  }
]

async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Clear existing relationships first
    console.log("Clearing existing book-category relationships...")
    await supabase.from("book_categories").delete().neq("id", "0")
    await supabase.from("books").delete().neq("id", "0")

    // Upsert categories (insert or update based on name)
    console.log("Upserting categories...")
    const { data: existingCategories, error: categoryError } = await supabase
      .from("categories")
      .upsert(categories, { 
        onConflict: 'name',
        ignoreDuplicates: false 
      })
      .select()

    if (categoryError) throw categoryError
    console.log(`Successfully upserted categories`)

    // Get all categories to ensure we have the correct IDs
    const { data: allCategories, error: getCategoriesError } = await supabase
      .from("categories")
      .select("*")

    if (getCategoriesError) throw getCategoriesError

    // Insert books
    console.log("Inserting books...")
    const { data: insertedBooks, error: bookError } = await supabase
      .from("books")
      .insert(books)
      .select()

    if (bookError) throw bookError
    console.log(`Successfully inserted ${insertedBooks.length} books`)

    // Create book-category relationships
    console.log("Creating book-category relationships...")
    const bookCategories = insertedBooks.map((book) => {
      const category = allCategories.find((cat) => cat.name === book.genre)
      if (!category) {
        console.warn(`Category not found for book: ${book.title} (genre: ${book.genre})`)
        return null
      }
      return {
        book_id: book.id,
        category_id: category.id
      }
    }).filter(Boolean)

    if (bookCategories.length > 0) {
      const { error: bookCategoryError } = await supabase
        .from("book_categories")
        .insert(bookCategories)

      if (bookCategoryError) throw bookCategoryError
      console.log(`Successfully created ${bookCategories.length} book-category relationships`)
    }

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase() 