import { createClient } from "@supabase/supabase-js"
import * as dotenv from "dotenv"
import { join } from "path"

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

async function updateSchema() {
  try {
    console.log("Updating database schema...")

    // Using the REST API to execute SQL directly
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        query: `
          -- Add ISBN column if it doesn't exist
          DO $$
          BEGIN
            IF NOT EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'books' AND column_name = 'isbn'
            ) THEN
              ALTER TABLE books ADD COLUMN isbn text;
            END IF;

            -- Add publisher column if it doesn't exist
            IF NOT EXISTS (
              SELECT FROM information_schema.columns 
              WHERE table_name = 'books' AND column_name = 'publisher'
            ) THEN
              ALTER TABLE books ADD COLUMN publisher text;
            END IF;
          END $$;
        `
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`SQL execution failed: ${errorText}`)
    }

    console.log("Schema updated successfully!")
  } catch (error) {
    console.error("Error updating schema:", error)
    process.exit(1)
  }
}

updateSchema() 