import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
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

async function importCSV() {
  try {
    console.log("Starting CSV import...")

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
          ImageURL: values[5]
        })
      }
    }
    
    console.log(`Parsed ${records.length} books from CSV`)

    // Process in batches of 50 to avoid rate limits
    const batchSize = 50
    const batches = Math.ceil(records.length / batchSize)
    
    for (let i = 0; i < batches; i++) {
      const start = i * batchSize
      const end = Math.min(start + batchSize, records.length)
      const batch = records.slice(start, end)
      
      const books = batch.map(record => {
        // Generate a random book cover from a reliable source instead of Amazon
        const bookCovers = [
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
          'https://images.unsplash.com/photo-1532012197267-da84d127e765',
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e',
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
          'https://images.unsplash.com/photo-1589998059171-988d887df646',
          'https://images.unsplash.com/photo-1541963463532-d68292c34b19',
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e',
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
          'https://images.unsplash.com/photo-1532012197267-da84d127e765',
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e'
        ];
        
        const randomCoverIndex = Math.floor(Math.random() * bookCovers.length);
        const placeholderImage = `${bookCovers[randomCoverIndex]}?w=400&h=600&fit=crop&q=80`;
        
        return {
          title: record.Title,
          author: record.Author,
          description: `${record.Title} is a book by ${record.Author} published in ${record.Year} by ${record.Publisher}.`,
          cover_image: placeholderImage,
          price: (Math.random() * 20 + 5).toFixed(2), // Random price between $5-$25
          rating: (Math.random() * 3 + 2).toFixed(1), // Random rating between 2-5
          published_date: new Date(`${record.Year}-01-01`),
          page_count: Math.floor(Math.random() * 500) + 100, // Random page count
          genre: "Fiction", // Default genre
          publisher: record.Publisher,
          language: "English"
        };
      });
      
      console.log(`Inserting batch ${i+1}/${batches} (${books.length} books)...`)
      const { error } = await supabase.from("books").insert(books)
      
      if (error) {
        console.error(`Error inserting batch ${i+1}:`, error)
      } else {
        console.log(`Successfully inserted batch ${i+1}/${batches}`)
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    console.log("CSV import completed successfully!")
  } catch (error) {
    console.error("Error importing CSV:", error)
    process.exit(1)
  }
}

importCSV() 