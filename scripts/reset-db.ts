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

async function resetDatabase() {
  try {
    console.log("Starting database reset...")

    // Read the migration file
    const migrationPath = join(process.cwd(), "supabase/migrations/20240320000000_initial_schema.sql")
    const migrationSql = readFileSync(migrationPath, "utf-8")
    
    console.log("Executing migration...")
    try {
      // Execute the full migration as a single transaction
      const { error } = await supabase.rpc('run_migration', { 
        sql: migrationSql 
      })
      if (error) throw error
      console.log("Migration completed successfully")
    } catch (error) {
      console.error("Migration failed:", error)
      console.log("Attempting to seed database directly...")
    }

    // Read the seed file
    const seedPath = join(process.cwd(), "supabase/seed.sql")
    const seedSql = readFileSync(seedPath, "utf-8")
    
    console.log("Executing seed...")
    try {
      // Execute the seed SQL as a single transaction
      const { error } = await supabase.rpc('run_migration', { 
        sql: seedSql 
      })
      if (error) throw error
      console.log("Seed completed successfully")
    } catch (error) {
      console.error("Seed execution failed:", error)
      console.error("You may need to add the 'run_migration' function to your Supabase database.")
      console.error("Please run the following SQL in the Supabase SQL editor:")
      console.error(`
CREATE OR REPLACE FUNCTION run_migration(sql text) RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
      `)
    }

    console.log("Database reset completed!")
  } catch (error) {
    console.error("Error resetting database:", error)
    process.exit(1)
  }
}

resetDatabase() 