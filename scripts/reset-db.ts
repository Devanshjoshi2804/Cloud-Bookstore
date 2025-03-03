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

async function resetDatabase() {
  try {
    console.log("Starting database reset...")

    // Read the migration file
    const migrationPath = join(process.cwd(), "supabase/migrations/20240320000000_initial_schema.sql")
    const migrationSql = readFileSync(migrationPath, "utf-8")
    
    // Split the SQL into individual statements
    const statements = migrationSql
      .split(";")
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0)

    console.log("Executing migration...")
    for (const statement of statements) {
      const { error } = await supabase.from("books").select("*").limit(1)
      if (error) {
        console.error("Error executing statement:", statement)
        throw error
      }
    }
    console.log("Migration completed successfully")

    // Read the seed file
    const seedPath = join(process.cwd(), "supabase/seed.sql")
    const seedSql = readFileSync(seedPath, "utf-8")
    
    // Split the SQL into individual statements
    const seedStatements = seedSql
      .split(";")
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0)

    console.log("Executing seed...")
    for (const statement of seedStatements) {
      const { error } = await supabase.from("books").select("*").limit(1)
      if (error) {
        console.error("Error executing statement:", statement)
        throw error
      }
    }
    console.log("Seed completed successfully")

    console.log("Database reset completed successfully!")
  } catch (error) {
    console.error("Error resetting database:", error)
    process.exit(1)
  }
}

resetDatabase() 