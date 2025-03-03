import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getBookById(id: string) {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getBooksByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getUserLibrary(userId: string) {
  const { data, error } = await supabase
    .from('user_library')
    .select(`
      *,
      books (*)
    `)
    .eq('user_id', userId)
    .order('last_read', { ascending: false })

  if (error) throw error
  return data
}

export async function addToLibrary(userId: string, bookId: string) {
  const { data, error } = await supabase
    .from('user_library')
    .insert([
      {
        user_id: userId,
        book_id: bookId,
        progress: 0,
        last_read: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateReadingProgress(
  userId: string,
  bookId: string,
  progress: number
) {
  const { data, error } = await supabase
    .from('user_library')
    .update({
      progress,
      last_read: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getBookReviews(bookId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      users (full_name, avatar_url)
    `)
    .eq('book_id', bookId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function addReview(
  userId: string,
  bookId: string,
  rating: number,
  comment: string
) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        user_id: userId,
        book_id: bookId,
        rating,
        comment,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
} 