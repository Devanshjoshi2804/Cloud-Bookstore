import { createClient } from "@supabase/supabase-js"
import * as dotenv from "dotenv"
import { join } from "path"
import { readFileSync } from "fs"

// Load environment variables from .env.local
dotenv.config({ path: join(process.cwd(), ".env.local") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local")
  process.exit(1)
}

// Create a Supabase client with the service key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

interface BookCSV {
  ISBN: string;
  Title: string;
  Author: string;
  Year: string;
  Publisher: string;
  ImageURL: string;
}

async function restoreOriginalImages() {
  try {
    console.log("Reading CSV file...")
    // Read the CSV file
    const csvPath = join(process.cwd(), "public/data_500.csv")
    const csvContent = readFileSync(csvPath, "utf-8")
    
    // Manual parsing of the CSV
    const lines = csvContent.split('\n')
    const headers = lines[0].split(';')
    
    const records: BookCSV[] = []
    
    // Start from 1 to skip headers
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue // Skip empty lines
      
      // Parse the line manually to handle quoted fields with semicolons
      const values: string[] = []
      let currentValue = ""
      let inQuotes = false
      
      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j]
        
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === ';' && !inQuotes) {
          values.push(currentValue)
          currentValue = ""
        } else {
          currentValue += char
        }
      }
      
      // Push the last value
      if (currentValue) {
        values.push(currentValue)
      }
      
      // Only add if we have enough values
      if (values.length >= 6) {
        records.push({
          ISBN: values[0],
          Title: values[1],
          Author: values[2],
          Year: values[3],
          Publisher: values[4],
          ImageURL: values[5].replace("THUMBZZZ", "MZZZZZZZ")  // Use medium-sized images
        })
      }
    }
    
    console.log(`Parsed ${records.length} books from CSV`)

    // Create a map of book titles to CSV image URLs
    const bookMap = new Map()
    records.forEach(record => {
      bookMap.set(record.Title.toLowerCase(), record.ImageURL)
    })

    console.log("Fetching books from database...")
    const { data: books, error } = await supabase
      .from("books")
      .select("*")
      .limit(1000)
    
    if (error) throw error

    if (!books || books.length === 0) {
      console.log("No books found to update")
      return
    }

    console.log(`Found ${books.length} books in database.`)

    // Process each book individually to update just the cover_image
    let successCount = 0
    let errorCount = 0

    for (const book of books) {
      if (bookMap.has(book.title.toLowerCase())) {
        const imageUrl = bookMap.get(book.title.toLowerCase())
        
        const { error } = await supabase
          .from("books")
          .update({ cover_image: imageUrl })
          .eq("id", book.id)
        
        if (error) {
          errorCount++
          console.error(`Error updating book ${book.title}:`, error)
        } else {
          successCount++
          if (successCount % 50 === 0) {
            console.log(`Updated ${successCount} books so far...`)
          }
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    console.log(`Book image update completed successfully! Updated ${successCount} books, failed: ${errorCount}`)
  } catch (error) {
    console.error("Error updating book images:", error)
    process.exit(1)
  }
}

restoreOriginalImages() 