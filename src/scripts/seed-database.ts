import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join } from "path"
import * as dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: join(process.cwd(), ".env.local") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Read and execute the seed file
    const seedPath = join(process.cwd(), "supabase/seed.sql")
    const seedSql = readFileSync(seedPath, "utf-8")
    
    console.log("Executing seed...")
    const { error: seedError } = await supabase.rpc("exec_sql", {
      sql: seedSql
    })
    
    if (seedError) throw seedError
    console.log("Seed completed successfully")

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase() 